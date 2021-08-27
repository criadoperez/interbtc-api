[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / FeeAPI

# Interface: FeeAPI

## Implemented by

- [`DefaultFeeAPI`](/classes/DefaultFeeAPI.md)

## Table of contents

### Methods

- [calculateAPY](/interfaces/FeeAPI.md#calculateapy)
- [getGriefingCollateral](/interfaces/FeeAPI.md#getgriefingcollateral)
- [getIssueFee](/interfaces/FeeAPI.md#getissuefee)
- [getIssueGriefingCollateralRate](/interfaces/FeeAPI.md#getissuegriefingcollateralrate)
- [getReplaceGriefingCollateralRate](/interfaces/FeeAPI.md#getreplacegriefingcollateralrate)

## Methods

### calculateAPY

▸ **calculateAPY**(`feesWrapped`, `lockedCollateral`, `exchangeRate?`): `Promise`<`Big`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feesWrapped` | `BTCAmount` | Wrapped token fees accrued, in wrapped token (e.g. BTC) |
| `lockedCollateral` | `PolkadotAmount` | Collateral value representing the value locked to gain yield. |
| `exchangeRate?` | `ExchangeRate`<`Currency`<`Object`\>, `Object`, `Currency`<`Object`\>, `Object`\> | (Optional) Conversion rate, as a `Monetary.js` object |

#### Returns

`Promise`<`Big`\>

The APY, given the parameters

#### Defined in

[src/parachain/fee.ts:41](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L41)

___

### getGriefingCollateral

▸ **getGriefingCollateral**<`C`\>(`amount`, `griefingCollateralRate`, `collateralCurrency`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BTCAmount` | Amount, in BTC, for which to compute the required griefing collateral |
| `griefingCollateralRate` | `Big` |  |
| `collateralCurrency` | `Currency`<`C`\> | - |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

The griefing collateral

#### Defined in

[src/parachain/fee.ts:29](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L29)

___

### getIssueFee

▸ **getIssueFee**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The percentage of issued token that is received by the vault as reward

#### Defined in

[src/parachain/fee.ts:57](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L57)

___

### getIssueGriefingCollateralRate

▸ **getIssueGriefingCollateralRate**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The griefing collateral rate for issuing InterBTC

#### Defined in

[src/parachain/fee.ts:49](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L49)

___

### getReplaceGriefingCollateralRate

▸ **getReplaceGriefingCollateralRate**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The griefing collateral rate for the Vault replace request

#### Defined in

[src/parachain/fee.ts:53](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L53)
