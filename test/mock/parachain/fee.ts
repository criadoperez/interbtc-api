import { FeeAPI } from "../../../src/parachain";
import { PolkaBTC } from "../../../src/interfaces/default";
import { ReplaceRequestExt } from "../../../src/parachain/replace";
import { AccountId } from "@polkadot/types/interfaces";
import Big from "big.js";

export class MockFeeAPI implements FeeAPI {
    getGriefingCollateral(amountSat: Big, griefingCollateralRate: Big): Promise<Big> {
        throw new Error("Method not implemented.");
    }
    getReplaceGriefingCollateralRate(): Promise<Big> {
        throw new Error("Method not implemented.");
    }

    getIssueGriefingCollateralRate(): Promise<Big> {
        throw new Error("Method not implemented.");
    }
    
    getGriefingCollateralInPlanck(_amountSat: PolkaBTC, _griefingCollateralRate: Big): Promise<Big> {
        throw new Error("Method not implemented.");
    }

    calculateAPY(_feesPolkaBTC: Big, _feesDOT: Big, _lockedDOT: Big): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async list(): Promise<ReplaceRequestExt[]> {
        return Promise.resolve([]);
    }

    async map(): Promise<Map<AccountId, ReplaceRequestExt>> {
        return Promise.resolve(new Map<AccountId, ReplaceRequestExt>());
    }

    async request(_amount: PolkaBTC): Promise<void> {
        return;
    }
}
