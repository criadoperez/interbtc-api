[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / DefaultElectrsAPI

# Class: DefaultElectrsAPI

## Implements

- [`ElectrsAPI`](/interfaces/ElectrsAPI.md)

## Table of contents

### Constructors

- [constructor](/classes/DefaultElectrsAPI.md#constructor)

### Properties

- [addressApi](/classes/DefaultElectrsAPI.md#addressapi)
- [blockApi](/classes/DefaultElectrsAPI.md#blockapi)
- [scripthashApi](/classes/DefaultElectrsAPI.md#scripthashapi)
- [txApi](/classes/DefaultElectrsAPI.md#txapi)

### Methods

- [broadcastRawTransaction](/classes/DefaultElectrsAPI.md#broadcastrawtransaction)
- [getData](/classes/DefaultElectrsAPI.md#getdata)
- [getLatestBlock](/classes/DefaultElectrsAPI.md#getlatestblock)
- [getLatestBlockHeight](/classes/DefaultElectrsAPI.md#getlatestblockheight)
- [getMerkleProof](/classes/DefaultElectrsAPI.md#getmerkleproof)
- [getParsedExecutionParameters](/classes/DefaultElectrsAPI.md#getparsedexecutionparameters)
- [getRawTransaction](/classes/DefaultElectrsAPI.md#getrawtransaction)
- [getTransactionBlockHeight](/classes/DefaultElectrsAPI.md#gettransactionblockheight)
- [getTransactionStatus](/classes/DefaultElectrsAPI.md#gettransactionstatus)
- [getTx](/classes/DefaultElectrsAPI.md#gettx)
- [getTxIdByOpReturn](/classes/DefaultElectrsAPI.md#gettxidbyopreturn)
- [getTxStatus](/classes/DefaultElectrsAPI.md#gettxstatus)
- [getUtxoAmount](/classes/DefaultElectrsAPI.md#getutxoamount)
- [getUtxoTxIdByRecipientAddress](/classes/DefaultElectrsAPI.md#getutxotxidbyrecipientaddress)
- [txOutputHasRecipientAndAmount](/classes/DefaultElectrsAPI.md#txoutputhasrecipientandamount)
- [utxoHasAtLeastAmount](/classes/DefaultElectrsAPI.md#utxohasatleastamount)
- [waitForOpreturn](/classes/DefaultElectrsAPI.md#waitforopreturn)
- [waitForTxInclusion](/classes/DefaultElectrsAPI.md#waitfortxinclusion)

## Constructors

### constructor

• **new DefaultElectrsAPI**(`network?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `network` | `string` | `"mainnet"` |

#### Defined in

[src/external/electrs.ts:172](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L172)

## Properties

### addressApi

• `Private` **addressApi**: `AddressApi`

#### Defined in

[src/external/electrs.ts:170](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L170)

___

### blockApi

• `Private` **blockApi**: `BlockApi`

#### Defined in

[src/external/electrs.ts:167](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L167)

___

### scripthashApi

• `Private` **scripthashApi**: `ScripthashApi`

#### Defined in

[src/external/electrs.ts:169](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L169)

___

### txApi

• `Private` **txApi**: `TxApi`

#### Defined in

[src/external/electrs.ts:168](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L168)

## Methods

### broadcastRawTransaction

▸ **broadcastRawTransaction**(`hex`): `Promise`<`AxiosResponse`<`string`\>\>

Broadcasts a transaction to the Bitcoin network configured in the constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | A hex-encoded raw transaction to be broadcast to the Bitcoin blockchain |

#### Returns

`Promise`<`AxiosResponse`<`string`\>\>

The txid of the transaction

#### Defined in

[src/external/electrs.ts:352](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L352)

___

### getData

▸ **getData**<`T`\>(`response`): `Promise`<`T`\>

Parse an AxiosResponse Promise

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | `Promise`<`AxiosResponse`<`T`\>\> | A generic AxiosResponse Promise |

#### Returns

`Promise`<`T`\>

The data in the response

#### Defined in

[src/external/electrs.ts:417](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L417)

___

### getLatestBlock

▸ **getLatestBlock**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

The block hash of the latest Bitcoin block

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getLatestBlock](/interfaces/ElectrsAPI.md#getlatestblock)

#### Defined in

[src/external/electrs.ts:194](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L194)

___

### getLatestBlockHeight

▸ **getLatestBlockHeight**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

The height of the latest Bitcoin block

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getLatestBlockHeight](/interfaces/ElectrsAPI.md#getlatestblockheight)

#### Defined in

[src/external/electrs.ts:198](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L198)

___

### getMerkleProof

▸ **getMerkleProof**(`txid`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |

#### Returns

`Promise`<`string`\>

The merkle inclusion proof for the transaction using bitcoind's merkleblock format.

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getMerkleProof](/interfaces/ElectrsAPI.md#getmerkleproof)

#### Defined in

[src/external/electrs.ts:202](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L202)

___

### getParsedExecutionParameters

▸ **getParsedExecutionParameters**(`txid`): `Promise`<[`Bytes`, `Bytes`]\>

Get the parsed (as Bytes) merkle proof and raw transaction

**`remarks`**
Performs the lookup using an external service, Esplora

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |

#### Returns

`Promise`<[`Bytes`, `Bytes`]\>

A tuple of Bytes object, representing [merkleProof, rawTx]

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getParsedExecutionParameters](/interfaces/ElectrsAPI.md#getparsedexecutionparameters)

#### Defined in

[src/external/electrs.ts:384](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L384)

___

### getRawTransaction

▸ **getRawTransaction**(`txid`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |

#### Returns

`Promise`<`string`\>

The raw transaction data, represented as a hex string

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getRawTransaction](/interfaces/ElectrsAPI.md#getrawtransaction)

#### Defined in

[src/external/electrs.ts:399](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L399)

___

### getTransactionBlockHeight

▸ **getTransactionBlockHeight**(`txid`): `Promise`<`undefined` \| `number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |

#### Returns

`Promise`<`undefined` \| `number`\>

The height of the block the transaction was included in. If the block has not been confirmed, returns undefined.

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getTransactionBlockHeight](/interfaces/ElectrsAPI.md#gettransactionblockheight)

#### Defined in

[src/external/electrs.ts:380](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L380)

___

### getTransactionStatus

▸ **getTransactionStatus**(`txid`): `Promise`<`TxStatus`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |

#### Returns

`Promise`<`TxStatus`\>

A TxStatus object, containing the confirmation status and number of confirmations, plus block height if
the tx is included in the blockchain

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getTransactionStatus](/interfaces/ElectrsAPI.md#gettransactionstatus)

#### Defined in

[src/external/electrs.ts:356](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L356)

___

### getTx

▸ **getTx**(`txid`): `Promise`<`Transaction`\>

Fetch the Bitcoin transaction that matches the given TxId

**`remarks`**
Performs the lookup using an external service, Esplora

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |

#### Returns

`Promise`<`Transaction`\>

A Bitcoin Transaction object

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getTx](/interfaces/ElectrsAPI.md#gettx)

#### Defined in

[src/external/electrs.ts:206](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L206)

___

### getTxIdByOpReturn

▸ **getTxIdByOpReturn**(`opReturn`, `recipientAddress?`, `amount?`): `Promise`<`string`\>

Fetch the first bitcoin transaction ID based on the OP_RETURN field, recipient and amount.
Throw an error unless there is exactly one transaction with the given opcode.

**`remarks`**
Performs the lookup using an external service, Esplora. Requires the input string to be a hex

#### Parameters

| Name | Type |
| :------ | :------ |
| `opReturn` | `string` |
| `recipientAddress?` | `string` |
| `amount?` | `BTCAmount` |

#### Returns

`Promise`<`string`\>

A Bitcoin transaction ID

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getTxIdByOpReturn](/interfaces/ElectrsAPI.md#gettxidbyopreturn)

#### Defined in

[src/external/electrs.ts:260](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L260)

___

### getTxStatus

▸ `Private` **getTxStatus**(`txid`): `Promise`<`Status`\>

Use the TxAPI to get the confirmationation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txid` | `string` | The ID of a Bitcoin transaction |

#### Returns

`Promise`<`Status`\>

A Status object, containing transaction settlement information

#### Defined in

[src/external/electrs.ts:408](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L408)

___

### getUtxoAmount

▸ **getUtxoAmount**(`txid`, `recipient`): `Promise`<`number`\>

Fetch the Bitcoin UTXO amount that matches the given TxId and recipient

**`remarks`**
Performs the lookup using an external service, Esplora

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |
| `recipient` | `string` |

#### Returns

`Promise`<`number`\>

A UTXO amount if found, 0 otherwise

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getUtxoAmount](/interfaces/ElectrsAPI.md#getutxoamount)

#### Defined in

[src/external/electrs.ts:210](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L210)

___

### getUtxoTxIdByRecipientAddress

▸ **getUtxoTxIdByRecipientAddress**(`recipientAddress`, `amount?`): `Promise`<`string`\>

Fetch the last bitcoin transaction ID based on the recipient address and amount.
Throw an error if no such transaction is found.

**`remarks`**
Performs the lookup using an external service, Esplora

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipientAddress` | `string` |
| `amount?` | `BTCAmount` |

#### Returns

`Promise`<`string`\>

A Bitcoin transaction ID

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[getUtxoTxIdByRecipientAddress](/interfaces/ElectrsAPI.md#getutxotxidbyrecipientaddress)

#### Defined in

[src/external/electrs.ts:227](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L227)

___

### txOutputHasRecipientAndAmount

▸ `Private` **txOutputHasRecipientAndAmount**(`vout`, `recipientAddress?`, `amount?`): `boolean`

Check if a given UTXO sends at least `amountAsBTC` to a certain `recipientAddress`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vout` | `VOut` | UTXO object |
| `recipientAddress?` | `string` | (Optional) Address of recipient |
| `amount?` | `BTCAmount` | - |

#### Returns

`boolean`

Boolean value

#### Defined in

[src/external/electrs.ts:337](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L337)

___

### utxoHasAtLeastAmount

▸ `Private` **utxoHasAtLeastAmount**(`utxo`, `amount?`): `boolean`

Check if a given UTXO has at least `amountAsBTC`

#### Parameters

| Name | Type |
| :------ | :------ |
| `utxo` | `UTXO` \| `VOut` |
| `amount?` | `BTCAmount` |

#### Returns

`boolean`

Boolean value

#### Defined in

[src/external/electrs.ts:248](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L248)

___

### waitForOpreturn

▸ **waitForOpreturn**(`data`, `timeoutMs`, `retryIntervalMs`): `Promise`<`string`\>

Return a promise that either resolves to the first txid with the given opreturn `data`,
or rejects if the `timeout` has elapsed.

**`remarks`**
Every 5 seconds, performs the lookup using an external service, Esplora

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `timeoutMs` | `number` |
| `retryIntervalMs` | `number` |

#### Returns

`Promise`<`string`\>

The Bitcoin txid

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[waitForOpreturn](/interfaces/ElectrsAPI.md#waitforopreturn)

#### Defined in

[src/external/electrs.ts:288](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L288)

___

### waitForTxInclusion

▸ **waitForTxInclusion**(`txid`, `timeoutMs`, `retryIntervalMs`): `Promise`<`TxStatus`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` |
| `timeoutMs` | `number` |
| `retryIntervalMs` | `number` |

#### Returns

`Promise`<`TxStatus`\>

A TxStatus object, containing the confirmation status and number of confirmations, plus block height if
the tx is included in the blockchain

#### Implementation of

[ElectrsAPI](/interfaces/ElectrsAPI.md).[waitForTxInclusion](/interfaces/ElectrsAPI.md#waitfortxinclusion)

#### Defined in

[src/external/electrs.ts:307](https://github.com/interlay/interbtc-api/blob/5eab153/src/external/electrs.ts#L307)
