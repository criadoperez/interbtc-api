[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / DefaultBTCRelayAPI

# Class: DefaultBTCRelayAPI

## Implements

- [`BTCRelayAPI`](/interfaces/BTCRelayAPI.md)

## Table of contents

### Constructors

- [constructor](/classes/DefaultBTCRelayAPI.md#constructor)

### Methods

- [getLatestBlock](/classes/DefaultBTCRelayAPI.md#getlatestblock)
- [getLatestBlockHeight](/classes/DefaultBTCRelayAPI.md#getlatestblockheight)
- [getStableBitcoinConfirmations](/classes/DefaultBTCRelayAPI.md#getstablebitcoinconfirmations)
- [getStableParachainConfirmations](/classes/DefaultBTCRelayAPI.md#getstableparachainconfirmations)
- [isBlockInRelay](/classes/DefaultBTCRelayAPI.md#isblockinrelay)
- [verifyTransactionInclusion](/classes/DefaultBTCRelayAPI.md#verifytransactioninclusion)

## Constructors

### constructor

• **new DefaultBTCRelayAPI**(`api`, `electrsAPI`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `electrsAPI` | [`ElectrsAPI`](/interfaces/ElectrsAPI.md) |

#### Defined in

[src/parachain/btc-relay.ts:44](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/btc-relay.ts#L44)

## Methods

### getLatestBlock

▸ **getLatestBlock**(): `Promise`<`H256Le`\>

#### Returns

`Promise`<`H256Le`\>

The raw transaction data, represented as a Buffer object

#### Implementation of

[BTCRelayAPI](/interfaces/BTCRelayAPI.md).[getLatestBlock](/interfaces/BTCRelayAPI.md#getlatestblock)

#### Defined in

[src/parachain/btc-relay.ts:56](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/btc-relay.ts#L56)

___

### getLatestBlockHeight

▸ **getLatestBlockHeight**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

The height of the latest Bitcoin block that was rekayed by the BTC-Relay

#### Implementation of

[BTCRelayAPI](/interfaces/BTCRelayAPI.md).[getLatestBlockHeight](/interfaces/BTCRelayAPI.md#getlatestblockheight)

#### Defined in

[src/parachain/btc-relay.ts:61](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/btc-relay.ts#L61)

___

### getStableBitcoinConfirmations

▸ **getStableBitcoinConfirmations**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

A global security parameter: the required block confirmations
for a transaction to be considered stable on Bitcoin

#### Implementation of

[BTCRelayAPI](/interfaces/BTCRelayAPI.md).[getStableBitcoinConfirmations](/interfaces/BTCRelayAPI.md#getstablebitcoinconfirmations)

#### Defined in

[src/parachain/btc-relay.ts:46](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/btc-relay.ts#L46)

___

### getStableParachainConfirmations

▸ **getStableParachainConfirmations**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

A global security parameter: the required block confirmations
for a transaction to be considered stable on the parachain

#### Implementation of

[BTCRelayAPI](/interfaces/BTCRelayAPI.md).[getStableParachainConfirmations](/interfaces/BTCRelayAPI.md#getstableparachainconfirmations)

#### Defined in

[src/parachain/btc-relay.ts:51](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/btc-relay.ts#L51)

___

### isBlockInRelay

▸ **isBlockInRelay**(`blockHash`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHash` | `string` |

#### Returns

`Promise`<`boolean`\>

True if the block is in the relay, false otherwise.

#### Implementation of

[BTCRelayAPI](/interfaces/BTCRelayAPI.md).[isBlockInRelay](/interfaces/BTCRelayAPI.md#isblockinrelay)

#### Defined in

[src/parachain/btc-relay.ts:76](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/btc-relay.ts#L76)

___

### verifyTransactionInclusion

▸ **verifyTransactionInclusion**(`txid`, `confirmations?`): `Promise`<`void`\>

Verifies the inclusion of a transaction with `txid` in the Bitcoin blockchain

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |
| `confirmations` | `number` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[BTCRelayAPI](/interfaces/BTCRelayAPI.md).[verifyTransactionInclusion](/interfaces/BTCRelayAPI.md#verifytransactioninclusion)

#### Defined in

[src/parachain/btc-relay.ts:66](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/btc-relay.ts#L66)
