[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / DefaultFeeAPI

# Class: DefaultFeeAPI

## Implements

- [`FeeAPI`](/interfaces/FeeAPI.md)

## Table of contents

### Constructors

- [constructor](/classes/DefaultFeeAPI.md#constructor)

### Properties

- [oracleAPI](/classes/DefaultFeeAPI.md#oracleapi)

### Methods

- [calculateAPY](/classes/DefaultFeeAPI.md#calculateapy)
- [getGriefingCollateral](/classes/DefaultFeeAPI.md#getgriefingcollateral)
- [getIssueFee](/classes/DefaultFeeAPI.md#getissuefee)
- [getIssueGriefingCollateralRate](/classes/DefaultFeeAPI.md#getissuegriefingcollateralrate)
- [getReplaceGriefingCollateralRate](/classes/DefaultFeeAPI.md#getreplacegriefingcollateralrate)

## Constructors

### constructor

• **new DefaultFeeAPI**(`api`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |

#### Defined in

[src/parachain/fee.ts:63](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L63)

## Properties

### oracleAPI

• `Private` **oracleAPI**: [`OracleAPI`](/interfaces/OracleAPI.md)

#### Defined in

[src/parachain/fee.ts:61](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L61)

## Methods

### calculateAPY

▸ **calculateAPY**<`C`\>(`feesWrapped`, `lockedCollateral`, `exchangeRate?`): `Promise`<`Big`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `feesWrapped` | `BTCAmount` |
| `lockedCollateral` | `MonetaryAmount`<`Currency`<`C`\>, `C`\> |
| `exchangeRate?` | `ExchangeRate`<`Currency`<`Object`\>, `Object`, `Currency`<`C`\>, `C`\> |

#### Returns

`Promise`<`Big`\>

The APY, given the parameters

#### Implementation of

[FeeAPI](/interfaces/FeeAPI.md).[calculateAPY](/interfaces/FeeAPI.md#calculateapy)

#### Defined in

[src/parachain/fee.ts:94](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L94)

___

### getGriefingCollateral

▸ **getGriefingCollateral**<`C`\>(`amount`, `griefingCollateralRate`, `collateralCurrency`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `BTCAmount` |
| `griefingCollateralRate` | `Big` |
| `collateralCurrency` | `Currency`<`C`\> |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

The griefing collateral

#### Implementation of

[FeeAPI](/interfaces/FeeAPI.md).[getGriefingCollateral](/interfaces/FeeAPI.md#getgriefingcollateral)

#### Defined in

[src/parachain/fee.ts:67](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L67)

___

### getIssueFee

▸ **getIssueFee**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The percentage of issued token that is received by the vault as reward

#### Implementation of

[FeeAPI](/interfaces/FeeAPI.md).[getIssueFee](/interfaces/FeeAPI.md#getissuefee)

#### Defined in

[src/parachain/fee.ts:88](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L88)

___

### getIssueGriefingCollateralRate

▸ **getIssueGriefingCollateralRate**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The griefing collateral rate for issuing InterBTC

#### Implementation of

[FeeAPI](/interfaces/FeeAPI.md).[getIssueGriefingCollateralRate](/interfaces/FeeAPI.md#getissuegriefingcollateralrate)

#### Defined in

[src/parachain/fee.ts:76](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L76)

___

### getReplaceGriefingCollateralRate

▸ **getReplaceGriefingCollateralRate**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The griefing collateral rate for the Vault replace request

#### Implementation of

[FeeAPI](/interfaces/FeeAPI.md).[getReplaceGriefingCollateralRate](/interfaces/FeeAPI.md#getreplacegriefingcollateralrate)

#### Defined in

[src/parachain/fee.ts:82](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/fee.ts#L82)
