[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / DefaultSystemAPI

# Class: DefaultSystemAPI

## Implements

- [`SystemAPI`](/interfaces/SystemAPI.md)

## Table of contents

### Constructors

- [constructor](/classes/DefaultSystemAPI.md#constructor)

### Methods

- [getCurrentActiveBlockNumber](/classes/DefaultSystemAPI.md#getcurrentactiveblocknumber)
- [getCurrentBlockNumber](/classes/DefaultSystemAPI.md#getcurrentblocknumber)
- [getStatusCode](/classes/DefaultSystemAPI.md#getstatuscode)
- [subscribeToFinalizedBlockHeads](/classes/DefaultSystemAPI.md#subscribetofinalizedblockheads)

## Constructors

### constructor

• **new DefaultSystemAPI**(`api`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |

#### Defined in

[src/parachain/system.ts:32](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L32)

## Methods

### getCurrentActiveBlockNumber

▸ **getCurrentActiveBlockNumber**(`atBlock?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `atBlock?` | `BlockHash` |

#### Returns

`Promise`<`number`\>

The current active block number being processed.

#### Implementation of

[SystemAPI](/interfaces/SystemAPI.md).[getCurrentActiveBlockNumber](/interfaces/SystemAPI.md#getcurrentactiveblocknumber)

#### Defined in

[src/parachain/system.ts:39](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L39)

___

### getCurrentBlockNumber

▸ **getCurrentBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

The current block number being processed.

#### Implementation of

[SystemAPI](/interfaces/SystemAPI.md).[getCurrentBlockNumber](/interfaces/SystemAPI.md#getcurrentblocknumber)

#### Defined in

[src/parachain/system.ts:34](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L34)

___

### getStatusCode

▸ **getStatusCode**(): `Promise`<`StatusCode`\>

#### Returns

`Promise`<`StatusCode`\>

The parachain status code object.

#### Implementation of

[SystemAPI](/interfaces/SystemAPI.md).[getStatusCode](/interfaces/SystemAPI.md#getstatuscode)

#### Defined in

[src/parachain/system.ts:51](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L51)

___

### subscribeToFinalizedBlockHeads

▸ **subscribeToFinalizedBlockHeads**(`callback`): `Promise`<`fn`\>

On every new parachain block, call the callback function with the new block header

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`blockHeader`: `Header`) => `void` |

#### Returns

`Promise`<`fn`\>

#### Implementation of

[SystemAPI](/interfaces/SystemAPI.md).[subscribeToFinalizedBlockHeads](/interfaces/SystemAPI.md#subscribetofinalizedblockheads)

#### Defined in

[src/parachain/system.ts:44](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L44)
