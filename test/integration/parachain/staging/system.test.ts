import { ApiPromise, Keyring } from "@polkadot/api";
import * as fs from "fs";
import * as path from "path";

import { DefaultSystemAPI, SystemAPI } from "../../../../src/parachain/system";
import { createPolkadotAPI } from "../../../../src/factory";
import { assert } from "../../../chai";
import { ALICE_URI, DEFAULT_PARACHAIN_ENDPOINT } from "../../../config";
import { KeyringPair } from "@polkadot/keyring/types";

describe("systemAPI", () => {
    let api: ApiPromise;
    let systemAPI: SystemAPI;
    let alice: KeyringPair;
    let keyring: Keyring;

    before(async () => {
        api = await createPolkadotAPI(DEFAULT_PARACHAIN_ENDPOINT);
        keyring = new Keyring({ type: "sr25519" });
        alice = keyring.addFromUri(ALICE_URI);
        systemAPI = new DefaultSystemAPI(api, alice);
    });

    after(async () => {
        api.disconnect();
    });

    it("should getCurrentBlockNumber", async () => {
        const currentBlockNumber = await systemAPI.getCurrentBlockNumber();
        assert.isDefined(currentBlockNumber);
    });

    it("should getStatusCode", async () => {
        const statusCode = await systemAPI.getStatusCode();
        assert.isDefined(statusCode);
    });

    // TODO: Unskip once differences between rococo-local and standalone are fix
    it.skip("should setCode", async () => {
        const code = fs.readFileSync(
            path.join(__dirname, "../../../mock/rococo_runtime.compact.wasm")
        ).toString("hex");
        await systemAPI.setCode(code);

    });
});
