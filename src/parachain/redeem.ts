import { ApiPromise } from "@polkadot/api";
import { AddressOrPair, SubmittableExtrinsic } from "@polkadot/api/submittable/types";
import { Hash, H256 } from "@polkadot/types/interfaces";
import { EventRecord } from "@polkadot/types/interfaces";
import { Bytes, Option } from "@polkadot/types";
import { Network } from "bitcoinjs-lib";
import Big from "big.js";
import { Bitcoin, BitcoinUnit, Currency, ExchangeRate, MonetaryAmount } from "@interlay/monetary-js";
import { ApiTypes, AugmentedEvent } from "@polkadot/api/types";
import type { AnyTuple } from "@polkadot/types/types";
import {
    BitcoinAddress,
    InterbtcPrimitivesVaultId,
    InterbtcPrimitivesRedeemRedeemRequest
} from "@polkadot/types/lookup";

import { VaultsAPI, DefaultVaultsAPI } from "./vaults";
import {
    decodeBtcAddress,
    decodeFixedPointType,
    getTxProof,
    storageKeyToNthInner,
    ensureHashEncoded,
    parseRedeemRequest,
    newMonetaryAmount,
    newVaultCurrencyPair,
} from "../utils";
import { allocateAmountsToVaults, getRequestIdsFromEvents } from "../utils/issueRedeem";
import { TokensAPI, DefaultTokensAPI } from "./tokens";
import { ElectrsAPI } from "../external";
import { DefaultTransactionAPI, TransactionAPI } from "./transaction";
import { DefaultOracleAPI, OracleAPI } from "./oracle";
import {
    CollateralCurrency,
    CollateralUnit,
    Redeem,
    WrappedCurrency,
} from "../types";

/**
 * @category InterBTC Bridge
 */
export interface RedeemAPI extends TransactionAPI {
    /**
     * @returns An array containing the redeem requests
     */
    list(): Promise<Redeem[]>;
    /**
     * Send a redeem request transaction
     * @param amount Wrapped token amount to redeem
     * @param btcAddressEnc Bitcoin address where the redeemed BTC should be sent
     * @param vaultId (optional) ID of the vault to redeem with.
     * @param atomic (optional) Whether the request should be handled atomically or not. Only makes a difference
     * if more than one vault is needed to fulfil it. Defaults to false.
     * @param retries (optional) Number of times to retry redeeming, if some of the requests fail. Defaults to 0.
     * @param availableVaults (optional) A list of all vaults usable for redeem. If not provided, will fetch from the parachain.
     * @returns An array of type {redeemId, redeemRequest} if the requests succeeded. The function throws an error otherwise.
     */
    request(
        amount: MonetaryAmount<WrappedCurrency, BitcoinUnit>,
        btcAddressEnc: string,
        vaultId?: InterbtcPrimitivesVaultId,
        atomic?: boolean,
        retries?: number,
        availableVaults?: Map<InterbtcPrimitivesVaultId, MonetaryAmount<WrappedCurrency, BitcoinUnit>>
    ): Promise<Redeem[]>;

    /**
     * Send a batch of aggregated redeem transactions (to one or more vaults)
     * @param amountsPerVault A mapping of vaults to redeem from, and wrapped token amounts to redeem using each vault
     * @param btcAddressEnc Bitcoin address where the redeemed BTC should be sent
     * @param atomic Whether the issue request should be handled atomically or not. Only makes a difference if more than
     * one vault is needed to fulfil it.
     * @returns An array of type {redeemId, vault} if the requests succeeded.
     * @throws Rejects the promise if none of the requests succeeded (or if at least one failed, when atomic=true).
     */
    requestAdvanced(
        amountsPerVault: Map<InterbtcPrimitivesVaultId, MonetaryAmount<WrappedCurrency, BitcoinUnit>>,
        btcAddressEnc: string,
        atomic: boolean
    ): Promise<Redeem[]>;

