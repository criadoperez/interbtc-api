[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / OracleAPI

# Interface: OracleAPI

## Hierarchy

- [`TransactionAPI`](/interfaces/TransactionAPI.md)

  ↳ **`OracleAPI`**

## Implemented by

- [`DefaultOracleAPI`](/classes/DefaultOracleAPI.md)

## Table of contents

### Methods

- [convertCollateralToWrapped](/interfaces/OracleAPI.md#convertcollateraltowrapped)
- [convertWrappedToCollateral](/interfaces/OracleAPI.md#convertwrappedtocollateral)
- [getAccount](/interfaces/OracleAPI.md#getaccount)
- [getBitcoinFees](/interfaces/OracleAPI.md#getbitcoinfees)
- [getExchangeRate](/interfaces/OracleAPI.md#getexchangerate)
- [getOnlineTimeout](/interfaces/OracleAPI.md#getonlinetimeout)
- [getSourcesById](/interfaces/OracleAPI.md#getsourcesbyid)
- [getValidUntil](/interfaces/OracleAPI.md#getvaliduntil)
- [isOnline](/interfaces/OracleAPI.md#isonline)
- [sendLogged](/interfaces/OracleAPI.md#sendlogged)
- [setAccount](/interfaces/OracleAPI.md#setaccount)
- [setBitcoinFees](/interfaces/OracleAPI.md#setbitcoinfees)
- [setExchangeRate](/interfaces/OracleAPI.md#setexchangerate)

## Methods

### convertCollateralToWrapped

▸ **convertCollateralToWrapped**<`C`\>(`amount`, `collateralCurrency`): `Promise`<`BTCAmount`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `MonetaryAmount`<`Currency`<`C`\>, `C`\> | The amount of collateral tokens to convert |
| `collateralCurrency` | `Currency`<`C`\> | A `Monetary.js` object |

#### Returns

`Promise`<`BTCAmount`\>

Converted value

#### Defined in

[src/parachain/oracle.ts:79](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L79)

___

### convertWrappedToCollateral

▸ **convertWrappedToCollateral**<`C`\>(`amount`, `collateralCurrency`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BTCAmount` | The amount of wrapped tokens to convert |
| `collateralCurrency` | `Currency`<`C`\> | A `Monetary.js` object |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

Converted value

#### Defined in

[src/parachain/oracle.ts:70](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L70)

___

### getAccount

▸ **getAccount**(): `undefined` \| `AddressOrPair`

#### Returns

`undefined` \| `AddressOrPair`

#### Inherited from

[TransactionAPI](/interfaces/TransactionAPI.md).[getAccount](/interfaces/TransactionAPI.md#getaccount)

#### Defined in

[src/parachain/transaction.ts:12](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L12)

___

### getBitcoinFees

▸ **getBitcoinFees**(): `Promise`<`Big`\>

Obtains the current fees for BTC transactions, in satoshi/byte.

#### Returns

`Promise`<`Big`\>

Big value for the current inclusion fees.

#### Defined in

[src/parachain/oracle.ts:40](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L40)

___

### getExchangeRate

▸ **getExchangeRate**<`C`\>(`currency`): `Promise`<`ExchangeRate`<`Currency`<`Object`\>, `Object`, `Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currency` | `Currency`<`C`\> | The collateral currency as a `Monetary.js` object |

#### Returns

`Promise`<`ExchangeRate`<`Currency`<`Object`\>, `Object`, `Currency`<`C`\>, `C`\>\>

The DOT/BTC exchange rate

#### Defined in

[src/parachain/oracle.ts:33](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L33)

___

### getOnlineTimeout

▸ **getOnlineTimeout**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

The period of time (in milliseconds) after an oracle's last submission
during which it is considered online

#### Defined in

[src/parachain/oracle.ts:87](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L87)

___

### getSourcesById

▸ **getSourcesById**(): `Promise`<`Map`<`string`, `string`\>\>

#### Returns

`Promise`<`Map`<`string`, `string`\>\>

A map from the oracle's account id to its name

#### Defined in

[src/parachain/oracle.ts:48](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L48)

___

### getValidUntil

▸ **getValidUntil**<`C`\>(`counterCurrency`): `Promise`<`Date`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `counterCurrency` | `Currency`<`C`\> |

#### Returns

`Promise`<`Date`\>

Last exchange rate time

#### Defined in

[src/parachain/oracle.ts:44](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L44)

___

### isOnline

▸ **isOnline**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

Boolean value indicating whether the oracle is online

#### Defined in

[src/parachain/oracle.ts:52](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L52)

___

### sendLogged

▸ **sendLogged**<`T`\>(`transaction`, `successEventType?`): `Promise`<`ISubmittableResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Codec`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `SubmittableExtrinsic`<``"promise"``, `ISubmittableResult`\> |
| `successEventType?` | `AugmentedEvent`<`ApiTypes`, `T`\> |

#### Returns

`Promise`<`ISubmittableResult`\>

#### Inherited from

[TransactionAPI](/interfaces/TransactionAPI.md).[sendLogged](/interfaces/TransactionAPI.md#sendlogged)

#### Defined in

[src/parachain/transaction.ts:13](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L13)

___

### setAccount

▸ **setAccount**(`account`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `AddressOrPair` |

#### Returns

`void`

#### Inherited from

[TransactionAPI](/interfaces/TransactionAPI.md).[setAccount](/interfaces/TransactionAPI.md#setaccount)

#### Defined in

[src/parachain/transaction.ts:11](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L11)

___

### setBitcoinFees

▸ **setBitcoinFees**(`fees`): `Promise`<`void`\>

Send a transaction to set the current fee estimate for BTC transactions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fees` | `Big` | Estimated Satoshis per bytes to get a transaction included |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/parachain/oracle.ts:64](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L64)

___

### setExchangeRate

▸ **setExchangeRate**<`C`\>(`exchangeRate`): `Promise`<`void`\>

Send a transaction to set the DOT/BTC exchange rate

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exchangeRate` | `ExchangeRate`<`Currency`<`Object`\>, `Object`, `Currency`<`C`\>, `C`\> | The rate to set |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/parachain/oracle.ts:57](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/oracle.ts#L57)
