import { ApiPromise } from "@polkadot/api";
import { H256, AccountId } from "@polkadot/types/interfaces";
import { BlockNumber } from "@polkadot/types/interfaces/runtime";
import { Network } from "bitcoinjs-lib";
import { MonetaryAmount } from "@interlay/monetary-js";
import { isKeyringPair } from "@polkadot/api/util";
import { InterbtcPrimitivesReplaceReplaceRequest, BitcoinAddress } from "@polkadot/types/lookup";

import {
    storageKeyToNthInner,
    getTxProof,
    parseReplaceRequest,
    ensureHashEncoded,
    newMonetaryAmount,
    newVaultCurrencyPair,
    newVaultId,
} from "../utils";
import { FeeAPI } from "./fee";
import { TransactionAPI } from "./transaction";
import { ElectrsAPI } from "../external";
import { CollateralCurrency, ReplaceRequestExt, WrappedCurrency } from "../types";
import { VaultsAPI } from "../parachain";

/**
 * @category BTC Bridge
 */
export interface ReplaceAPI {
    /**
     * @returns The minimum amount of btc that is accepted for replace requests; any lower values would
     * risk the bitcoin client to reject the payment
     */
    getDustValue(): Promise<MonetaryAmount<WrappedCurrency>>;
    /**
     * @returns The time difference in number of blocks between when a replace request is created
     * and required completion time by a vault. The replace period has an upper limit
     * to prevent griefing of vault collateral.
     */
    getReplacePeriod(): Promise<BlockNumber>;
    /**
     * @returns An array containing the replace requests
     */
    list(): Promise<ReplaceRequestExt[]>;
    /**
     * @returns A mapping from the replace request ID to the replace request object
     */
    map(): Promise<Map<H256, ReplaceRequestExt>>;
    /**
     * @param replaceId The ID of the replace request to fetch
     * @returns A replace request object
     */
    getRequestById(replaceId: H256 | string): Promise<ReplaceRequestExt>;
    /**
     * @param amount Amount issued, denoted in Bitcoin, to have replaced by another vault
     * @param collateralCurrency Collateral currency to have replaced
     */
    request(amount: MonetaryAmount<WrappedCurrency>, collateralCurrency: CollateralCurrency): Promise<void>;
    /**
     * Wihdraw a replace request
     * @param amount The amount of wrapped tokens to withdraw from the amount
     * requested to have replaced.
     * @param collateralCurrency Collateral currency of the request
     */
    withdraw(amount: MonetaryAmount<WrappedCurrency>, collateralCurrency: CollateralCurrency): Promise<void>;
    /**
     * Accept a replace request
     * @param oldVault ID of the old vault that to be (possibly partially) replaced
     * @param amount Amount of issued tokens to be replaced
     * @param collateral The collateral for replacement
     * @param btcAddress The address that old-vault should transfer the btc to
     */
    accept(
        oldVault: AccountId,
        amount: MonetaryAmount<WrappedCurrency>,
        collateral: MonetaryAmount<CollateralCurrency>,
        btcAddress: string
    ): Promise<void>;
    /**
     * Execute a replace request
     * @remarks If `txId` is not set, the `merkleProof` and `rawTx` must both be set.
     *
     * @param requestId The ID generated by the replace request transaction
     * @param btcTxId Bitcoin transaction ID
     */
    execute(requestId: string, btcTxId: string): Promise<void>;
    /**
     * Fetch the replace requests associated with a vault. In the returned requests,
     * the vault is either the replaced or the replacing one.
     *
     * @param vaultAccountId The AccountId of the vault used to filter replace requests
     * @returns An array with replace requests involving said vault
     */
    mapReplaceRequests(vaultAccountId: AccountId): Promise<ReplaceRequestExt[]>;
}

export class DefaultReplaceAPI implements ReplaceAPI {
    constructor(
        private api: ApiPromise,
        private btcNetwork: Network,
        private electrsAPI: ElectrsAPI,
        private wrappedCurrency: WrappedCurrency,
        private feeAPI: FeeAPI,
        private vaultsAPI: VaultsAPI,
        private transactionAPI: TransactionAPI
    ) {}

    async request(amount: MonetaryAmount<WrappedCurrency>, collateralCurrency: CollateralCurrency): Promise<void> {
        const amountAtomicUnit = this.api.createType("Balance", amount.toString(true));
        // Assumes the calling account is the `vaultId`
        const vaultAccount = this.transactionAPI.getAccount();
        if (vaultAccount === undefined) {
            return Promise.reject("Vault account must be set in the replace API");
        }
        const vaultAccountId = isKeyringPair(vaultAccount) ? vaultAccount.address : vaultAccount.toString();
        const vaultId = newVaultId(this.api, vaultAccountId, collateralCurrency, this.wrappedCurrency);
        const requestTx = this.api.tx.replace.requestReplace(vaultId.currencies, amountAtomicUnit);
        await this.transactionAPI.sendLogged(requestTx, this.api.events.replace.RequestReplace);
    }

    async withdraw(amount: MonetaryAmount<WrappedCurrency>, collateralCurrency: CollateralCurrency): Promise<void> {
        const amountAtomicUnit = this.api.createType("Balance", amount.toString(true));
        const vaultCurrencyPair = newVaultCurrencyPair(this.api, collateralCurrency, this.wrappedCurrency);
        const requestTx = this.api.tx.replace.withdrawReplace(vaultCurrencyPair, amountAtomicUnit);
        await this.transactionAPI.sendLogged(requestTx, this.api.events.replace.WithdrawReplace, true);
    }

