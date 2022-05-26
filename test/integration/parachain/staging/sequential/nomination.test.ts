import { Currency } from "@interlay/monetary-js";
import { ApiPromise, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import BN from "bn.js";
import { 
    CollateralUnit, 
    DefaultInterBtcApi, 
    InterBtcApi, 
    InterbtcPrimitivesVaultId, 
    tickerToCurrencyIdLiteral 
} from "../../../../../src/index";

import { 
    BitcoinCoreClient, 
    CollateralCurrency, 
    CollateralIdLiteral, 
    currencyIdToLiteral, 
    currencyIdToMonetaryCurrency, 
    encodeUnsignedFixedPoint, 
    newAccountId, 
    newVaultId, 
    WrappedCurrency 
} from "../../../../../src";
import { setNumericStorage, issueSingle, newMonetaryAmount, getCorrespondingCollateralCurrencies } from "../../../../../src/utils";
import { createSubstrateAPI } from "../../../../../src/factory";
import { assert } from "../../../../chai";
import { 
    SUDO_URI, 
    USER_1_URI, 
    VAULT_1_URI, 
    BITCOIN_CORE_HOST, 
    BITCOIN_CORE_NETWORK, 
    BITCOIN_CORE_PASSWORD, 
    BITCOIN_CORE_PORT, 
    BITCOIN_CORE_USERNAME, 
    BITCOIN_CORE_WALLET, 
    PARACHAIN_ENDPOINT, 
    ESPLORA_BASE_PATH 
} from "../../../../config";
import { callWith, sudo } from "../../../../utils/helpers";
import { Nomination } from "../../../../../src/parachain/nomination";

// TODO: readd this once we want to activate nomination
describe.skip("NominationAPI", () => {
    let api: ApiPromise;
    let userInterBtcAPI: InterBtcApi;
    let sudoInterBtcAPI: InterBtcApi;
    let sudoAccount: KeyringPair;
    let userAccount: KeyringPair;
    let vault_1: KeyringPair;
    let vault_1_ids: Array<InterbtcPrimitivesVaultId>;

    let bitcoinCoreClient: BitcoinCoreClient;

    let wrappedCurrency: WrappedCurrency;
    let collateralCurrencies: Array<CollateralCurrency>;

    before(async () => {
        api = await createSubstrateAPI(PARACHAIN_ENDPOINT);
        const keyring = new Keyring({ type: "sr25519" });
        sudoAccount = keyring.addFromUri(SUDO_URI);
        userAccount = keyring.addFromUri(USER_1_URI);
        // TODO: remove all uses of config currencies and query the chain instead
        userInterBtcAPI = new DefaultInterBtcApi(api, "regtest", userAccount, ESPLORA_BASE_PATH);
        sudoInterBtcAPI = new DefaultInterBtcApi(api, "regtest", sudoAccount, ESPLORA_BASE_PATH);
        collateralCurrencies = getCorrespondingCollateralCurrencies(userInterBtcAPI.getGovernanceCurrency());
        wrappedCurrency = userInterBtcAPI.getWrappedCurrency();
        vault_1 = keyring.addFromUri(VAULT_1_URI);
        vault_1_ids = collateralCurrencies
            .map(collateralCurrency => newVaultId(api, vault_1.address, collateralCurrency, wrappedCurrency));

        if (!(await sudoInterBtcAPI.nomination.isNominationEnabled())) {
            console.log("Enabling nomination...");
            await sudo(sudoInterBtcAPI, () => sudoInterBtcAPI.nomination.setNominationEnabled(true));
        }

        // The account of a vault from docker-compose
        vault_1 = keyring.addFromUri(VAULT_1_URI);
        bitcoinCoreClient = new BitcoinCoreClient(
            BITCOIN_CORE_NETWORK,
            BITCOIN_CORE_HOST,
            BITCOIN_CORE_USERNAME,
            BITCOIN_CORE_PASSWORD,
            BITCOIN_CORE_PORT,
            BITCOIN_CORE_WALLET
        );
    });

    after(() => {
        return api.disconnect();
    });

    it("Should opt a vault in and out of nomination", async () => {
        for (const vault_1_id of vault_1_ids) {
            await optInWithAccount(vault_1, currencyIdToMonetaryCurrency(vault_1_id.currencies.collateral) as CollateralCurrency);
            const nominationVaults = await userInterBtcAPI.nomination.listVaults();
            assert.equal(1, nominationVaults.length);
            assert.equal(vault_1.address, nominationVaults.map(v => v.accountId.toString())[0]);
            await optOutWithAccount(vault_1, currencyIdToMonetaryCurrency(vault_1_id.currencies.collateral) as CollateralCurrency);
            assert.equal(0, (await userInterBtcAPI.nomination.listVaults()).length);
        }
    }).timeout(vault_1_ids.length * 60000);

    async function setIssueFee(x: BN) {
        await setNumericStorage(api, "Fee", "IssueFee", x, sudoAccount, 128);
    }

    it("Should nominate to and withdraw from a vault", async () => {
        for (const vault_1_id of vault_1_ids) {
            await optInWithAccount(vault_1, currencyIdToMonetaryCurrency(vault_1_id.currencies.collateral) as CollateralCurrency);
            const issueFee = await userInterBtcAPI.fee.getIssueFee();
            const collateralCurrencyIdLiteral = currencyIdToLiteral(vault_1_id.currencies.collateral) as CollateralIdLiteral;
            const vault = await userInterBtcAPI.vaults.get(vault_1_id.accountId, collateralCurrencyIdLiteral);
            const collateralCurrency = currencyIdToMonetaryCurrency(vault.id.currencies.collateral) as Currency<CollateralUnit>;
            const nominatorDeposit = newMonetaryAmount(1, collateralCurrency, true);
            try {
                // Set issue fees to 100%
                await setIssueFee(new BN("1000000000000000000"));
                const stakingCapacityBeforeNomination = await userInterBtcAPI.vaults.getStakingCapacity(
                    vault_1_id.accountId,
                    collateralCurrencyIdLiteral
                );
                // Deposit
                await userInterBtcAPI.nomination.depositCollateral(vault_1_id.accountId, nominatorDeposit);
                const stakingCapacityAfterNomination = await userInterBtcAPI.vaults.getStakingCapacity(
                    vault_1_id.accountId,
                    collateralCurrencyIdLiteral
                );
                assert.equal(
                    stakingCapacityBeforeNomination.sub(nominatorDeposit).toString(),
                    stakingCapacityAfterNomination.toString(),
                    "Nomination failed to decrease staking capacity"
                );
                const nominationPairs = await userInterBtcAPI.nomination.list();
                assert.equal(2, nominationPairs.length, "There should be one nomination pair in the system, besides the vault to itself");
    
                const userAddress = userAccount.address;
                const vault_1Address = vault_1.address;
    
                const nomination = nominationPairs.find((nomination) => userAddress == nomination.nominatorId.toString()) as Nomination;
    
                assert.equal(userAddress, nomination.nominatorId.toString());
                assert.equal(vault_1Address, nomination.vaultId.accountId.toString());
    
                const amountToIssue = newMonetaryAmount(0.00001, wrappedCurrency, true);
                await issueSingle(userInterBtcAPI, bitcoinCoreClient, userAccount, amountToIssue, vault_1_id);
                const wrappedRewardsBeforeWithdrawal = (
                    await userInterBtcAPI.nomination.getNominatorReward(
                        vault_1_id.accountId,
                        collateralCurrencyIdLiteral,
                        tickerToCurrencyIdLiteral(wrappedCurrency.ticker),
                        newAccountId(api, userAccount.address),
                    )
                ).toBig();
                assert.isTrue(
                    wrappedRewardsBeforeWithdrawal.gt(0),
                    "Nominator should receive non-zero wrapped tokens"
                );
    
                // Withdraw Rewards
                await userInterBtcAPI.rewards.withdrawRewards(vault_1_id);
                // Withdraw Collateral
                await userInterBtcAPI.nomination.withdrawCollateral(vault_1_id.accountId, nominatorDeposit);
    
                const nominatorsAfterWithdrawal = await userInterBtcAPI.nomination.list();
                // The vault always has a "nomination" to itself
                assert.equal(1, nominatorsAfterWithdrawal.length);
                const totalNomination = await userInterBtcAPI.nomination.getTotalNomination(
                    newAccountId(api, userAccount.address),
                    currencyIdToMonetaryCurrency(vault_1_id.currencies.collateral) as CollateralCurrency,
                );
                assert.equal(totalNomination.toString(), "0");
            } finally {
                await setIssueFee(encodeUnsignedFixedPoint(api, issueFee));
                await optOutWithAccount(vault_1, currencyIdToMonetaryCurrency(vault_1_id.currencies.collateral) as CollateralCurrency);
            }
        }
    }).timeout(vault_1_ids.length * 5 * 60000);

    async function optInWithAccount(vaultAccount: KeyringPair, collateralCurrency: CollateralCurrency) {
        // will fail if vault is already opted in
        await callWith(userInterBtcAPI, vaultAccount, () => userInterBtcAPI.nomination.optIn(collateralCurrency));
    }

    async function optOutWithAccount(vaultAccount: KeyringPair, collateralCurrency: CollateralCurrency) {
        await callWith(userInterBtcAPI, vaultAccount, () => userInterBtcAPI.nomination.optOut(collateralCurrency));
    }
});
