import { ApiPromise, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { H256, Hash } from "@polkadot/types/interfaces";
import { Bytes, u32 } from "@polkadot/types/primitive";
import { ImportMock } from "ts-mock-imports";
import { DefaultBTCCoreAPI } from "../../../src/apis/btc-core";
import { DefaultIssueAPI } from "../../../src/apis/issue";
import { createPolkadotAPI } from "../../../src/factory";
import { H256Le, Vault } from "../../../src/interfaces/default";
import { btcToSat, encodeBtcAddress, stripHexPrefix } from "../../../src/utils";
import { assert, expect } from "../../chai";
import { defaultEndpoint } from "../../config";
import * as bitcoin from "bitcoinjs-lib";
import { delay } from "../../helpers";

export type RequestResult = { hash: Hash; vault: Vault };

describe("issue", () => {
    let api: ApiPromise;
    let issueAPI: DefaultIssueAPI;
    let keyring: Keyring;

    // alice is the root account
    let alice: KeyringPair;
    let bob: KeyringPair;
    let dave: KeyringPair;

    before(async function () {
        api = await createPolkadotAPI(defaultEndpoint);
        keyring = new Keyring({ type: "sr25519" });
        // Alice is also the root account
        alice = keyring.addFromUri("//Alice");
        bob = keyring.addFromUri("//Bob");
    });

    beforeEach(() => {
        issueAPI = new DefaultIssueAPI(api, bitcoin.networks.regtest);
    });

    after(async () => {
        api.disconnect();
    });

    describe("list", () => {
        it("should list all issue requests", async () => {
            const aliceAccountId = api.createType("AccountId", alice.address);
            const requests = await issueAPI.mapForUser(aliceAccountId);
            // There should be a single request after the docker-compose setup
            assert.isTrue(requests.size === 1);
        });
    });

    describe("request", () => {
        it("should fail if no account is set", () => {
            const amount = api.createType("Balance", 10);
            assert.isRejected(issueAPI.request(amount));
        });

        it("should request issue", async () => {
            keyring = new Keyring({ type: "sr25519" });
            alice = keyring.addFromUri("//Alice");
            issueAPI.setAccount(alice);
            const amount = api.createType("Balance", 100000);
            const requestResult = await issueAPI.request(amount);
            console.log("finalized request issue");
            assert.isTrue(requestResult.hash.length > 0);
        });
    });

    describe("execute", () => {
        let txHash: Hash;

        it("should fail if no account is set", () => {
            const issueId: H256 = <H256>{};
            const txId: H256Le = <H256Le>{};
            const merkleProof: Bytes = <Bytes>{};
            const rawTx: Bytes = <Bytes>{};
            assert.isRejected(issueAPI.execute(issueId, txId, merkleProof, rawTx));
        });

        it("should request if account is set", async () => {
            issueAPI.setAccount(alice);
            const amount = api.createType("Balance", 1);
            const bobVaultId = api.createType("AccountId", bob.address);
            const requestResult = await issueAPI.request(amount);
            txHash = requestResult.hash;
            assert.isDefined(txHash);
        });

        it("should consider execution successful if `isExecutionSucessful` returns true", async () => {
            const { issueId, txId, merkleProof, rawTx } = makeExecutionData();
            issueAPI.setAccount(alice);
            ImportMock.mockFunction(issueAPI, "isExecutionSucessful", true);
            const isExecutionCorrect = await issueAPI.execute(issueId, txId, merkleProof, rawTx);
            assert.isTrue(isExecutionCorrect);
        });

        it("should consider execution failed if `isExecutionSucessful` returns false", async () => {
            const { issueId, txId, merkleProof, rawTx } = makeExecutionData();
            issueAPI.setAccount(alice);
            ImportMock.mockFunction(issueAPI, "isExecutionSucessful", false);
            const isExecutionCorrect = await issueAPI.execute(issueId, txId, merkleProof, rawTx);
            assert.isFalse(isExecutionCorrect);
        });

        it("should request and execute issue", async () => {
            const btcCore = new DefaultBTCCoreAPI("http://0.0.0.0:3002");
            btcCore.initializeClientConnection("regtest", "0.0.0.0", "rpcuser", "rpcpassword", "18443", "Alice");
            const initialBalance = await btcCore.getBalance();
            const blocksToMine = 3;
            const blockMiningReward = 50;
            const projectedMaxFees = 0.15;
            keyring = new Keyring({ type: "sr25519" });
            alice = keyring.addFromUri("//Alice");
            dave = keyring.addFromUri("//Dave");

            // request issue
            issueAPI.setAccount(alice);
            const amountAsBtcString = "0.001";
            const amountAsSatoshiString = btcToSat(amountAsBtcString);
            const amountAsSatoshi = api.createType("Balance", amountAsSatoshiString);
            const requestResult = await issueAPI.request(amountAsSatoshi);
            assert.isTrue(requestResult.hash.length > 0);

            // send btc tx
            const data = stripHexPrefix(requestResult.hash.toString());
            const vaultBtcAddress = encodeBtcAddress(requestResult.vault.wallet.address, bitcoin.networks.regtest);
            if (vaultBtcAddress === undefined) {
                throw new Error("Undefined vault address returned from RequestIssue");
            }
            const txData = await btcCore.broadcastOpReturnTx(vaultBtcAddress, amountAsBtcString, data);
            await btcCore.mineBlocks(blocksToMine);

            // check issuing worked
            const finalBalance = await btcCore.getBalance();
            const finalBalanceWithoutMiningRewards = finalBalance - blocksToMine * blockMiningReward;
            assert.isTrue(
                Math.abs(initialBalance - finalBalanceWithoutMiningRewards) <=
                    Number(amountAsBtcString) + projectedMaxFees
            );
        });
    });

    describe("cancel", () => {
        it("should cancel a request issue", async () => {
            keyring = new Keyring({ type: "sr25519" });
            alice = keyring.addFromUri("//Alice");
            dave = keyring.addFromUri("//Dave");

            let activeIssueRequests = await issueAPI.list();
            activeIssueRequests = activeIssueRequests.filter((request) => request.completed.isFalse);
            const initialIssueRequests = activeIssueRequests.length;

            // request issue
            issueAPI.setAccount(alice);
            const amountAsBtcString = "0.001";
            const amountAsSatoshiString = btcToSat(amountAsBtcString);
            const amountAsSatoshi = api.createType("Balance", amountAsSatoshiString);
            const requestResult = await issueAPI.request(amountAsSatoshi);
            assert.isTrue(requestResult.hash.length > 0);

            await delay(60000);
            // Before cancelling, there should be 1 outstanding request
            activeIssueRequests = await issueAPI.list();
            activeIssueRequests = activeIssueRequests.filter((request) => request.completed.isFalse);
            assert.isTrue(activeIssueRequests.length === initialIssueRequests + 1);
            await issueAPI.cancel(requestResult.hash);

            // After cancelling, there should be no outstanding request
            activeIssueRequests = await issueAPI.list();
            activeIssueRequests = activeIssueRequests.filter((request) => request.completed.isFalse);
            assert.isTrue(activeIssueRequests.length === initialIssueRequests);
        });
    });

    describe("check getIssuePeriod method ", () => {
        it("getIssuePeriod", async () => {
            try {
                issueAPI.setAccount(alice);
                const period = await issueAPI.getIssuePeriod();
                expect(period.toString()).equal("3");
            } catch (error) {
                console.log(error);
            }
        });
    });

    type ExecutionData = {
        issueId: H256;
        txId: H256Le;
        merkleProof: Bytes;
        rawTx: Bytes;
    };
    function makeExecutionData(): ExecutionData {
        const issueId = api.createType("H256", "0x81dd458cd3bb82cf68b52dce27a5ac1f616b0278b2f36c4c05bfd528c2e1e8e9");
        const txId: H256Le = api.createType(
            "H256",
            // prettier-ignore
            [
                70, 103, 64, 2, 223, 149, 66, 146, 36, 69, 6, 199, 80, 43, 96,
                106, 174, 205, 77, 120, 69, 217, 253, 57, 140, 255, 196, 198, 144, 61, 18, 248
            ]
        ) as H256Le;
        const merkleProof: Bytes = api.createType(
            "Bytes",
            // prettier-ignore
            [
                2, 0, 0, 0, 244, 134, 26, 210, 38, 249, 3, 175, 137, 182, 208,
                251, 9, 59, 211, 77, 200, 110, 67, 171, 216, 90, 255, 111, 72,
                97, 187, 76, 166, 94, 240, 19, 213, 54, 6, 130, 156, 254, 180,
                145, 173, 84, 28, 196, 222, 78, 232, 5, 160, 160, 3, 117, 203,
                70, 200, 166, 141, 180, 204, 179, 134, 5, 232, 26, 243, 99, 179,
                94, 0, 0, 64, 32, 1, 0, 0, 0, 2, 0, 0, 0, 2, 56, 108, 49, 183, 51,
                251, 228, 176, 233, 214, 204, 196, 69, 202, 199, 158, 219, 253, 38,
                85, 184, 163, 65, 215, 198, 31, 60, 181, 117, 8, 151, 212, 70, 103,
                64, 2, 223, 149, 66, 146, 36, 69, 6, 199, 80, 43, 96, 106, 174, 205,
                77, 120, 69, 217, 253, 57, 140, 255, 196, 198, 144, 61, 18, 248, 1, 5
            ]
        );
        const rawTx: Bytes = api.createType(
            "Bytes",
            // prettier-ignore
            [
                2, 0, 0, 0, 1, 22, 59, 241, 41, 121, 78, 23, 16, 159, 81,
                145, 67, 102, 63, 131, 101, 232, 183, 64, 173, 236, 247,
                249, 134, 8, 242, 39, 166, 231, 131, 49, 251, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 2, 160, 134, 1, 0, 0, 0, 0, 0, 25, 118, 169,
                20, 191, 52, 8, 246, 192, 222, 192, 135, 159, 124, 29, 77,
                10, 94, 136, 19, 252, 13, 181, 105, 136, 172, 0, 0, 0, 0,
                0, 0, 0, 0, 34, 106, 32, 129, 221, 69, 140, 211, 187, 130,
                207, 104, 181, 45, 206, 39, 165, 172, 31, 97, 107, 2, 120,
                178, 243, 108, 76, 5, 191, 213, 40, 194, 225, 232, 233,
                0, 0, 0, 0
            ]
        );
        return { issueId, txId, merkleProof, rawTx };
    }
});