    async accept(
        oldVault: AccountId,
        amount: MonetaryAmount<WrappedCurrency>,
        collateral: MonetaryAmount<CollateralCurrency>,
        btcAddress: string
    ): Promise<void> {
        const parsedBtcAddress = this.api.createType<BitcoinAddress>("BitcoinAddress", btcAddress);
        const amountAtomicUnit = this.api.createType("Balance", amount.toString(true));
        const collateralAtomicUnit = this.api.createType("Balance", collateral.toString(true));
        const vaultCurrencyPair = newVaultCurrencyPair(
            this.api,
            collateral.currency as CollateralCurrency,
            this.wrappedCurrency
        );
        const requestTx = this.api.tx.replace.acceptReplace(
            vaultCurrencyPair,
            oldVault,
            amountAtomicUnit,
            collateralAtomicUnit,
            parsedBtcAddress
        );
        await this.transactionAPI.sendLogged(requestTx, this.api.events.replace.AcceptReplace, true);
    }

    async execute(requestId: string, btcTxId: string): Promise<void> {
        const parsedRequestId = ensureHashEncoded(this.api, requestId);
        const txInclusionDetails = await getTxProof(this.electrsAPI, btcTxId);
        const tx = this.api.tx.replace.executeReplace(
            parsedRequestId,
            txInclusionDetails.merkleProof,
            txInclusionDetails.rawTx
        );
        await this.transactionAPI.sendLogged(tx, this.api.events.replace.ExecuteReplace, true);
    }

    async getDustValue(): Promise<MonetaryAmount<WrappedCurrency>> {
        const dustSatoshi = await this.api.query.replace.replaceBtcDustValue();
        return newMonetaryAmount(dustSatoshi.toString(), this.wrappedCurrency);
    }

    async getReplacePeriod(): Promise<BlockNumber> {
        return await this.api.query.replace.replacePeriod();
    }

    async list(): Promise<ReplaceRequestExt[]> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const replaceRequests = await this.api.query.replace.replaceRequests.entriesAt(head);
        return await Promise.all(
            replaceRequests
                .filter((v) => v[1].isSome.valueOf)
                // Can be unwrapped because the filter removes `None` values
                .map(([id, req]) =>
                    parseReplaceRequest(
                        this.vaultsAPI,
                        req.unwrap(),
                        this.btcNetwork,
                        this.wrappedCurrency,
                        storageKeyToNthInner(id)
                    )
                )
        );
    }

    async map(): Promise<Map<H256, ReplaceRequestExt>> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const replaceRequests = await this.api.query.replace.replaceRequests.entriesAt(head);
        const replaceRequestMap = new Map<H256, ReplaceRequestExt>();
        await Promise.all(
            replaceRequests
                .filter((v) => v[1].isSome.valueOf)
                // Can be unwrapped because the filter removes `None` values
                .map(
                    ([id, req]) =>
                        new Promise<void>((resolve) => {
                            parseReplaceRequest(
                                this.vaultsAPI,
                                req.unwrap(),
                                this.btcNetwork,
                                this.wrappedCurrency,
                                storageKeyToNthInner(id)
                            ).then((replaceRequest) => {
                                replaceRequestMap.set(storageKeyToNthInner(id), replaceRequest);
                                resolve();
                            });
                        })
                )
        );
        return replaceRequestMap;
    }

    async getRequestById(replaceId: H256 | string): Promise<ReplaceRequestExt> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        return parseReplaceRequest(
            this.vaultsAPI,
            await this.api.query.replace.replaceRequests.at(head, ensureHashEncoded(this.api, replaceId)),
            this.btcNetwork,
            this.wrappedCurrency,
            replaceId
        );
    }

    async mapReplaceRequests(vaultAccountId: AccountId): Promise<ReplaceRequestExt[]> {
        try {
            const [oldVaultReplaceRequests, newVaultReplaceRequests] = await Promise.all([
                this.getOldVaultReplaceRequests(vaultAccountId),
                this.getNewVaultReplaceRequests(vaultAccountId),
            ]);
            return [...oldVaultReplaceRequests, ...newVaultReplaceRequests];
        } catch (err) {
            return Promise.reject(new Error(`Error during replace request retrieval: ${err}`));
        }
    }

    async getOldVaultReplaceRequests(vaultAccountId: AccountId): Promise<ReplaceRequestExt[]> {
        return (await this.list()).filter(
            (request) => request.oldVault.accountId.toString() === vaultAccountId.toString()
        );
    }

    async getNewVaultReplaceRequests(vaultAccountId: AccountId): Promise<ReplaceRequestExt[]> {
        return (await this.list()).filter(
            (request) => request.newVault.accountId.toString() === vaultAccountId.toString()
        );
    }

    async parseRequestsAsync(
        requestPairs: [H256, InterbtcPrimitivesReplaceReplaceRequest][]
    ): Promise<[H256, ReplaceRequestExt][]> {
        return await Promise.all(
            requestPairs.map(
                ([id, req]) =>
                    new Promise<[H256, ReplaceRequestExt]>((resolve) => {
                        parseReplaceRequest(this.vaultsAPI, req, this.btcNetwork, this.wrappedCurrency, id).then(
                            (replaceRequest) => {
                                resolve([id, replaceRequest]);
                            }
                        );
                    })
            )
        );
    }
}
