[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / PoolsAPI

# Interface: PoolsAPI

## Implemented by

- [`DefaultPoolsAPI`](/classes/DefaultPoolsAPI.md)

## Table of contents

### Methods

- [computeCollateralInStakingPool](/interfaces/PoolsAPI.md#computecollateralinstakingpool)
- [computeReward](/interfaces/PoolsAPI.md#computereward)
- [computeRewardInRewardsPool](/interfaces/PoolsAPI.md#computerewardinrewardspool)
- [computeRewardInStakingPool](/interfaces/PoolsAPI.md#computerewardinstakingpool)
- [getFeesWrapped](/interfaces/PoolsAPI.md#getfeeswrapped)
- [getRewardsPoolRewardPerToken](/interfaces/PoolsAPI.md#getrewardspoolrewardpertoken)
- [getRewardsPoolRewardTally](/interfaces/PoolsAPI.md#getrewardspoolrewardtally)
- [getRewardsPoolStake](/interfaces/PoolsAPI.md#getrewardspoolstake)
- [getStakingPoolNonce](/interfaces/PoolsAPI.md#getstakingpoolnonce)
- [getStakingPoolRewardPerToken](/interfaces/PoolsAPI.md#getstakingpoolrewardpertoken)
- [getStakingPoolRewardTally](/interfaces/PoolsAPI.md#getstakingpoolrewardtally)
- [getStakingPoolStake](/interfaces/PoolsAPI.md#getstakingpoolstake)

## Methods

### computeCollateralInStakingPool

▸ **computeCollateralInStakingPool**<`C`\>(`currency`, `nomineeId`, `nominatorId`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency`<`C`\> | The currency to compute remaining collateral for, a Monetary.js currency object |
| `nomineeId` | `string` | The account ID of the staking pool nominee |
| `nominatorId` | `string` | The account ID of the staking pool nominator |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

A Monetary.js amount object, representing the collateral in the given currency

#### Defined in

[src/parachain/pools.ts:71](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L71)

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency`<`C1`\> | The currency specification, a `Monetary.js` object |
| `collateralCurrency` | `Currency`<`C2`\> | The collateral currency specification, a `Monetary.js` object |
| `nomineeId` | `string` | The account ID of the staking pool nominee |
| `nominatorId` | `string` | The account ID of the staking pool nominator |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C1`\>, `C1`\>\>

A Monetary.js amount object, representing the total reward in the given currency

#### Defined in

[src/parachain/pools.ts:101](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L101)

___

### computeRewardInRewardsPool

▸ **computeRewardInRewardsPool**<`C`\>(`currency`, `accountId`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency`<`C`\> | - |
| `accountId` | `string` | The account ID whose reward to compute |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

A Monetary.js amount object, representing the reward in the given currency

#### Defined in

[src/parachain/pools.ts:61](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L61)

___

### computeRewardInStakingPool

▸ **computeRewardInStakingPool**<`C`\>(`currency`, `nomineeId`, `nominatorId`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency`<`C`\> | The currency to compute rewards for, a Monetary.js currency object |
| `nomineeId` | `string` | The account ID of the staking pool nominee |
| `nominatorId` | `string` | The account ID of the staking pool nominator |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

A Monetary.js amount object, representing the reward in the given currency

#### Defined in

[src/parachain/pools.ts:25](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L25)

___

### getFeesWrapped

▸ **getFeesWrapped**<`C`\>(`vaultId`, `collateralCurrency`): `Promise`<`BTCAmount`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vaultId` | `string` | The vault account ID |
| `collateralCurrency` | `Currency`<`C`\> | The collateral currency specification, a `Monetary.js` object |

#### Returns

`Promise`<`BTCAmount`\>

The total InterBTC reward collected by the vault

#### Defined in

[src/parachain/pools.ts:112](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L112)

___

### getRewardsPoolRewardPerToken

▸ **getRewardsPoolRewardPerToken**(`currencyId`): `Promise`<`Big`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) | The reward currency |

#### Returns

`Promise`<`Big`\>

The reward per token, as a Big object

#### Defined in

[src/parachain/pools.ts:92](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L92)

___

### getRewardsPoolRewardTally

▸ **getRewardsPoolRewardTally**(`currencyId`, `accountId`): `Promise`<`Big`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) | The reward currency |
| `accountId` | `string` | An account ID string |

#### Returns

`Promise`<`Big`\>

The reward tally, as a Big object

#### Defined in

[src/parachain/pools.ts:87](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L87)

___

### getRewardsPoolStake

▸ **getRewardsPoolStake**(`currencyId`, `accountId`): `Promise`<`Big`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) | The reward currency |
| `accountId` | `string` | An account ID string |

#### Returns

`Promise`<`Big`\>

The stake, as a Big object

#### Defined in

[src/parachain/pools.ts:81](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L81)

___

### getStakingPoolNonce

▸ **getStakingPoolNonce**(`currencyId`, `nomineeId`): `Promise`<`number`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) | The staked currency |
| `nomineeId` | `string` | The account ID of the staking pool nominee |

#### Returns

`Promise`<`number`\>

The current nonce of the staking pool

#### Defined in

[src/parachain/pools.ts:55](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L55)

___

### getStakingPoolRewardPerToken

▸ **getStakingPoolRewardPerToken**(`currencyId`, `nomineeId`): `Promise`<`Big`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) | The staked currency |
| `nomineeId` | `string` | The account ID of the staking pool nominee |

#### Returns

`Promise`<`Big`\>

The reward per token, as a Big object

#### Defined in

[src/parachain/pools.ts:49](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L49)

___

### getStakingPoolRewardTally

▸ **getStakingPoolRewardTally**(`currencyId`, `nomineeId`, `nominatorId`): `Promise`<`Big`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) | The staked currency |
| `nomineeId` | `string` | The account ID of the staking pool nominee |
| `nominatorId` | `string` | The account ID of the staking pool nominator |

#### Returns

`Promise`<`Big`\>

The reward tally, as a Big object

#### Defined in

[src/parachain/pools.ts:43](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L43)

___

### getStakingPoolStake

▸ **getStakingPoolStake**(`currencyId`, `nomineeId`, `nominatorId`): `Promise`<`Big`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyId` | [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md) | The staked currency |
| `nomineeId` | `string` | The account ID of the staking pool nominee |
| `nominatorId` | `string` | The account ID of the staking pool nominator |

#### Returns

`Promise`<`Big`\>

The stake, as a Big object

#### Defined in

[src/parachain/pools.ts:36](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/pools.ts#L36)
