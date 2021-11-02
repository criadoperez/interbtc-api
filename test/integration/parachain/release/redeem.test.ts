import { ApiPromise, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { Hash } from "@polkadot/types/interfaces";
import { InterBtcAmount, Polkadot, InterBtc } from "@interlay/monetary-js";
import * as bitcoinjs from "bitcoinjs-lib";

import { DefaultRedeemAPI } from "../../../../src/parachain/redeem";
import { createPolkadotAPI } from "../../../../src/factory";
import { Vault, VaultId } from "../../../../src/interfaces/default";
import { USER_1_URI, BITCOIN_CORE_HOST, BITCOIN_CORE_NETWORK, BITCOIN_CORE_PASSWORD, BITCOIN_CORE_PORT, BITCOIN_CORE_USERNAME, BITCOIN_CORE_WALLET, PARACHAIN_ENDPOINT, VAULT_TO_LIQUIDATE_URI, ESPLORA_BASE_PATH, VAULT_TO_BAN_URI, NATIVE_CURRENCY_TICKER, WRAPPED_CURRENCY_TICKER } from "../../../config";
import { BitcoinCoreClient } from "../../../../src/utils/bitcoin-core-client";
import { DefaultElectrsAPI } from "../../../../src/external/electrs";
import { issueSingle, stripHexPrefix } from "../../../../src/utils";
import { CollateralCurrency, DefaultBTCRelayAPI, DefaultIssueAPI, DefaultTransactionAPI, ExecuteRedeem, issueAndRedeem, IssueAPI, newAccountId, newVaultId, RedeemStatus, tickerToMonetaryCurrency, waitForBlockFinalization, WrappedCurrency } from "../../../../src";
import { assert, expect } from "../../../chai";
import { runWhileMiningBTCBlocks, sudo } from "../../../utils/helpers";
import Big from "big.js";

export type RequestResult = { hash: Hash; vault: Vault };

describe.only("redeem", () => {
    let redeemAPI: DefaultRedeemAPI;
    let electrsAPI: DefaultElectrsAPI;
    let btcRelayAPI: DefaultBTCRelayAPI;
    let api: ApiPromise;
    let keyring: Keyring;
    let userAccount: KeyringPair;
    let vaultToLiquidate: KeyringPair;
    let vaultToLiquidateId: VaultId;
    let vaultToBan: KeyringPair;
    let vaultToBanId: VaultId;
    let userBitcoinCoreClient: BitcoinCoreClient;
    let bitcoinCoreClient: BitcoinCoreClient;
    let issueAPI: IssueAPI;

    let nativeCurrency: CollateralCurrency;
    let wrappedCurrency: WrappedCurrency;

    before(async () => {
        api = await createPolkadotAPI(PARACHAIN_ENDPOINT);
        keyring = new Keyring({ type: "sr25519" });
        userAccount = keyring.addFromUri(USER_1_URI);
        nativeCurrency = tickerToMonetaryCurrency(api, NATIVE_CURRENCY_TICKER) as CollateralCurrency;
        wrappedCurrency = tickerToMonetaryCurrency(api, WRAPPED_CURRENCY_TICKER) as WrappedCurrency;
        vaultToLiquidate = keyring.addFromUri(VAULT_TO_LIQUIDATE_URI);
        vaultToLiquidateId = newVaultId(api, vaultToLiquidate.address, Polkadot, wrappedCurrency);
        vaultToBan = keyring.addFromUri(VAULT_TO_BAN_URI);
        vaultToBanId = newVaultId(api, vaultToBan.address, Polkadot, wrappedCurrency);
        electrsAPI = new DefaultElectrsAPI(ESPLORA_BASE_PATH);
        btcRelayAPI = new DefaultBTCRelayAPI(api, electrsAPI);
        redeemAPI = new DefaultRedeemAPI(api, bitcoinjs.networks.regtest, electrsAPI, wrappedCurrency, nativeCurrency, userAccount);
        userBitcoinCoreClient = new BitcoinCoreClient(
            BITCOIN_CORE_NETWORK,
            BITCOIN_CORE_HOST,
            BITCOIN_CORE_USERNAME,
            BITCOIN_CORE_PASSWORD,
            BITCOIN_CORE_PORT,
            BITCOIN_CORE_WALLET
        );
        issueAPI = new DefaultIssueAPI(api, bitcoinjs.networks.regtest, electrsAPI, wrappedCurrency, nativeCurrency);
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

    it.only("should liquidate a vault that committed theft", async () => {
        await runWhileMiningBTCBlocks(bitcoinCoreClient, async () => {
            // There should be no burnable tokens
            await expect(redeemAPI.getBurnExchangeRate(Polkadot)).to.be.rejected;
            const issuedTokens = InterBtcAmount.from.BTC(0.0001);
            await issueSingle(api, electrsAPI, userBitcoinCoreClient, userAccount, issuedTokens, nativeCurrency, vaultToLiquidateId, true, false);
            const vaultBitcoinCoreClient = new BitcoinCoreClient(
                BITCOIN_CORE_NETWORK,
                BITCOIN_CORE_HOST,
                BITCOIN_CORE_USERNAME,
                BITCOIN_CORE_PASSWORD,
                BITCOIN_CORE_PORT,
                "vault_to_liquidate-DOT-INTERBTC"
            );
            // Steal some bitcoin (spend from the vault's account)
            const foreignBitcoinAddress = "bcrt1qefxeckts7tkgz7uach9dnwer4qz5nyehl4sjcc";
            const amountToSteal = InterBtcAmount.from.BTC(0.00001);
            await vaultBitcoinCoreClient.sendToAddress(foreignBitcoinAddress, amountToSteal);
            // it takes about 15 mins for the theft to be reported
            await DefaultTransactionAPI.waitForEvent(api, api.events.relay.VaultTheft, 17 * 60000);

            await waitForBlockFinalization(bitcoinCoreClient, btcRelayAPI);
            const maxBurnableTokens = await redeemAPI.getMaxBurnableTokens(Polkadot);
            assert.equal(maxBurnableTokens.str.BTC(), issuedTokens.str.BTC());
            const burnExchangeRate = await redeemAPI.getBurnExchangeRate(Polkadot);
            assert.isTrue(burnExchangeRate.toBig().gt(new Big(1)), "Burn exchange rate should be above one");
            // Burn InterBtc for a premium, to restore peg
            await redeemAPI.burn(amountToSteal, Polkadot);
        });
    }).timeout(18 * 60000);

    it("should cancel a redeem request", async () => {
        await runWhileMiningBTCBlocks(bitcoinCoreClient, async () => {
            const issueAmount = InterBtcAmount.from.BTC(0.001);
            const redeemAmount = InterBtcAmount.from.BTC(0.0009);
            const initialRedeemPeriod = await redeemAPI.getRedeemPeriod();
            await sudo(redeemAPI, (api) => api.setRedeemPeriod(0));
            const [, redeemRequest] = await issueAndRedeem(api, electrsAPI, btcRelayAPI, userBitcoinCoreClient, userAccount, nativeCurrency, vaultToBanId, issueAmount, redeemAmount, false, ExecuteRedeem.False);
    
            // Wait for redeem expiry callback
            await new Promise<void>((resolve, _) => {
                redeemAPI.subscribeToRedeemExpiry(newAccountId(api, userAccount.address), (requestId) => {
                    if (stripHexPrefix(redeemRequest.id.toString()) === stripHexPrefix(requestId.toString())) {
                        resolve();
                    }
                });
            });
            await redeemAPI.cancel(redeemRequest.id.toString(), true);
            const redeemRequestAfterCancellation = await redeemAPI.getRequestById(redeemRequest.id);
            assert.isTrue(redeemRequestAfterCancellation.status === RedeemStatus.Reimbursed, "Failed to cancel issue request");
            // Set issue period back to its initial value to minimize side effects.
            await sudo(redeemAPI, (api) => api.setRedeemPeriod(initialRedeemPeriod));
        });
    }).timeout(5 * 60 * 1000);

    it("should issue and auto-execute redeem", async () => {
        await runWhileMiningBTCBlocks(bitcoinCoreClient, async () => {
            const issueAmount = InterBtcAmount.from.BTC(0.001);
            const redeemAmount = InterBtcAmount.from.BTC(0.0009);
            await issueAndRedeem(api, electrsAPI, btcRelayAPI, bitcoinCoreClient, userAccount, nativeCurrency, undefined, issueAmount, redeemAmount, false);
        });
        // The `ExecuteRedeem` event has been emitted at this point.
        // Do not check balances as this is already checked in the parachain integration tests.
    }).timeout(10 * 60 * 1000);

    it("should issue and manually execute redeem", async () => {
        await runWhileMiningBTCBlocks(bitcoinCoreClient, async () => {
            const issueAmount = InterBtcAmount.from.BTC(0.001);
            const redeemAmount = InterBtcAmount.from.BTC(0.0009);
            await issueAndRedeem(api, electrsAPI, btcRelayAPI, bitcoinCoreClient, userAccount, nativeCurrency, undefined, issueAmount, redeemAmount, false, ExecuteRedeem.Manually);
        });
        // The `ExecuteRedeem` event has been emitted at this point.
        // Do not check balances as this is already checked in the parachain integration tests.
    }).timeout(10 * 60 * 1000);
});
