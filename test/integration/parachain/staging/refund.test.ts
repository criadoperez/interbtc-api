import { ApiPromise, Keyring } from "@polkadot/api";
import * as bitcoinjs from "bitcoinjs-lib";
import { KeyringPair } from "@polkadot/keyring/types";

import { ElectrsAPI, DefaultElectrsAPI } from "../../../../src/external/electrs";
import { BitcoinCoreClient } from "../../../../src/utils/bitcoin-core-client";
import { createPolkadotAPI } from "../../../../src/factory";
import { USER_1_URI, VAULT_3_URI, BITCOIN_CORE_HOST, BITCOIN_CORE_NETWORK, BITCOIN_CORE_PASSWORD, BITCOIN_CORE_PORT, BITCOIN_CORE_USERNAME, BITCOIN_CORE_WALLET, PARACHAIN_ENDPOINT, ESPLORA_BASE_PATH, WRAPPED_CURRENCY_TICKER, NATIVE_CURRENCY_TICKER } from "../../../config";
import { DefaultRefundAPI, RefundAPI } from "../../../../src/parachain/refund";
import { assert } from "../../../chai";
import { issueSingle } from "../../../../src/utils/issueRedeem";
import { InterBtc, InterBtcAmount, Polkadot } from "@interlay/monetary-js";
import { CollateralCurrency, newVaultId, tickerToMonetaryCurrency, VaultId, WrappedCurrency } from "../../../../src";

describe("refund", () => {
    let api: ApiPromise;
    let electrsAPI: ElectrsAPI;
    let refundAPI: RefundAPI;
    let bitcoinCoreClient: BitcoinCoreClient;
    let keyring: Keyring;
    let userAccount: KeyringPair;
    let vault_3: KeyringPair;
    let vault_3_id: VaultId;

    let nativeCurrency: CollateralCurrency;
    let wrappedCurrency: WrappedCurrency;

    before(async function () {
        api = await createPolkadotAPI(PARACHAIN_ENDPOINT);
        keyring = new Keyring({ type: "sr25519" });
        electrsAPI = new DefaultElectrsAPI(ESPLORA_BASE_PATH);
        bitcoinCoreClient = new BitcoinCoreClient(
            BITCOIN_CORE_NETWORK,
            BITCOIN_CORE_HOST,
            BITCOIN_CORE_USERNAME,
            BITCOIN_CORE_PASSWORD,
            BITCOIN_CORE_PORT,
            BITCOIN_CORE_WALLET
        );
        nativeCurrency = tickerToMonetaryCurrency(api, NATIVE_CURRENCY_TICKER) as CollateralCurrency;
        wrappedCurrency = tickerToMonetaryCurrency(api, WRAPPED_CURRENCY_TICKER) as WrappedCurrency;
        refundAPI = new DefaultRefundAPI(api, bitcoinjs.networks.regtest, electrsAPI, InterBtc);
        userAccount = keyring.addFromUri(USER_1_URI);
        vault_3 = keyring.addFromUri(VAULT_3_URI);
        vault_3_id = newVaultId(api, vault_3.address, Polkadot, wrappedCurrency);
    });

    after(async () => {
        api.disconnect();
    });

    it("should not generate a refund request", async () => {
        const issueResult = await issueSingle(
            api,
            electrsAPI,
            bitcoinCoreClient,
            userAccount,
            InterBtcAmount.from.BTC(0.001),
            nativeCurrency,
            vault_3_id,
            false,
            false
        );
        const refund = await refundAPI.getRequestByIssueId(issueResult.request.id);
        // The parachain returns an Option<> refund request if none was found,
        // which is deserialized as a refund request with blank/default fields
        assert.equal(refund.amountBtc.toString(), "0");
    }).timeout(1000000);

    it("should generate a refund request", async () => {
        const issueResult = await issueSingle(
            api,
            electrsAPI,
            bitcoinCoreClient,
            userAccount,
            InterBtcAmount.from.BTC(0.001),
            nativeCurrency,
            vault_3_id,
            true,
            true
        );
        const refund = await refundAPI.getRequestByIssueId(issueResult.request.id);
        const refundId = await refundAPI.getRequestIdByIssueId(issueResult.request.id);
        const refundClone = await refundAPI.getRequestById(refundId);
        assert.notEqual(refund.amountBtc.toString(), "0");
        assert.equal(refund.amountBtc.toString(), refundClone.amountBtc.toString());
    }).timeout(1000000);

    it("should list a single refund request", async () => {
        const refundRequests = await refundAPI.list();
        assert.equal(refundRequests.length, 1);
    }).timeout(100000);
});
