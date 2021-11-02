import { AccountId } from "@polkadot/types/interfaces";
import { BitcoinUnit, Currency, MonetaryAmount } from "@interlay/monetary-js";
import { ApiPromise } from "@polkadot/api/promise";
import Big from "big.js";
import { Network } from "bitcoinjs-lib";
import {
    CollateralUnit,
    computeLazyDistribution,
    CurrencyId,
    CurrencyIdLiteral,
    decodeFixedPointType,
    DefaultVaultsAPI,
    ElectrsAPI,
    newCurrencyId,
    newMonetaryAmount,
    newVaultCurrencyPair,
    newVaultId,
    tickerToCurrencyIdLiteral,
    VaultId,
} from "..";
import {
    CollateralCurrency,
    CollateralIdLiteral,
    currencyIdToMonetaryCurrency,
    WrappedCurrency,
    WrappedIdLiteral,
} from "../types";
import { newAccountId } from "../utils";

export interface RewardsAPI {
    /**
     * @param vaultId The account ID of the staking pool nominee
     * @param nominatorId The account ID of the staking pool nominator
     * @returns A Monetary.js amount object, representing the reward in the given currency
     */
    computeRewardInStakingPool(
        vaultId: AccountId,
        nominatorId: AccountId,
        collateralCurrency: CollateralIdLiteral
    ): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>>;
    /**
     * @param currencyId The staked currency
     * @param vaultId The account ID of the staking pool nominee
     * @param nominatorId The account ID of the staking pool nominator
     * @returns The stake, as a Big object
     */
    getStakingPoolStake(currencyId: CurrencyIdLiteral, vaultId: AccountId, nominatorId: AccountId): Promise<Big>;
    /**
     * @param currencyId The staked currency
     * @param vaultId The account ID of the staking pool nominee
     * @param nominatorId The account ID of the staking pool nominator
     * @returns The reward tally, as a Big object
     */
    getStakingPoolRewardTally(
        currencyId: WrappedIdLiteral,
        vaultId: AccountId,
        nominatorId: AccountId,
        collateralCurrency: CollateralIdLiteral,
        nonce?: number
    ): Promise<Big>;
    /**
     * @param currencyId The staked currency
     * @param vaultId The account ID of the staking pool nominee
     * @returns The reward per token, as a Big object
     */
    getStakingPoolRewardPerToken(currencyId: CollateralIdLiteral, vaultId: AccountId): Promise<Big>;
    /**
     * @param currencyId The staked currency
     * @param vaultId The account ID of the staking pool nominee
     * @returns The current nonce of the staking pool
     */
    getStakingPoolNonce(currencyId: CollateralIdLiteral, vaultId: AccountId): Promise<number>;
    /**
     * @param currencyId The reward currency
     * @param accountId The account ID whose reward to compute
     * @returns A Monetary.js amount object, representing the reward in the given currency
     */
    computeRewardInRewardsPool(accountId: AccountId): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>>;
    /**
     * @param vaultId The account ID of the staking pool nominee
     * @param nominatorId The account ID of the staking pool nominator
     * @returns A Monetary.js amount object, representing the collateral in the given currency
     */
    computeCollateralInStakingPool(
        vaultId: AccountId,
        nominatorId: AccountId,
        collateralCurrencyIdLiteral: CollateralIdLiteral
    ): Promise<MonetaryAmount<Currency<CollateralUnit>, CollateralUnit>>;
    /**
     * @param currencyId The reward currency
     * @param accountId An account ID string
     * @returns The stake, as a Big object
     */
    getRewardsPoolStake(currencyId: CurrencyIdLiteral, accountId: AccountId): Promise<Big>;
    /**
     * @param currencyId The reward currency
     * @param accountId An account ID string
     * @returns The reward tally, as a Big object
     */
    getRewardsPoolRewardTally(currencyId: CurrencyIdLiteral, accountId: AccountId): Promise<Big>;
    /**
     * @param currencyId The reward currency
     * @returns The reward per token, as a Big object
     */
    getRewardsPoolRewardPerToken(currencyId: CurrencyIdLiteral): Promise<Big>;
    /**
     * Compute the total reward, including the staking (local) pool and the rewards (global) pool
     * @param vaultId The account ID of the staking pool nominee
     * @param nominatorId The account ID of the staking pool nominator
     * @returns A Monetary.js amount object, representing the total reward in the given currency
     */
    computeReward(
        vaultId: AccountId,
        nominatorId: AccountId,
        collateralCurrency: CollateralIdLiteral
    ): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>>;
    /**
     * @param vaultId The vault account ID
     * @returns The total wrapped token reward collected by the vault
     */
    getFeesWrapped(
        vaultId: AccountId,
        collateralCurrency: CollateralIdLiteral
    ): Promise<MonetaryAmount<WrappedCurrency, BitcoinUnit>>;
}

