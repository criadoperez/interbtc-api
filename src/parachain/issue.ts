import { ApiPromise } from "@polkadot/api";
import { AddressOrPair } from "@polkadot/api/types";
import { Bytes } from "@polkadot/types";
import { AccountId, H256, Hash, EventRecord } from "@polkadot/types/interfaces";
import { Network } from "bitcoinjs-lib";
import Big from "big.js";

import { IssueRequest } from "../interfaces/default";
import { DefaultVaultsAPI, VaultsAPI } from "./vaults";
import {
    decodeFixedPointType,
    roundUpBtcToNearestSatoshi,
    encodeParachainRequest,
    getTxProof,
    btcToSat,
    dotToPlanck,
} from "../utils";
import { DefaultFeeAPI, FeeAPI } from "./fee";
import { ElectrsAPI } from "../external";
import { DefaultTransactionAPI, TransactionAPI } from "./transaction";

export type IssueRequestResult = { id: Hash; issueRequest: IssueRequestExt };

export interface IssueRequestExt extends Omit<IssueRequest, "btc_address"> {
    // network encoded btc address
    btc_address: string;
}

export function encodeIssueRequest(req: IssueRequest, network: Network): IssueRequestExt {
    return encodeParachainRequest<IssueRequest, IssueRequestExt>(req, network);
}

/**
 * @category PolkaBTC Bridge
 * The type Big represents DOT or PolkaBTC denominations,
 * while the type BN represents Planck or Satoshi denominations.
 */
export interface IssueAPI extends TransactionAPI {
    /**
     * Send an issue request transaction
     * @param amount PolkaBTC amount (denoted in Satoshi) to issue
     * @param vaultId (Optional) Request the issue from a specific vault. If this parameter is unspecified,
     * a random vault will be selected
     * @returns An object of type {issueId, vault} if the request succeeded. The function throws an error otherwise.
     */
    request(amount: Big, vaultId?: AccountId, griefingCollateral?: Big): Promise<IssueRequestResult>;
    /**
     * Send an issue execution transaction
     * @remarks If `txId` is not set, the `merkleProof` and `rawTx` must both be set.
     * 
     * @param issueId The ID returned by the issue request transaction
     * @param txId (Optional) The ID of the Bitcoin transaction that sends funds to the vault address.
     * @param merkleProof (Optional) The merkle inclusion proof of the Bitcoin transaction. 
     * @param rawTx (Optional) The raw bytes of the Bitcoin transaction
     */
    execute(issueId: string, txId?: string, merkleProof?: Bytes, rawTx?: Bytes): Promise<void>;
    /**
     * Send an issue cancellation transaction. After the issue period has elapsed,
     * the issuance of PolkaBTC can be cancelled. As a result, the griefing collateral
     * of the requester will be slashed and sent to the vault that had prepared to issue.
     * @param issueId The ID returned by the issue request transaction
     */
    cancel(issueId: H256): Promise<void>;
    /**
     * @remarks Testnet utility function
     * @param blocks The time difference in number of blocks between an issue request is created
     * and required completion time by a user. The issue period has an upper limit
     * to prevent griefing of vault collateral.
     */
    setIssuePeriod(blocks: number): Promise<void>;
    /**
     * 
     * @returns The time difference in number of blocks between an issue request is created
     * and required completion time by a user. The issue period has an upper limit
     * to prevent griefing of vault collateral.
     */
    getIssuePeriod(): Promise<number>;
    /**
     * Set an account to use when sending transactions from this API
     * @param account Keyring account
     */
    setAccount(account: AddressOrPair): void;
    /**
     * @returns An array containing the issue requests
     */
    list(): Promise<IssueRequestExt[]>;
    /**
     * @param account The ID of the account whose issue requests are to be retrieved
     * @returns A mapping from the issue request ID to the issue request object, corresponding to the requests of
     * the given account
     */
    mapForUser(account: AccountId): Promise<Map<H256, IssueRequestExt>>;
    /**
     * @param issueId The ID of the issue request to fetch
     * @returns An issue request object
     */
    getRequestById(issueId: H256): Promise<IssueRequestExt>;
    /**
     * @returns The fee charged for issuing. For instance, "0.005" stands for 0.5%
     */
    getFeeRate(): Promise<Big>;
    /**
     * @param amountBtc The amount, in BTC, for which to compute the issue fees
     * @returns The fees, in BTC
     */
    getFeesToPay(amountBtc: Big): Promise<Big>;
    /**
     * @param amountBtc The amount, in BTC, for which to compute the griefing collateral
     * @returns The griefing collateral, in BTC
     */
    getGriefingCollateral(amount: Big): Promise<Big>;
}

export class DefaultIssueAPI extends DefaultTransactionAPI implements IssueAPI  {
    private vaultsAPI: VaultsAPI;
    private feeAPI: FeeAPI;