    /**
     * Send a redeem execution transaction
     * @remarks If `txId` is not set, the `merkleProof` and `rawTx` must both be set.
     *
     * @param redeemId The ID generated by the redeem request transaction
     * @param txId (Optional) The ID of the Bitcoin transaction that sends funds from the vault to the redeemer's address
     * @param merkleProof (Optional) The merkle inclusion proof of the Bitcoin transaction.
     * @param rawTx (Optional) The raw bytes of the Bitcoin transaction
     */
    execute(redeemId: string, txId?: string, merkleProof?: Bytes, rawTx?: Bytes): Promise<void>;
    /**
     * Send a redeem cancellation transaction. After the redeem period has elapsed,
     * the redeemal request can be cancelled. As a result, the griefing collateral
     * of the vault will be slashed and sent to the redeemer
     * @param redeemId The ID returned by the redeem request transaction
     * @param reimburse (Optional) In case of redeem failure:
     *  - (Default) `false` = retry redeeming, with a different Vault
     *  - `true` = accept reimbursement in wrapped token
     */
    cancel(redeemId: string, reimburse?: boolean): Promise<void>;
    /**
     * @remarks Testnet utility function
     * @param blocks The time difference in number of blocks between a redeem request
     * is created and required completion time by a vault.
     * The redeem period has an upper limit to ensure the user gets their BTC in time
     * and to potentially punish a vault for inactivity or stealing BTC.
     */
    setRedeemPeriod(blocks: number): Promise<void>;
    /**
     *
     * @returns The time difference in number of blocks between a redeem request
     * is created and required completion time by a vault.
     * The redeem period has an upper limit to ensure the user gets their BTC in time
     * and to potentially punish a vault for inactivity or stealing BTC.
     */
    getRedeemPeriod(): Promise<number>;
    /**
     * @param redeemId The ID of the redeem request to fetch
     * @returns A redeem request object
     */
    getRequestById(redeemId: H256 | string): Promise<Redeem>;
    getRequestsByIds(redeemIds: (H256 | string)[]): Promise<Redeem[]>;
    /**
     * @returns The minimum amount of wrapped tokens that is accepted for redeem requests; any lower values would
     * risk the bitcoin client to reject the payment
     */
    getDustValue(): Promise<MonetaryAmount<WrappedCurrency, BitcoinUnit>>;
    /**
     * @returns The fee charged for redeeming. For instance, "0.005" stands for 0.5%
     */
    getFeeRate(): Promise<Big>;
    /**
     * @param amount The amount of wrapped tokens for which to compute the redeem fees
     * @returns The fees
     */
    getFeesToPay(
        amount: MonetaryAmount<WrappedCurrency, BitcoinUnit>
    ): Promise<MonetaryAmount<WrappedCurrency, BitcoinUnit>>;
    /**
     * @returns If users execute a redeem with a Vault flagged for premium redeem,
     * they can earn a premium, slashed from the Vault's collateral.
     * This value is a percentage of the redeemed amount.
     */
    getPremiumRedeemFeeRate(): Promise<Big>;
    /**
     * Burn wrapped tokens for a premium
     * @param amount The amount of wrapped tokens to burn
     * @param collateralCurrency Liquidated collateral currency to use when burning wrapped tokens
     */
    burn(amount: MonetaryAmount<WrappedCurrency, BitcoinUnit>, collateralCurrency: CollateralCurrency): Promise<void>;
    /**
     * @param collateralCurrency Liquidated collateral currency to use when burning wrapped tokens
     * @returns The maximum amount of tokens that can be burned through a liquidation redeem
     */
    getMaxBurnableTokens(
        collateralCurrency: CollateralCurrency
    ): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>>;
    /**
     * @param collateralCurrency Currency whose exchange rate with BTC to fetch
     * @returns The exchange rate (collateral currency to wrapped token currency)
     * used when burning tokens
     */
    getBurnExchangeRate<C extends CollateralUnit>(
        collateralCurrency: Currency<C>
    ): Promise<ExchangeRate<Bitcoin, BitcoinUnit, typeof collateralCurrency, typeof collateralCurrency.units>>;
    /**
     * @returns The current inclusion fee based on the expected number of bytes
     * in the transaction, and the inclusion fee rate reported by the oracle
     */
    getCurrentInclusionFee(): Promise<MonetaryAmount<WrappedCurrency, BitcoinUnit>>;
}

export class DefaultRedeemAPI extends DefaultTransactionAPI implements RedeemAPI {
    private vaultsAPI: VaultsAPI;
    private tokensAPI: TokensAPI;
    private oracleAPI: OracleAPI;
    requestHash: Hash = this.api.createType("Hash");
    events: EventRecord[] = [];

    constructor(
        api: ApiPromise,
        private btcNetwork: Network,
        private electrsAPI: ElectrsAPI,
        private wrappedCurrency: WrappedCurrency,
        private collateralCurrency: CollateralCurrency,
        account?: AddressOrPair
    ) {
        super(api, account);
        this.vaultsAPI = new DefaultVaultsAPI(api, btcNetwork, electrsAPI, wrappedCurrency, collateralCurrency, account);
        this.tokensAPI = new DefaultTokensAPI(api, account);
        this.oracleAPI = new DefaultOracleAPI(api, wrappedCurrency, account);
    }

    private getRedeemIdsFromEvents(events: EventRecord[], event: AugmentedEvent<ApiTypes, AnyTuple>): Hash[] {
        return getRequestIdsFromEvents(events, event, this.api);
    }