export class DefaultRewardsAPI implements RewardsAPI {
    constructor(
        public api: ApiPromise,
        private btcNetwork: Network,
        private electrsAPI: ElectrsAPI,
        private wrappedCurrency: WrappedCurrency,
        private nativeCurrency: CollateralCurrency
    ) {}

    async computeRewardInStakingPool(
        vaultAccountId: AccountId,
        nominatorId: AccountId,
        collateralCurrencyId: CollateralIdLiteral
    ): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>> {
        const wrappedCurrencyId = tickerToCurrencyIdLiteral(this.wrappedCurrency.ticker) as WrappedIdLiteral;
        const [stake, rewardPerToken, rewardTally] = await Promise.all([
            this.getStakingPoolStake(collateralCurrencyId, vaultAccountId, nominatorId),
            this.getStakingPoolRewardPerToken(collateralCurrencyId, vaultAccountId),
            this.getStakingPoolRewardTally(wrappedCurrencyId, vaultAccountId, nominatorId, collateralCurrencyId),
        ]);
        const rawLazyDistribution = computeLazyDistribution(stake, rewardPerToken, rewardTally);
        return newMonetaryAmount(rawLazyDistribution, this.wrappedCurrency);
    }

    async getStakingPoolNonce(
        collateralCurrencyIdLiteral: CollateralIdLiteral,
        vaultAccountId: AccountId
    ): Promise<number> {
        const collateralCurrency = currencyIdToMonetaryCurrency(
            newCurrencyId(this.api, collateralCurrencyIdLiteral)
        ) as CollateralCurrency;
        const vaultId = newVaultId(this.api, vaultAccountId.toString(), collateralCurrency, this.wrappedCurrency);
        const head = await this.api.rpc.chain.getFinalizedHead();
        const rawNonce = await this.api.query.staking.nonce.at(head, vaultId);
        return rawNonce.toNumber();
    }

    async getStakingPoolStake(
        collateralCurrency: CollateralIdLiteral,
        vaultId: AccountId,
        nominatorId: AccountId,
        nonce?: number
    ): Promise<Big> {
        if (nonce === undefined) {
            nonce = await this.getStakingPoolNonce(collateralCurrency, vaultId);
        }
        const head = await this.api.rpc.chain.getFinalizedHead();
        const wrappedCurrencyId = tickerToCurrencyIdLiteral(this.wrappedCurrency.ticker);
        return decodeFixedPointType(
            await this.api.query.staking.stake.at(head, wrappedCurrencyId, [nonce, vaultId, nominatorId])
        );
    }

    async getStakingPoolRewardTally(
        currencyId: WrappedIdLiteral,
        vaultId: AccountId,
        nominatorId: AccountId,
        collateralCurrency: CollateralIdLiteral,
        nonce?: number
    ): Promise<Big> {
        if (nonce === undefined) {
            nonce = await this.getStakingPoolNonce(collateralCurrency, vaultId);
        }
        const head = await this.api.rpc.chain.getFinalizedHead();
        return decodeFixedPointType(
            await this.api.query.staking.rewardTally.at(head, currencyId, [nonce, vaultId, nominatorId])
        );
    }

    async getStakingPoolRewardPerToken(
        currencyId: CollateralIdLiteral,
        vaultId: AccountId,
        nonce?: number
    ): Promise<Big> {
        if (nonce === undefined) {
            nonce = await this.getStakingPoolNonce(currencyId, vaultId);
        }
        const head = await this.api.rpc.chain.getFinalizedHead();
        return decodeFixedPointType(await this.api.query.staking.rewardPerToken.at(head, currencyId, [nonce, vaultId]));
    }

    async computeCollateralInStakingPool(
        vaultAccountId: AccountId,
        nominatorId: AccountId,
        collateralCurrencyIdLiteral: CollateralIdLiteral
    ): Promise<MonetaryAmount<Currency<CollateralUnit>, CollateralUnit>> {
        const vaultsAPI = new DefaultVaultsAPI(
            this.api,
            this.btcNetwork,
            this.electrsAPI,
            this.wrappedCurrency,
            this.nativeCurrency
        );
        const [vault, stake, slashPerToken, slashTally] = await Promise.all([
            vaultsAPI.get(vaultAccountId, collateralCurrencyIdLiteral),
            this.getStakingPoolStake(collateralCurrencyIdLiteral, vaultAccountId, nominatorId),
            this.getStakingPoolSlashPerToken(collateralCurrencyIdLiteral, vaultAccountId),
            this.getStakingPoolSlashTally(collateralCurrencyIdLiteral, vaultAccountId, nominatorId),
        ]);
        const toSlash = computeLazyDistribution(stake, slashPerToken, slashTally);
        return newMonetaryAmount(stake.sub(toSlash), vault.collateralCurrency);
    }