    constructor(api: ApiPromise, private btcNetwork: Network, private electrsAPI: ElectrsAPI, account?: AddressOrPair) {
        super(api, account);
        this.vaultsAPI = new DefaultVaultsAPI(api, btcNetwork);
        this.feeAPI = new DefaultFeeAPI(api);
    }

    /**
     * @param events The EventRecord array returned after sending an issue request transaction
     * @returns The issueId associated with the request. If the EventRecord array does not
     * contain issue request events, the function throws an error.
     */
    private getRequestIdFromEvents(events: EventRecord[]): Hash {
        for (const { event } of events) {
            if (this.api.events.issue.RequestIssue.is(event)) {
                const hash = this.api.createType("Hash", event.data[0]);
                return hash;
            }
        }
        throw new Error("Request transaction failed");
    }

    async request(amount: Big, vaultId?: AccountId): Promise<IssueRequestResult> {
        if (!vaultId) {
            vaultId = await this.vaultsAPI.selectRandomVaultIssue(amount);
        }
        const amountSat = this.api.createType("Wrapped", btcToSat(amount.toString()));
        const griefingCollateral = await this.getGriefingCollateral(amount);
        const requestIssueTx = this.api.tx.issue.requestIssue(amountSat, vaultId, dotToPlanck(griefingCollateral.toString()) as string);
        const result = await this.sendLogged(requestIssueTx, this.api.events.issue.RequestIssue);
        try {
            const id = this.getRequestIdFromEvents(result.events);
            const issueRequest = await this.getRequestById(id);
            return { id, issueRequest };
        } catch (e) {
            return Promise.reject(e.message);
        }
    }

    async execute(requestId: string, btcTxId?: string, merkleProof?: Bytes, rawTx?: Bytes): Promise<void> {
        const parsedRequestId = this.api.createType("H256", "0x" + requestId);
        [merkleProof, rawTx] = await getTxProof(this.electrsAPI, btcTxId, merkleProof, rawTx);
        const executeIssueTx = this.api.tx.issue.executeIssue(parsedRequestId, merkleProof, rawTx);
        await this.sendLogged(executeIssueTx, this.api.events.issue.ExecuteIssue);
    }

    async cancel(issueId: H256): Promise<void> {
        const cancelIssueTx = this.api.tx.issue.cancelIssue(issueId);
        await this.sendLogged(cancelIssueTx, this.api.events.issue.CancelIssue);
    }

    async setIssuePeriod(blocks: number): Promise<void> {
        const period = this.api.createType("BlockNumber", blocks);
        const tx = this.api.tx.sudo
            .sudo(
                this.api.tx.issue.setIssuePeriod(period)
            );
        await this.sendLogged(tx);
    }

    async getIssuePeriod(): Promise<number> {
        const blockNumber = await this.api.query.issue.issuePeriod();
        return blockNumber.toNumber();
    }

    async list(): Promise<IssueRequestExt[]> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const issueRequests = await this.api.query.issue.issueRequests.entriesAt(head);
        return issueRequests.map((v) => v[1]).map((req: IssueRequest) => encodeIssueRequest(req, this.btcNetwork));
    }

    async mapForUser(account: AccountId): Promise<Map<H256, IssueRequestExt>> {
        const issueRequestPairs: [H256, IssueRequest][] = await this.api.rpc.issue.getIssueRequests(account);
        const mapForUser: Map<H256, IssueRequestExt> = new Map<H256, IssueRequestExt>();
        issueRequestPairs.forEach((issueRequestPair) =>
            mapForUser.set(issueRequestPair[0], encodeIssueRequest(issueRequestPair[1], this.btcNetwork))
        );
        return mapForUser;
    }

    async getGriefingCollateral(amount: Big): Promise<Big> {
        const griefingCollateralRate = await this.feeAPI.getIssueGriefingCollateralRate();
        return await this.feeAPI.getGriefingCollateral(amount, griefingCollateralRate);
    }

    async getFeesToPay(amount: Big): Promise<Big> {
        const feePercentage = await this.getFeeRate();
        const feeBtc = amount.mul(feePercentage);
        return new Big(roundUpBtcToNearestSatoshi(feeBtc.toString()));
    }

    /**
     * @returns The fee charged for issuing. For instance, "0.005" stands for 0.5%
     */
    async getFeeRate(): Promise<Big> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const issueFee = await this.api.query.fee.issueFee.at(head);
        // TODO: return Big from decodeFixedPointType
        return new Big(decodeFixedPointType(issueFee));
    }

    async getRequestById(issueId: H256): Promise<IssueRequestExt> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        return encodeIssueRequest(await this.api.query.issue.issueRequests.at(head, issueId), this.btcNetwork);
    }
}
