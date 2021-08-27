[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / BitcoinCoreClient

# Class: BitcoinCoreClient

## Table of contents

### Constructors

- [constructor](/classes/BitcoinCoreClient.md#constructor)

### Properties

- [client](/classes/BitcoinCoreClient.md#client)

### Methods

- [broadcastTx](/classes/BitcoinCoreClient.md#broadcasttx)
- [createWallet](/classes/BitcoinCoreClient.md#createwallet)
- [formatRawTxInput](/classes/BitcoinCoreClient.md#formatrawtxinput)
- [getBalance](/classes/BitcoinCoreClient.md#getbalance)
- [getBestBlockHash](/classes/BitcoinCoreClient.md#getbestblockhash)
- [getMempoolInfo](/classes/BitcoinCoreClient.md#getmempoolinfo)
- [loadWallet](/classes/BitcoinCoreClient.md#loadwallet)
- [mineBlocks](/classes/BitcoinCoreClient.md#mineblocks)
- [sendBtcTxAndMine](/classes/BitcoinCoreClient.md#sendbtctxandmine)
- [sendToAddress](/classes/BitcoinCoreClient.md#sendtoaddress)

## Constructors

### constructor

• **new BitcoinCoreClient**(`network`, `host`, `username`, `password`, `port`, `wallet`)

Initialize the Bitcoin-core client, which is a js equivalent to bitcoin-cli

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `network` | `string` | Bitcoin network (mainnet, testnet, regtest) |
| `host` | `string` | URL of Bitcoin node (e.g. localhost) |
| `username` | `string` | User for RPC authentication |
| `password` | `string` | Password for RPC authentication |
| `port` | `string` | Bitcoin node connection port (e.g. 18443) |
| `wallet` | `string` | Wallet to use if several are available. See https://github.com/ruimarinho/bitcoin-core#multiwallet |

#### Defined in

[src/utils/bitcoin-core-client.ts:23](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L23)

## Properties

### client

• **client**: `any`

#### Defined in

[src/utils/bitcoin-core-client.ts:12](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L12)

## Methods

### broadcastTx

▸ **broadcastTx**(`recipient`, `amount`, `data?`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | `string` |
| `amount` | `BTCAmount` |
| `data?` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:58](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L58)

___

### createWallet

▸ **createWallet**(`name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:108](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L108)

___

### formatRawTxInput

▸ **formatRawTxInput**(`recipient`, `amount`, `data?`): `RecipientsToUTXOAmounts`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | `string` |
| `amount` | `Big` |
| `data?` | `string` |

#### Returns

`RecipientsToUTXOAmounts`[]

#### Defined in

[src/utils/bitcoin-core-client.ts:49](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L49)

___

### getBalance

▸ **getBalance**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:91](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L91)

___

### getBestBlockHash

▸ **getBestBlockHash**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:104](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L104)

___

### getMempoolInfo

▸ **getMempoolInfo**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:100](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L100)

___

### loadWallet

▸ **loadWallet**(`name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:112](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L112)

___

### mineBlocks

▸ **mineBlocks**(`n`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:85](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L85)

___

### sendBtcTxAndMine

▸ **sendBtcTxAndMine**(`recipient`, `amount`, `blocksToMine`, `data?`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | `string` |
| `amount` | `BTCAmount` |
| `blocksToMine` | `number` |
| `data?` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:34](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L34)

___

### sendToAddress

▸ **sendToAddress**(`address`, `amount`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `amount` | `BTCAmount` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/bitcoin-core-client.ts:95](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin-core-client.ts#L95)
