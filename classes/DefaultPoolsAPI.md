[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / DefaultPoolsAPI

# Class: DefaultPoolsAPI

## Implements

- [`PoolsAPI`](/interfaces/PoolsAPI.md)

## Table of contents

### Constructors

- [constructor](/classes/DefaultPoolsAPI.md#constructor)

### Properties

- [api](/classes/DefaultPoolsAPI.md#api)

### Methods

- [backingCollateralProportion](/classes/DefaultPoolsAPI.md#backingcollateralproportion)
- [computeCollateralInStakingPool](/classes/DefaultPoolsAPI.md#computecollateralinstakingpool)
- [computeReward](/classes/DefaultPoolsAPI.md#computereward)
- [computeRewardInRewardsPool](/classes/DefaultPoolsAPI.md#computerewardinrewardspool)
- [computeRewardInStakingPool](/classes/DefaultPoolsAPI.md#computerewardinstakingpool)
- [getFeesWrapped](/classes/DefaultPoolsAPI.md#getfeeswrapped)
- [getRewardsPoolRewardPerToken](/classes/DefaultPoolsAPI.md#getrewardspoolrewardpertoken)
- [getRewardsPoolRewardTally](/classes/DefaultPoolsAPI.md#getrewardspoolrewardtally)
- [getRewardsPoolStake](/classes/DefaultPoolsAPI.md#getrewardspoolstake)
- [getStakingPoolNonce](/classes/DefaultPoolsAPI.md#getstakingpoolnonce)
- [getStakingPoolRewardPerToken](/classes/DefaultPoolsAPI.md#getstakingpoolrewardpertoken)
- [getStakingPoolRewardTally](/classes/DefaultPoolsAPI.md#getstakingpoolrewardtally)
- [getStakingPoolSlashPerToken](/classes/DefaultPoolsAPI.md#getstakingpoolslashpertoken)
- [getStakingPoolSlashTally](/classes/DefaultPoolsAPI.md#getstakingpoolslashtally)
- [getStakingPoolStake](/classes/DefaultPoolsAPI.md#getstakingpoolstake)

## Constructors

### constructor

• **new DefaultPoolsAPI**(`api`, `btcNetwork`, `electrsAPI`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `btcNetwork` | [`Network`](/interfaces/bitcoin.networks.Network.md) |
| `electrsAPI` | [`ElectrsAPI`](/interfaces/ElectrsAPI.md) |

#### Defined in

[src/parachain/pools.ts:116](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L116)

## Properties

### api

• **api**: `ApiPromise`

## Methods

### backingCollateralProportion

▸ **backingCollateralProportion**<`C1`, `C2`\>(`currency`, `collateralCurrency`, `nomineeId`, `nominatorId`): `Promise`<`Big`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C1` | extends [`CurrencyUnit`](/modules.md#currencyunit) |
| `C2` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency`<`C1`\> |
| `collateralCurrency` | `Currency`<`C2`\> |
| `nomineeId` | `string` |
| `nominatorId` | `string` |

#### Returns

`Promise`<`Big`\>

#### Defined in

[src/parachain/pools.ts:242](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L242)

___

### computeCollateralInStakingPool

▸ **computeCollateralInStakingPool**<`C`\>(`currency`, `nomineeId`, `nominatorId`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency`<`C`\> |
| `nomineeId` | `string` |
| `nominatorId` | `string` |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

A Monetary.js amount object, representing the collateral in the given currency

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[computeCollateralInStakingPool](/interfaces/PoolsAPI.md#computecollateralinstakingpool)

#### Defined in

[src/parachain/pools.ts:177](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L177)

___

### computeReward

▸ **computeReward**<`C1`, `C2`\>(`currency`, `collateralCurrency`, `nomineeId`, `nominatorId`): `Promise`<`MonetaryAmount`<`Currency`<`C1`\>, `C1`\>\>

Compute the total reward, including the staking (local) pool and the rewards (global) pool

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C1` | extends [`CurrencyUnit`](/modules.md#currencyunit) |
| `C2` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency`<`C1`\> |
| `collateralCurrency` | `Currency`<`C2`\> |
| `nomineeId` | `string` |
| `nominatorId` | `string` |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C1`\>, `C1`\>\>

A Monetary.js amount object, representing the total reward in the given currency

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[computeReward](/interfaces/PoolsAPI.md#computereward)

#### Defined in

[src/parachain/pools.ts:257](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L257)

___

### computeRewardInRewardsPool

▸ **computeRewardInRewardsPool**<`C`\>(`currency`, `accountId`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency`<`C`\> |
| `accountId` | `string` |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

A Monetary.js amount object, representing the reward in the given currency

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[computeRewardInRewardsPool](/interfaces/PoolsAPI.md#computerewardinrewardspool)

#### Defined in

[src/parachain/pools.ts:215](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L215)

___

### computeRewardInStakingPool

▸ **computeRewardInStakingPool**<`C`\>(`currency`, `nomineeId`, `nominatorId`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency`<`C`\> |
| `nomineeId` | `string` |
| `nominatorId` | `string` |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

A Monetary.js amount object, representing the reward in the given currency

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[computeRewardInStakingPool](/interfaces/PoolsAPI.md#computerewardinstakingpool)

#### Defined in

[src/parachain/pools.ts:118](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L118)

___

### getFeesWrapped

▸ **getFeesWrapped**<`C`\>(`vaultId`, `collateralCurrency`): `Promise`<`BTCAmount`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `string` |
| `collateralCurrency` | `Currency`<`C`\> |

#### Returns

`Promise`<`BTCAmount`\>

The total InterBTC reward collected by the vault

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[getFeesWrapped](/interfaces/PoolsAPI.md#getfeeswrapped)

#### Defined in

[src/parachain/pools.ts:275](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L275)

___

### getRewardsPoolRewardPerToken

▸ **getRewardsPoolRewardPerToken**(`currencyId`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |

#### Returns

`Promise`<`Big`\>

The reward per token, as a Big object

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[getRewardsPoolRewardPerToken](/interfaces/PoolsAPI.md#getrewardspoolrewardpertoken)

#### Defined in

[src/parachain/pools.ts:237](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L237)

___

### getRewardsPoolRewardTally

▸ **getRewardsPoolRewardTally**(`currencyId`, `accountId`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |
| `accountId` | `string` |

#### Returns

`Promise`<`Big`\>

The reward tally, as a Big object

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[getRewardsPoolRewardTally](/interfaces/PoolsAPI.md#getrewardspoolrewardtally)

#### Defined in

[src/parachain/pools.ts:232](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L232)

___

### getRewardsPoolStake

▸ **getRewardsPoolStake**(`currencyId`, `accountId`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |
| `accountId` | `string` |

#### Returns

`Promise`<`Big`\>

The stake, as a Big object

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[getRewardsPoolStake](/interfaces/PoolsAPI.md#getrewardspoolstake)

#### Defined in

[src/parachain/pools.ts:227](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L227)

___

### getStakingPoolNonce

▸ **getStakingPoolNonce**(`currencyId`, `nomineeId`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |
| `nomineeId` | `string` |

#### Returns

`Promise`<`number`\>

The current nonce of the staking pool

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[getStakingPoolNonce](/interfaces/PoolsAPI.md#getstakingpoolnonce)

#### Defined in

[src/parachain/pools.ts:131](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L131)

___

### getStakingPoolRewardPerToken

▸ **getStakingPoolRewardPerToken**(`currencyId`, `nomineeId`, `nonce?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |
| `nomineeId` | `string` |
| `nonce?` | `number` |

#### Returns

`Promise`<`Big`\>

The reward per token, as a Big object

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[getStakingPoolRewardPerToken](/interfaces/PoolsAPI.md#getstakingpoolrewardpertoken)

#### Defined in

[src/parachain/pools.ts:167](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L167)

___

### getStakingPoolRewardTally

▸ **getStakingPoolRewardTally**(`currencyId`, `nomineeId`, `nominatorId`, `nonce?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |
| `nomineeId` | `string` |
| `nominatorId` | `string` |
| `nonce?` | `number` |

#### Returns

`Promise`<`Big`\>

The reward tally, as a Big object

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[getStakingPoolRewardTally](/interfaces/PoolsAPI.md#getstakingpoolrewardtally)

#### Defined in

[src/parachain/pools.ts:152](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L152)

___

### getStakingPoolSlashPerToken

▸ **getStakingPoolSlashPerToken**(`currencyId`, `nomineeId`, `nonce?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |
| `nomineeId` | `string` |
| `nonce?` | `number` |

#### Returns

`Promise`<`Big`\>

#### Defined in

[src/parachain/pools.ts:190](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L190)

___

### getStakingPoolSlashTally

▸ **getStakingPoolSlashTally**(`currencyId`, `nomineeId`, `nominatorId`, `nonce?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |
| `nomineeId` | `string` |
| `nominatorId` | `string` |
| `nonce?` | `number` |

#### Returns

`Promise`<`Big`\>

#### Defined in

[src/parachain/pools.ts:200](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L200)

___

### getStakingPoolStake

▸ **getStakingPoolStake**(`currencyId`, `nomineeId`, `nominatorId`, `nonce?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) |
| `nomineeId` | `string` |
| `nominatorId` | `string` |
| `nonce?` | `number` |

#### Returns

`Promise`<`Big`\>

The stake, as a Big object

#### Implementation of

[PoolsAPI](/interfaces/PoolsAPI.md).[getStakingPoolStake](/interfaces/PoolsAPI.md#getstakingpoolstake)

#### Defined in

[src/parachain/pools.ts:137](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L137)