    async request(
        amount: MonetaryAmount<WrappedCurrency, BitcoinUnit>,
        btcAddressEnc: string,
        vaultId?: InterbtcPrimitivesVaultId,
        atomic: boolean = true,
        retries: number = 0,
        cachedVaults?: Map<InterbtcPrimitivesVaultId, MonetaryAmount<WrappedCurrency, BitcoinUnit>>
    ): Promise<Redeem[]> {
        try {
            if (vaultId) {
                // If a vault account id is defined, request to issue with that vault only.
                // Initialize the `amountsPerVault` map with a single entry, the (vaultId, amount) pair
                const amountsPerVault = new Map<InterbtcPrimitivesVaultId, MonetaryAmount<WrappedCurrency, BitcoinUnit>>([
                    [vaultId, amount],
                ]);
                return await this.requestAdvanced(amountsPerVault, btcAddressEnc, atomic);
            }
            const availableVaults = cachedVaults || (await this.vaultsAPI.getVaultsWithRedeemableTokens());
            const amountsPerVault = allocateAmountsToVaults(availableVaults, amount);
            const result = await this.requestAdvanced(amountsPerVault, btcAddressEnc, atomic);
            const successfulSum = result.reduce(
                (sum, req) => sum.add(req.amountBTC),
                newMonetaryAmount(0, this.wrappedCurrency)
            );
            const remainder = amount.sub(successfulSum);
            if (remainder.isZero() || retries === 0) return result;
            else {
                return (
                    await this.request(remainder, btcAddressEnc, vaultId, atomic, retries - 1, availableVaults)
                ).concat(result);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async requestAdvanced(
        amountsPerVault: Map<InterbtcPrimitivesVaultId, MonetaryAmount<WrappedCurrency, BitcoinUnit>>,
        btcAddressEnc: string,
        atomic: boolean
    ): Promise<Redeem[]> {
        const btcAddress = this.api.createType<BitcoinAddress>("BitcoinAddress", decodeBtcAddress(btcAddressEnc, this.btcNetwork));
        const txes = new Array<SubmittableExtrinsic<"promise">>();
        for (const [vaultId, amount] of amountsPerVault) {
            txes.push(this.api.tx.redeem.requestRedeem(amount.str.Satoshi(), btcAddress, vaultId));
        }
        // batchAll fails atomically, batch allows partial successes
        const batch = (atomic ? this.api.tx.utility.batchAll : this.api.tx.utility.batch)(txes);
        try {
            const result = await this.sendLogged(batch, this.api.events.issue.RequestRedeem);
            const ids = this.getRedeemIdsFromEvents(result.events, this.api.events.redeem.RequestRedeem);
            const redeemRequests = await this.getRequestsByIds(ids);
            return redeemRequests;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async execute(requestId: string, btcTxId?: string, merkleProof?: Bytes, rawTx?: Bytes): Promise<void> {
        const parsedRequestId = ensureHashEncoded(this.api, requestId);
        [merkleProof, rawTx] = await getTxProof(this.electrsAPI, btcTxId, merkleProof, rawTx);
        const executeRedeemTx = this.api.tx.redeem.executeRedeem(parsedRequestId, merkleProof, rawTx);
        const result = await this.sendLogged(executeRedeemTx, this.api.events.redeem.ExecuteRedeem);
        const ids = this.getRedeemIdsFromEvents(result.events, this.api.events.redeem.ExecuteRedeem);
        if (ids.length > 1) {
            return Promise.reject(new Error("Unexpected multiple redeem events from single execute transaction!"));
        }
    }

    async cancel(requestId: string, reimburse = false): Promise<void> {
        const parsedRequestId = ensureHashEncoded(this.api, requestId);
        const cancelRedeemTx = this.api.tx.redeem.cancelRedeem(parsedRequestId, reimburse);
        await this.sendLogged(cancelRedeemTx, this.api.events.redeem.CancelRedeem);
    }

    async burn(
        amount: MonetaryAmount<WrappedCurrency, BitcoinUnit>,
        collateralCurrency: CollateralCurrency
    ): Promise<void> {
        const vaultCurrencyPair = newVaultCurrencyPair(this.api, collateralCurrency, this.wrappedCurrency);
        const amountAtomicUnit = this.api.createType("Balance", amount.str.Satoshi());
        const burnRedeemTx = this.api.tx.redeem.liquidationRedeem(vaultCurrencyPair, amountAtomicUnit);
        await this.sendLogged(burnRedeemTx, this.api.events.redeem.LiquidationRedeem);
    }

    async setRedeemPeriod(blocks: number): Promise<void> {
        const period = this.api.createType("BlockNumber", blocks);
        const tx = this.api.tx.sudo.sudo(this.api.tx.redeem.setRedeemPeriod(period));
        await this.sendLogged(tx);
    }

    async getRedeemPeriod(): Promise<number> {
        const blockNumber = await this.api.query.redeem.redeemPeriod();
        return blockNumber.toNumber();
    }

    async getMaxBurnableTokens(
        collateralCurrency: CollateralCurrency
    ): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>> {
        const liquidationVault = await this.vaultsAPI.getLiquidationVault(collateralCurrency);
        return liquidationVault.issuedTokens;
    }

    async getBurnExchangeRate<C extends CollateralUnit>(
        collateralCurrency: Currency<C>
    ): Promise<ExchangeRate<Bitcoin, BitcoinUnit, typeof collateralCurrency, typeof collateralCurrency.units>> {
        const liquidationVault = await this.vaultsAPI.getLiquidationVault(collateralCurrency as unknown as CollateralCurrency);
        const issuedAmount = liquidationVault.issuedTokens.add(liquidationVault.toBeIssuedTokens);
        if (issuedAmount.isZero()) {
            return Promise.reject(new Error("There are no burnable tokens. The burn exchange rate is undefined"));
        }
        const collateralAmount = liquidationVault.collateral;
        const exchangeRate = collateralAmount.toBig(collateralAmount.currency.base).div(issuedAmount.toBig(Bitcoin.units.BTC));
        return new ExchangeRate<Bitcoin, BitcoinUnit, typeof collateralCurrency, typeof collateralCurrency.units>(
            Bitcoin,
            collateralCurrency,
            exchangeRate,
            Bitcoin.units.BTC,
            collateralCurrency.base,
        );
    }

    async getCurrentInclusionFee(): Promise<MonetaryAmount<WrappedCurrency, BitcoinUnit>> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const [size, satoshiFees] = await Promise.all([
            this.api.query.redeem.redeemTransactionSize.at(head),
            this.oracleAPI.getBitcoinFees(),
        ]);
        const btcFees = newMonetaryAmount(satoshiFees, this.wrappedCurrency);
        return btcFees.mul(size.toString());
    }

    async list(): Promise<Redeem[]> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const redeemRequests = await this.api.query.redeem.redeemRequests.entriesAt(head);
        return await Promise.all(
            redeemRequests
                .filter(([_, req]) => req.isSome.valueOf())
                // Can be unwrapped because the filter removes `None` values
                .map(([id, req]) => {
                    return parseRedeemRequest(this.vaultsAPI, req.unwrap(), this.btcNetwork, storageKeyToNthInner(id));
                })
        );
    }

    async getFeesToPay(
        amount: MonetaryAmount<WrappedCurrency, BitcoinUnit>
    ): Promise<MonetaryAmount<WrappedCurrency, BitcoinUnit>> {
        const feePercentage = await this.getFeeRate();
        return amount.mul(feePercentage);
    }

    async getFeeRate(): Promise<Big> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const redeemFee = await this.api.query.fee.redeemFee.at(head);
        return decodeFixedPointType(redeemFee);
    }

    async getDustValue(): Promise<MonetaryAmount<WrappedCurrency, BitcoinUnit>> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const dustValueSat = await this.api.query.redeem.redeemBtcDustValue.at(head);
        return newMonetaryAmount(dustValueSat.toString(), this.wrappedCurrency);
    }

    async getPremiumRedeemFeeRate(): Promise<Big> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const premiumRedeemFee = await this.api.query.fee.premiumRedeemFee.at(head);
        return decodeFixedPointType(premiumRedeemFee);
    }

    async getRequestById(redeemId: H256 | string): Promise<Redeem> {
        const id = ensureHashEncoded(this.api, redeemId);
        return (await this.getRequestsByIds([id]))[0];
    }

    async getRequestsByIds(redeemIds: (H256 | string)[]): Promise<Redeem[]> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        const redeemRequestData = await Promise.all(
            redeemIds.map(
                async (redeemId): Promise<[Option<InterbtcPrimitivesRedeemRedeemRequest>, H256 | string]> =>
                    new Promise((resolve, reject) => {
                        this.api.query.redeem.redeemRequests
                            .at(head, ensureHashEncoded(this.api, redeemId))
                            .then((request) => resolve([request, redeemId]))
                            .catch(reject);
                    })
            )
        );
        return Promise.all(
            redeemRequestData
                .filter(([option, _]) => option.isSome)
                .map(([redeemRequest, redeemId]) =>
                    parseRedeemRequest(this.vaultsAPI, redeemRequest.unwrap(), this.btcNetwork, redeemId)
                )
        );
    }
}
