[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / InterBTCAPI

# Interface: InterBTCAPI

## Implemented by

- [`DefaultInterBTCAPI`](/classes/DefaultInterBTCAPI.md)

## Table of contents

### Properties

- [account](/interfaces/InterBTCAPI.md#account)
- [api](/interfaces/InterBTCAPI.md#api)
- [btcRelay](/interfaces/InterBTCAPI.md#btcrelay)
- [electrsAPI](/interfaces/InterBTCAPI.md#electrsapi)
- [faucet](/interfaces/InterBTCAPI.md#faucet)
- [fee](/interfaces/InterBTCAPI.md#fee)
- [issue](/interfaces/InterBTCAPI.md#issue)
- [nomination](/interfaces/InterBTCAPI.md#nomination)
- [oracle](/interfaces/InterBTCAPI.md#oracle)
- [pools](/interfaces/InterBTCAPI.md#pools)
- [redeem](/interfaces/InterBTCAPI.md#redeem)
- [refund](/interfaces/InterBTCAPI.md#refund)
- [replace](/interfaces/InterBTCAPI.md#replace)
- [system](/interfaces/InterBTCAPI.md#system)
- [tokens](/interfaces/InterBTCAPI.md#tokens)
- [vaults](/interfaces/InterBTCAPI.md#vaults)

### Methods

- [setAccount](/interfaces/InterBTCAPI.md#setaccount)

## Properties

### account

• `Readonly` **account**: `undefined` \| `AddressOrPair`

#### Defined in

[src/interbtc-api.ts:53](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L53)

___

### api

• `Readonly` **api**: `ApiPromise`

#### Defined in

[src/interbtc-api.ts:37](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L37)

___

### btcRelay

• `Readonly` **btcRelay**: [`BTCRelayAPI`](/interfaces/BTCRelayAPI.md)

#### Defined in

[src/interbtc-api.ts:45](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L45)

___

### electrsAPI

• `Readonly` **electrsAPI**: [`ElectrsAPI`](/interfaces/ElectrsAPI.md)

#### Defined in

[src/interbtc-api.ts:44](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L44)

___

### faucet

• `Readonly` **faucet**: [`FaucetClient`](/classes/FaucetClient.md)

#### Defined in

[src/interbtc-api.ts:42](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L42)

___

### fee

• `Readonly` **fee**: [`FeeAPI`](/interfaces/FeeAPI.md)

#### Defined in

[src/interbtc-api.ts:49](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L49)

___

### issue

• `Readonly` **issue**: [`IssueAPI`](/interfaces/IssueAPI.md)

#### Defined in

[src/interbtc-api.ts:39](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L39)

___

### nomination

• `Readonly` **nomination**: [`NominationAPI`](/interfaces/NominationAPI.md)

#### Defined in

[src/interbtc-api.ts:50](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L50)

___

### oracle

• `Readonly` **oracle**: [`OracleAPI`](/interfaces/OracleAPI.md)

#### Defined in

[src/interbtc-api.ts:43](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L43)

___

### pools

• `Readonly` **pools**: [`PoolsAPI`](/interfaces/PoolsAPI.md)

#### Defined in

[src/interbtc-api.ts:51](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L51)

___

### redeem

• `Readonly` **redeem**: [`RedeemAPI`](/interfaces/RedeemAPI.md)

#### Defined in

[src/interbtc-api.ts:40](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L40)

___

### refund

• `Readonly` **refund**: [`RefundAPI`](/interfaces/RefundAPI.md)

#### Defined in

[src/interbtc-api.ts:41](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L41)

___

### replace

• `Readonly` **replace**: [`ReplaceAPI`](/interfaces/ReplaceAPI.md)

#### Defined in

[src/interbtc-api.ts:48](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L48)

___

### system

• `Readonly` **system**: [`SystemAPI`](/interfaces/SystemAPI.md)

#### Defined in

[src/interbtc-api.ts:47](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L47)

___

### tokens

• `Readonly` **tokens**: [`TokensAPI`](/interfaces/TokensAPI.md)

#### Defined in

[src/interbtc-api.ts:46](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L46)

___

### vaults

• `Readonly` **vaults**: [`VaultsAPI`](/interfaces/VaultsAPI.md)

#### Defined in

[src/interbtc-api.ts:38](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L38)

## Methods

### setAccount

▸ **setAccount**(`account`, `signer?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `AddressOrPair` |
| `signer?` | `Signer` |

#### Returns

`void`

#### Defined in

[src/interbtc-api.ts:52](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L52)