    async getStakingPoolSlashPerToken(
        currencyId: CollateralIdLiteral,
        vaultAccountId: AccountId,
        nonce?: number
    ): Promise<Big> {
        if (nonce === undefined) {
            nonce = await this.getStakingPoolNonce(currencyId, vaultAccountId);
        }
        const collateralCurrency = currencyIdToMonetaryCurrency(
            newCurrencyId(this.api, currencyId)
        ) as CollateralCurrency;
        const vaultId = newVaultId(this.api, vaultAccountId.toString(), collateralCurrency, this.wrappedCurrency);
        const head = await this.api.rpc.chain.getFinalizedHead();
        return decodeFixedPointType(await this.api.query.staking.slashPerToken.at(head, currencyId, [nonce, vaultId]));
    }

    async getStakingPoolSlashTally(
        currencyId: CollateralIdLiteral,
        vaultId: AccountId,
        nominatorId: AccountId,
        nonce?: number
    ): Promise<Big> {
        if (nonce === undefined) {
            nonce = await this.getStakingPoolNonce(currencyId, vaultId);
        }
        const head = await this.api.rpc.chain.getFinalizedHead();
        return decodeFixedPointType(
            await this.api.query.staking.slashTally.at(head, currencyId, [nonce, vaultId, nominatorId])
        );
    }

    async computeRewardInRewardsPool(
        accountId: AccountId
    ): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>> {
        const currencyId = tickerToCurrencyIdLiteral(this.wrappedCurrency.ticker);
        const stake = await this.getRewardsPoolStake(currencyId, accountId);
        const rewardPerToken = await this.getRewardsPoolRewardPerToken(currencyId);
        const rewardTally = await this.getRewardsPoolRewardTally(currencyId, accountId);
        const rawLazyDistribution = computeLazyDistribution(stake, rewardPerToken, rewardTally);
        return newMonetaryAmount(rawLazyDistribution, this.wrappedCurrency);
    }

    async getRewardsPoolStake(currencyId: CurrencyIdLiteral, accountId: AccountId): Promise<Big> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        return decodeFixedPointType(await this.api.query.rewards.stake.at(head, currencyId, accountId));
    }

    async getRewardsPoolRewardTally(currencyId: CurrencyIdLiteral, accountId: AccountId): Promise<Big> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        return decodeFixedPointType(await this.api.query.rewards.rewardTally.at(head, currencyId, accountId));
    }

    async getRewardsPoolRewardPerToken(currencyId: CurrencyIdLiteral): Promise<Big> {
        const head = await this.api.rpc.chain.getFinalizedHead();
        return decodeFixedPointType(await this.api.query.rewards.rewardPerToken.at(head, currencyId));
    }

    async backingCollateralProportion(
        vaultAccountId: AccountId,
        nominatorId: AccountId,
        collateralCurrencyIdLiteral: CollateralIdLiteral
    ): Promise<Big> {
        const vaultsAPI = new DefaultVaultsAPI(
            this.api,
            this.btcNetwork,
            this.electrsAPI,
            this.wrappedCurrency,
            this.nativeCurrency
        );
        const vault = await vaultsAPI.get(vaultAccountId, collateralCurrencyIdLiteral);
        const nominatorCollateral = await this.computeCollateralInStakingPool(
            vaultAccountId,
            nominatorId,
            collateralCurrencyIdLiteral
        );
        return nominatorCollateral.toBig().div(vault.backingCollateral.toBig());
    }

    async computeReward(
        vaultAccountId: AccountId,
        nominatorId: AccountId,
        collateralCurrency: CollateralIdLiteral
    ): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>> {
        const [totalGlobalReward, globalRewardShare] = await Promise.all([
            this.computeRewardInRewardsPool(vaultAccountId),
            this.backingCollateralProportion(vaultAccountId, nominatorId, collateralCurrency),
        ]);
        const ownGlobalReward = totalGlobalReward.mul(globalRewardShare);
        const localReward = await this.computeRewardInStakingPool(vaultAccountId, nominatorId, collateralCurrency);
        return ownGlobalReward.add(localReward);
    }

    async getFeesWrapped(
        vaultAccountId: AccountId,
        collateralCurrency: CollateralIdLiteral
    ): Promise<MonetaryAmount<Currency<BitcoinUnit>, BitcoinUnit>> {
        return await this.computeReward(vaultAccountId, vaultAccountId, collateralCurrency);
    }
}
