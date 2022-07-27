import { MonetaryAmount } from "@interlay/monetary-js";
import { ApiPromise } from "@polkadot/api";
import { InterbtcPrimitivesVaultId } from "@polkadot/types/lookup";
import Big from "big.js";

import { UnsignedFixedPoint } from "../interfaces";
import { OracleAPI, SystemAPI } from "../parachain";
import { decodeFixedPointType, newMonetaryAmount } from "../utils";
import { CollateralCurrency, currencyIdToMonetaryCurrency, WrappedCurrency } from "./currency";

export interface WalletExt {
    // network encoded btc addresses
    addresses: Array<string>;
}

export enum VaultStatusExt {
    Active,
    Inactive,
    Liquidated,
    CommittedTheft,
}

export class VaultExt {
    wallet: WalletExt;
    backingCollateral: MonetaryAmount<CollateralCurrency>;
    id: InterbtcPrimitivesVaultId;
    status: VaultStatusExt;
    bannedUntil: number | undefined;
    toBeIssuedTokens: MonetaryAmount<WrappedCurrency>;
    issuedTokens: MonetaryAmount<WrappedCurrency>;
    toBeRedeemedTokens: MonetaryAmount<WrappedCurrency>;
    toBeReplacedTokens: MonetaryAmount<WrappedCurrency>;
    replaceCollateral: MonetaryAmount<CollateralCurrency>;
    liquidatedCollateral: MonetaryAmount<CollateralCurrency>;

    constructor(
        private api: ApiPromise,
        private oracleAPI: OracleAPI,
        private systemAPI: SystemAPI,
        wallet: WalletExt,
        backingCollateral: MonetaryAmount<CollateralCurrency>,
        id: InterbtcPrimitivesVaultId,
        status: VaultStatusExt,
        bannedUntil: number | undefined,
        toBeIssuedTokens: MonetaryAmount<WrappedCurrency>,
        issuedTokens: MonetaryAmount<WrappedCurrency>,
        toBeRedeemedTokens: MonetaryAmount<WrappedCurrency>,
        toBeReplacedTokens: MonetaryAmount<WrappedCurrency>,
        replaceCollateral: MonetaryAmount<CollateralCurrency>,
        liquidatedCollateral: MonetaryAmount<CollateralCurrency>
    ) {
        this.wallet = wallet;
        this.backingCollateral = backingCollateral;
        this.id = id;
        this.status = status;
        this.bannedUntil = bannedUntil;
        this.toBeIssuedTokens = toBeIssuedTokens;
        this.issuedTokens = issuedTokens;
        this.toBeRedeemedTokens = toBeRedeemedTokens;
        this.toBeReplacedTokens = toBeReplacedTokens;
        this.replaceCollateral = replaceCollateral;
        this.liquidatedCollateral = liquidatedCollateral;
    }

    getRedeemableTokens(): MonetaryAmount<WrappedCurrency> {
        return this.issuedTokens.sub(this.toBeRedeemedTokens);
    }

    async getIssuableTokens(): Promise<MonetaryAmount<WrappedCurrency>> {
        const isBanned = await this.isBanned();
        if (isBanned) {
            return newMonetaryAmount(0, currencyIdToMonetaryCurrency(this.id.currencies.wrapped));
        }
        const freeCollateral = await this.getFreeCollateral();
        const secureCollateralThreshold = await this.getSecureCollateralThreshold();
        const backableWrappedTokens = await this.oracleAPI.convertCollateralToWrapped(freeCollateral);
        // Force type-assert here as the oracle API only uses wrapped Bitcoin
        return backableWrappedTokens.div(secureCollateralThreshold);
    }

    async isBanned(): Promise<boolean> {
        const currentBlockNumber = await this.systemAPI.getCurrentActiveBlockNumber();
        if (!this.bannedUntil) {
            return false;
        }
        return this.bannedUntil >= currentBlockNumber;
    }

    getBackedTokens(): MonetaryAmount<WrappedCurrency> {
        return this.issuedTokens.add(this.toBeIssuedTokens);
    }

    async getFreeCollateral(): Promise<MonetaryAmount<CollateralCurrency>> {
        const usedCollateral = await this.getUsedCollateral();
        const totalCollateral = await this.computeBackingCollateral();
        return totalCollateral.sub(usedCollateral);
    }

    async getUsedCollateral(): Promise<MonetaryAmount<CollateralCurrency>> {
        const backedTokens = this.getBackedTokens();
        const backedTokensInCollateral = await this.oracleAPI.convertWrappedToCurrency(
            // Force type-assert here as the oracle API only uses wrapped Bitcoin
            backedTokens,
            currencyIdToMonetaryCurrency(this.id.currencies.collateral)
        );
        const secureCollateralThreshold = await this.getSecureCollateralThreshold();
        const usedCollateral = backedTokensInCollateral.mul(secureCollateralThreshold);
        const totalCollateral = await this.computeBackingCollateral();
        return totalCollateral.min(usedCollateral);
    }

    // TODO: The functions below are duplicated from other APIs. Remove them after APIs
    // are refactored to the builder pattern

    async getSecureCollateralThreshold(): Promise<Big> {
        const threshold = await this.api.query.vaultRegistry.secureCollateralThreshold(this.id.currencies);
        return decodeFixedPointType(threshold.value as UnsignedFixedPoint);
    }

    async computeBackingCollateral(nonce?: number): Promise<MonetaryAmount<CollateralCurrency>> {
        if (nonce === undefined) {
            nonce = await this.getStakingPoolNonce();
        }
        const rawBackingCollateral = await this.api.query.vaultStaking.totalCurrentStake(nonce, this.id);
        const collateralCurrency = currencyIdToMonetaryCurrency(this.id.currencies.collateral);
        return newMonetaryAmount(decodeFixedPointType(rawBackingCollateral), collateralCurrency);
    }

    async getStakingPoolNonce(): Promise<number> {
        const rawNonce = await this.api.query.vaultStaking.nonce(this.id);
        return rawNonce.toNumber();
    }
}

export interface SystemVaultExt {
    toBeIssuedTokens: MonetaryAmount<WrappedCurrency>;
    issuedTokens: MonetaryAmount<WrappedCurrency>;
    toBeRedeemedTokens: MonetaryAmount<WrappedCurrency>;
    collateral: MonetaryAmount<CollateralCurrency>;
    currencyPair: {
        collateralCurrency: CollateralCurrency;
        wrappedCurrency: CollateralCurrency;
    };
}
