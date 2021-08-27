[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / SystemAPI

# Interface: SystemAPI

## Implemented by

- [`DefaultSystemAPI`](/classes/DefaultSystemAPI.md)

## Table of contents

### Methods

- [getCurrentActiveBlockNumber](/interfaces/SystemAPI.md#getcurrentactiveblocknumber)
- [getCurrentBlockNumber](/interfaces/SystemAPI.md#getcurrentblocknumber)
- [getStatusCode](/interfaces/SystemAPI.md#getstatuscode)
- [subscribeToFinalizedBlockHeads](/interfaces/SystemAPI.md#subscribetofinalizedblockheads)

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

#### Defined in

[src/parachain/system.ts:17](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L17)

___

### getCurrentBlockNumber

▸ **getCurrentBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

The current block number being processed.

#### Defined in

[src/parachain/system.ts:12](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L12)

___

### getStatusCode

▸ **getStatusCode**(): `Promise`<`StatusCode`\>

#### Returns

`Promise`<`StatusCode`\>

The parachain status code object.

#### Defined in

[src/parachain/system.ts:28](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L28)

___

### subscribeToFinalizedBlockHeads

▸ **subscribeToFinalizedBlockHeads**(`callback`): `Promise`<`fn`\>

On every new parachain block, call the callback function with the new block header

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`blockHeader`: `Header`) => `void` | Function to be called with every new block header |

#### Returns

`Promise`<`fn`\>

#### Defined in

[src/parachain/system.ts:23](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/system.ts#L23)
