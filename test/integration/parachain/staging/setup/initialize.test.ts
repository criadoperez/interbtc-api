import { ApiPromise, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { AccountId } from "@polkadot/types/interfaces";
import { Bitcoin, ExchangeRate, Kintsugi, Kusama, MonetaryAmount, Polkadot } from "@interlay/monetary-js";
import { assert } from "chai";
import Big from "big.js";

import {
    BitcoinCoreClient,
    createSubstrateAPI,
    VaultsAPI,
    newAccountId,
    InterBtcApi,
    DefaultInterBtcApi,
    CollateralCurrencyExt,
    CurrencyExt,
    newVaultCurrencyPair,
    ForeignAsset,
    encodeUnsignedFixedPoint,
    setRawStorage,
    getSS58Prefix,
    getCollateralCurrencies,
    DefaultTransactionAPI,
    newCurrencyId,
    intoAccountTruncating,
} from "../../../../../src";
import {
    SUDO_URI,
    VAULT_1_URI,
    VAULT_2_URI,
    BITCOIN_CORE_HOST,
    BITCOIN_CORE_NETWORK,
    BITCOIN_CORE_PASSWORD,
    BITCOIN_CORE_PORT,
    BITCOIN_CORE_USERNAME,
    BITCOIN_CORE_WALLET,
    PARACHAIN_ENDPOINT,
    VAULT_3_URI,
    USER_1_URI,
    ESPLORA_BASE_PATH,
} from "../../../../config";
import {
    AUSD_TICKER,
    getAUSDForeignAsset,
    getCorrespondingCollateralCurrenciesForTests,
    getExchangeRateValueToSetForTesting,
    ORACLE_MAX_DELAY,
    sleep,
    SLEEP_TIME_MS,
    submitExtrinsic,
} from "../../../../utils/helpers";
import { DefaultAssetRegistryAPI } from "../../../../../src/parachain/asset-registry";
import { BN } from "bn.js";

describe("Initialize parachain state", () => {
    let api: ApiPromise;
    let userInterBtcAPI: InterBtcApi;
    let sudoInterBtcAPI: InterBtcApi;

    let bitcoinCoreClient: BitcoinCoreClient;
    let keyring: Keyring;

    let sudoAccount: KeyringPair;
    let userAccount: KeyringPair;

    let vault_1: KeyringPair;
    let vault_2: KeyringPair;
    let vault_3: KeyringPair;

    let vaultAnnuityAddress: AccountId;

    let collateralCurrency: CollateralCurrencyExt;

    let aUSD: ForeignAsset | undefined;

    function accountIdFromKeyring(keyPair: KeyringPair): AccountId {
        return newAccountId(api, keyPair.address);
    }

    async function waitForRegister(api: VaultsAPI, accountId: AccountId, collateralCurrency: CollateralCurrencyExt) {
        for (;;) {
            try {
                await api.get(accountId, collateralCurrency);
                return;
            } catch (e) {
                console.log(e);
            }
            await sleep(SLEEP_TIME_MS);
        }
    }

    before(async function () {
        api = await createSubstrateAPI(PARACHAIN_ENDPOINT);
        const ss58Prefix = getSS58Prefix(api);
        keyring = new Keyring({ type: "sr25519", ss58Format: ss58Prefix });
        sudoAccount = keyring.addFromUri(SUDO_URI);
        userAccount = keyring.addFromUri(USER_1_URI);
        vault_1 = keyring.addFromUri(VAULT_1_URI);
        vault_2 = keyring.addFromUri(VAULT_2_URI);
        vault_3 = keyring.addFromUri(VAULT_3_URI);

        vaultAnnuityAddress = intoAccountTruncating(api, api.consts.vaultAnnuity.annuityPalletId);

        bitcoinCoreClient = new BitcoinCoreClient(
            BITCOIN_CORE_NETWORK,
            BITCOIN_CORE_HOST,
            BITCOIN_CORE_USERNAME,
            BITCOIN_CORE_PASSWORD,
            BITCOIN_CORE_PORT,
            BITCOIN_CORE_WALLET
        );
        await bitcoinCoreClient.createOrLoadWallet();

        userInterBtcAPI = new DefaultInterBtcApi(api, "regtest", userAccount, ESPLORA_BASE_PATH);
        sudoInterBtcAPI = new DefaultInterBtcApi(api, "regtest", sudoAccount, ESPLORA_BASE_PATH);

        collateralCurrency = getCorrespondingCollateralCurrenciesForTests(userInterBtcAPI.getGovernanceCurrency())[0];
        const vaultCollateralPairs: [KeyringPair, CollateralCurrencyExt][] = [
            [vault_1, collateralCurrency],
            [vault_2, collateralCurrency],
            [vault_3, collateralCurrency],
        ];
        // wait for all vaults to register
        await Promise.all(
            vaultCollateralPairs
                .map(([keyring, collateralCurrency]): [AccountId, CollateralCurrencyExt] => [
                    accountIdFromKeyring(keyring),
                    collateralCurrency,
                ])
                .map(([accountId, collateral]) => waitForRegister(userInterBtcAPI.vaults, accountId, collateral))
        );
    });

    after(async () => {
        api.disconnect();
    });

    it("should set the stable confirmations and ready the BTC-Relay", async () => {
        // Speed up the process by only requiring 0 parachain and 0 bitcoin confirmations
        const stableBitcoinConfirmationsToSet = 0;
        const stableParachainConfirmationsToSet = 0;
        let [stableBitcoinConfirmations, stableParachainConfirmations] = await Promise.all([
            userInterBtcAPI.btcRelay.getStableBitcoinConfirmations(),
            userInterBtcAPI.btcRelay.getStableParachainConfirmations(),
        ]);

        if (stableBitcoinConfirmations != 0 || stableParachainConfirmations != 0) {
            console.log("Initializing stable block confirmations...");
            await setRawStorage(
                api,
                api.query.btcRelay.stableBitcoinConfirmations.key(),
                api.createType("u32", stableBitcoinConfirmationsToSet),
                sudoAccount
            );
            await setRawStorage(
                api,
                api.query.btcRelay.stableParachainConfirmations.key(),
                api.createType("u32", stableParachainConfirmationsToSet),
                sudoAccount
            );
            await bitcoinCoreClient.mineBlocks(3);

            [stableBitcoinConfirmations, stableParachainConfirmations] = await Promise.all([
                userInterBtcAPI.btcRelay.getStableBitcoinConfirmations(),
                userInterBtcAPI.btcRelay.getStableParachainConfirmations(),
            ]);
        }
        assert.equal(
            stableBitcoinConfirmationsToSet,
            stableBitcoinConfirmations,
            "Setting the Bitcoin confirmations failed"
        );
        assert.equal(
            stableParachainConfirmationsToSet,
            stableParachainConfirmations,
            "Setting the Parachain confirmations failed"
        );
    });

    it("should fund vault annuity account", async () => {
        // get address in with local prefix
        const vaultAnnuityKeyPair = keyring.addFromAddress(vaultAnnuityAddress).address;

        // fund with 100 KINT/INTR
        const fundAmount = new MonetaryAmount(sudoInterBtcAPI.getGovernanceCurrency(), 100);
        await submitExtrinsic(userInterBtcAPI, userInterBtcAPI.tokens.transfer(vaultAnnuityKeyPair, fundAmount));
    });

    it("should have or register aUSD as foreign asset", async () => {
        aUSD = await getAUSDForeignAsset(sudoInterBtcAPI.assetRegistry);

        if (aUSD === undefined) {
            // register aUSD as foreign asset for tests
            const nextAssetId = (await sudoInterBtcAPI.api.query.assetRegistry.lastAssetId()).toNumber() + 1;

            const callToRegister = sudoInterBtcAPI.api.tx.assetRegistry.registerAsset(
                {
                    name: api.createType("Bytes", "Acala USD"),
                    symbol: api.createType("Bytes", AUSD_TICKER), // we will try to find it again in tests through this ticker
                    decimals: api.createType("u32", 6),
                    existentialDeposit: api.createType("u128", 1000),
                    additional: api.createType("InterbtcPrimitivesCustomMetadata", {
                        feePerSecond: api.createType("u128", 10),
                        coingeckoId: api.createType("Bytes", "acala-dollar"),
                    }),
                },
                api.createType("u32", nextAssetId)
            );

            const result = await DefaultTransactionAPI.sendLogged(
                api,
                sudoAccount,
                sudoInterBtcAPI.api.tx.sudo.sudo(callToRegister),
                api.events.assetRegistry.RegisteredAsset
            );
            assert.isTrue(result.isCompleted, "Sudo event to register new foreign asset not found");
        }

        const currencies = await sudoInterBtcAPI.assetRegistry.getForeignAssets();
        assert.isAtLeast(
            currencies.length,
            1,
            `Expected at least one foreign asset registered, but found ${currencies.length}`
        );

        aUSD = await getAUSDForeignAsset(sudoInterBtcAPI.assetRegistry);
        assert.isDefined(aUSD, "aUSD not found after registration");
    });

    it("should set oracle value expiry to a longer period", async () => {
        // set the oracle value expiry to be approximately 4.5 hours
        await setRawStorage(
            sudoInterBtcAPI.api,
            api.query.oracle.maxDelay.key(),
            api.createType("Moment", new BN(ORACLE_MAX_DELAY)),
            sudoAccount
        );
    });

    it("should set the exchange rate for foreign assets", async () => {
        const assetRegistryApi = new DefaultAssetRegistryAPI(sudoInterBtcAPI.api);

        const foreignAssets = await assetRegistryApi.getForeignAssets();

        for (const foreignAsset of foreignAssets) {
            const exchangeRate = new ExchangeRate(
                Bitcoin,
                foreignAsset,
                getExchangeRateValueToSetForTesting(foreignAsset)
            );
            await submitExtrinsic(sudoInterBtcAPI, sudoInterBtcAPI.oracle.setExchangeRate(exchangeRate));
        }
    });

    it("should set the exchange rate for collateral tokens", async () => {
        async function setCollateralExchangeRate(value: Big, currency: CurrencyExt) {
            const exchangeRate = new ExchangeRate(Bitcoin, currency, value);
            // result will be medianized
            await submitExtrinsic(sudoInterBtcAPI, sudoInterBtcAPI.oracle.setExchangeRate(exchangeRate));
        }
        await setCollateralExchangeRate(getExchangeRateValueToSetForTesting(Polkadot), Polkadot);
        await setCollateralExchangeRate(getExchangeRateValueToSetForTesting(Kusama), Kusama);
        await setCollateralExchangeRate(getExchangeRateValueToSetForTesting(Kintsugi), Kintsugi);
    });

    it("should set BTC tx fees", async () => {
        const setFeeEstimate = new Big(1);
        let getFeeEstimate = await sudoInterBtcAPI.oracle.getBitcoinFees().catch((_) => undefined);
        if (!getFeeEstimate) {
            await submitExtrinsic(sudoInterBtcAPI, sudoInterBtcAPI.oracle.setBitcoinFees(setFeeEstimate));
            // NOTE: this will fail if the chain does not support instant-seal
            await api.rpc.engine.createBlock(true, true);
            // just check that this is set since we medianize results
            getFeeEstimate = await sudoInterBtcAPI.oracle.getBitcoinFees();
        }
        assert.isDefined(getFeeEstimate);
    });

    it("should update vault annuity rewards", async () => {
        // update rewards (needs sudo), doing this a fair bit later than transfer
        // so the test doesn't need to wait for transfer to settle
        const updateRewardsExtrinsic = api.tx.vaultAnnuity.updateRewards();
        const hash = await api.tx.sudo.sudo(updateRewardsExtrinsic).signAndSend(sudoAccount);
        assert.isNotEmpty(hash);
    });

    it("should enable vault nomination", async () => {
        let isNominationEnabled = await sudoInterBtcAPI.nomination.isNominationEnabled();
        if (!isNominationEnabled) {
            await submitExtrinsic(sudoInterBtcAPI, sudoInterBtcAPI.nomination.setNominationEnabled(true));
            isNominationEnabled = await sudoInterBtcAPI.nomination.isNominationEnabled();
        }
        assert.isTrue(isNominationEnabled);
    });

    it("should set collateral ceiling and thresholds for aUSD", async function () {
        // only get aUSD if it hasn't been set yet (e.g. when running this test in isolation)
        !aUSD ? (aUSD = await getAUSDForeignAsset(sudoInterBtcAPI.assetRegistry)) : undefined;

        if (aUSD === undefined) {
            // no point in completing this if aUSD is not registered
            this.skip();
        }

        // (unsafely) get first collateral currency's ceiling and thresholds
        const existingCollCcy = getCorrespondingCollateralCurrenciesForTests(
            userInterBtcAPI.getGovernanceCurrency()
        )[0];
        const existingCcyPair = newVaultCurrencyPair(api, existingCollCcy, sudoInterBtcAPI.getWrappedCurrency());
        // borrow values from existing currency pair
        const [optionCeilValue, existingSecureThreshold, existingPremiumThreshold, existingLiquidationThreshold] =
            await Promise.all([
                sudoInterBtcAPI.api.query.vaultRegistry.systemCollateralCeiling(existingCcyPair),
                sudoInterBtcAPI.vaults.getSecureCollateralThreshold(existingCollCcy),
                sudoInterBtcAPI.vaults.getPremiumRedeemThreshold(existingCollCcy),
                sudoInterBtcAPI.vaults.getLiquidationCollateralThreshold(existingCollCcy),
            ]);
        // boldly assume the value is set
        const existingCeiling = optionCeilValue.unwrap();

        // encode thresholds
        const encodedSecThresh = encodeUnsignedFixedPoint(sudoInterBtcAPI.api, new Big(existingSecureThreshold));
        const encodedPremThresh = encodeUnsignedFixedPoint(sudoInterBtcAPI.api, new Big(existingPremiumThreshold));
        const encodedLiqThresh = encodeUnsignedFixedPoint(sudoInterBtcAPI.api, new Big(existingLiquidationThreshold));

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const aUsdCcyPair = newVaultCurrencyPair(api, aUSD!, sudoInterBtcAPI.getWrappedCurrency());

        // set the collateral ceiling
        const setCeilingExtrinsic = sudoInterBtcAPI.api.tx.vaultRegistry.setSystemCollateralCeiling(
            aUsdCcyPair,
            existingCeiling
        );

        // set normal threshold
        const setThresholdExtrinsic = sudoInterBtcAPI.api.tx.vaultRegistry.setSecureCollateralThreshold(
            aUsdCcyPair,
            encodedSecThresh
        );

        // set premium threshold
        const setPremiumThresholdExtrinsic = sudoInterBtcAPI.api.tx.vaultRegistry.setPremiumRedeemThreshold(
            aUsdCcyPair,
            encodedPremThresh
        );

        // set liquidation threshold
        const setLiquidationThresholdExtrinsic = sudoInterBtcAPI.api.tx.vaultRegistry.setLiquidationCollateralThreshold(
            aUsdCcyPair,
            encodedLiqThresh
        );

        // set minimum collateral required
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const minimumCollateral = new MonetaryAmount(aUSD!, 100);
        const minimumCollateralToSet = api.createType("u128", minimumCollateral.toString(true));
        const setMinimumCollateralExtrinsic = sudoInterBtcAPI.api.tx.vaultRegistry.setMinimumCollateral(
            aUsdCcyPair.collateral,
            minimumCollateralToSet
        );

        // batch all
        const batch = api.tx.utility.batchAll([
            setCeilingExtrinsic,
            setThresholdExtrinsic,
            setPremiumThresholdExtrinsic,
            setLiquidationThresholdExtrinsic,
            setMinimumCollateralExtrinsic,
        ]);
        const tx = api.tx.sudo.sudo(batch);

        const result = await DefaultTransactionAPI.sendLogged(api, sudoAccount, tx, api.events.sudo.Sudid);
        assert.isTrue(result.isCompleted, "Cannot find Sudid event for setting thresholds in batch");
    });

    it("should fund and register aUSD foreign asset vaults", async function () {
        // only get aUSD if it hasn't been set yet (e.g. when running this test in isolation)
        !aUSD ? (aUSD = await getAUSDForeignAsset(sudoInterBtcAPI.assetRegistry)) : undefined;

        if (aUSD === undefined) {
            // no point in completing this if aUSD is not registered
            this.skip();
        }

        // assign locally to make TS understand it isn't undefined
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const aUsd: ForeignAsset = aUSD!;

        const vaultAccountIdAndKeyrings: [KeyringPair, AccountId][] = [vault_1, vault_2, vault_3].map((keyringPair) => {
            return [keyringPair, accountIdFromKeyring(keyringPair)];
        });

        // register the vaults with aUSD collateral
        for (const [vaultKeyringPair, vaultAccountId] of vaultAccountIdAndKeyrings) {
            // set balance and wait for event
            const result = await DefaultTransactionAPI.sendLogged(
                api,
                sudoAccount,
                api.tx.sudo.sudo(api.tx.tokens.setBalance(vaultAccountId, newCurrencyId(api, aUsd), 100000000000, 0)),
                api.events.tokens.BalanceSet
            );
            assert.isTrue(result.isCompleted, `Cannot find BalanceSet event for ${vaultAccountId}`);

            // register the aUSD vault
            const vaultInterBtcApi = new DefaultInterBtcApi(api, "regtest", vaultKeyringPair, ESPLORA_BASE_PATH);
            const collateralAmount = new MonetaryAmount(aUsd, 10000);
            await submitExtrinsic(
                vaultInterBtcApi,
                vaultInterBtcApi.vaults.registerNewCollateralVault(collateralAmount)
            );
            // sanity check the collateral computation
            const actualCollateralAmount = await vaultInterBtcApi.vaults.getCollateral(vaultAccountId, aUsd);
            assert.equal(actualCollateralAmount.toString(), collateralAmount.toString());
        }
    });

    it("should return aUSD among the collateral currencies", async function () {
        // run this check a few tests after it has been registered to avoid needing to wait for
        // block finalizations
        const collateralCurrencies = await getCollateralCurrencies(userInterBtcAPI.api);

        assert.isDefined(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            collateralCurrencies.find((currency) => currency.ticker === aUSD!.ticker),
            "Expected to find aUSD within the array of collateral currencies, but did not"
        );
    });
});
