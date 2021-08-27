[@interlay/interbtc-api](/README.md) / Exports

# @interlay/interbtc-api

## Table of contents

### Namespaces

- [bitcoin](/modules/bitcoin.md)

### Enumerations

- [CurrencyIdLiteral](/enums/CurrencyIdLiteral.md)
- [ExecuteRedeem](/enums/ExecuteRedeem.md)
- [IssueStatus](/enums/IssueStatus.md)
- [NominationStatus](/enums/NominationStatus.md)
- [RedeemStatus](/enums/RedeemStatus.md)
- [VaultStatusExt](/enums/VaultStatusExt.md)

### InterBTC Bridge Classes

- [DefaultInterBTCAPI](/classes/DefaultInterBTCAPI.md)

### Clients Classes

- [FaucetClient](/classes/FaucetClient.md)

### Other Classes

- [BitcoinCoreClient](/classes/BitcoinCoreClient.md)
- [DefaultBTCRelayAPI](/classes/DefaultBTCRelayAPI.md)
- [DefaultConstantsAPI](/classes/DefaultConstantsAPI.md)
- [DefaultElectrsAPI](/classes/DefaultElectrsAPI.md)
- [DefaultFeeAPI](/classes/DefaultFeeAPI.md)
- [DefaultIssueAPI](/classes/DefaultIssueAPI.md)
- [DefaultNominationAPI](/classes/DefaultNominationAPI.md)
- [DefaultOracleAPI](/classes/DefaultOracleAPI.md)
- [DefaultPoolsAPI](/classes/DefaultPoolsAPI.md)
- [DefaultRedeemAPI](/classes/DefaultRedeemAPI.md)
- [DefaultRefundAPI](/classes/DefaultRefundAPI.md)
- [DefaultReplaceAPI](/classes/DefaultReplaceAPI.md)
- [DefaultSystemAPI](/classes/DefaultSystemAPI.md)
- [DefaultTokensAPI](/classes/DefaultTokensAPI.md)
- [DefaultTransactionAPI](/classes/DefaultTransactionAPI.md)
- [DefaultVaultsAPI](/classes/DefaultVaultsAPI.md)

### InterBTC Bridge Interfaces

- [BTCRelayAPI](/interfaces/BTCRelayAPI.md)
- [FeeAPI](/interfaces/FeeAPI.md)
- [IssueAPI](/interfaces/IssueAPI.md)
- [NominationAPI](/interfaces/NominationAPI.md)
- [OracleAPI](/interfaces/OracleAPI.md)
- [RedeemAPI](/interfaces/RedeemAPI.md)
- [RefundAPI](/interfaces/RefundAPI.md)
- [ReplaceAPI](/interfaces/ReplaceAPI.md)
- [SystemAPI](/interfaces/SystemAPI.md)
- [TokensAPI](/interfaces/TokensAPI.md)
- [VaultsAPI](/interfaces/VaultsAPI.md)

### Bitcoin Core Interfaces

- [ElectrsAPI](/interfaces/ElectrsAPI.md)

### InterBTC Bridge
The type Big represents Wrapped or Collateral token denominations,
while the type BN represents Planck or Satoshi denominations. Interfaces

- [ConstantsAPI](/interfaces/ConstantsAPI.md)

### Other Interfaces

- [DecodedRequest](/interfaces/DecodedRequest.md)
- [DecodedRequestExt](/interfaces/DecodedRequestExt.md)
- [InterBTCAPI](/interfaces/InterBTCAPI.md)
- [Issue](/interfaces/Issue.md)
- [IssueResult](/interfaces/IssueResult.md)
- [PoolsAPI](/interfaces/PoolsAPI.md)
- [Redeem](/interfaces/Redeem.md)
- [RefundRequestExt](/interfaces/RefundRequestExt.md)
- [ReplaceRequestExt](/interfaces/ReplaceRequestExt.md)
- [SystemVaultExt](/interfaces/SystemVaultExt.md)
- [TransactionAPI](/interfaces/TransactionAPI.md)
- [VaultExt](/interfaces/VaultExt.md)
- [WalletExt](/interfaces/WalletExt.md)

### Type aliases

- [BitcoinNetwork](/modules.md#bitcoinnetwork)
- [CollateralAmount](/modules.md#collateralamount)
- [CollateralCurrency](/modules.md#collateralcurrency)
- [CollateralUnit](/modules.md#collateralunit)
- [CurrencyUnit](/modules.md#currencyunit)
- [MonetaryCurrency](/modules.md#monetarycurrency)

### Variables

- [ACCOUNT\_NOT\_SET\_ERROR\_MESSAGE](/modules.md#account_not_set_error_message)
- [BTC\_IN\_SAT](/modules.md#btc_in_sat)
- [DOT\_IN\_PLANCK](/modules.md#dot_in_planck)
- [FIXEDI128\_SCALING\_FACTOR](/modules.md#fixedi128_scaling_factor)
- [IGNORED\_ERROR\_MESSAGES](/modules.md#ignored_error_messages)
- [MAINNET\_ESPLORA\_BASE\_PATH](/modules.md#mainnet_esplora_base_path)
- [MBTC\_IN\_SAT](/modules.md#mbtc_in_sat)
- [PERCENTAGE\_GRANULARITY](/modules.md#percentage_granularity)
- [REGTEST\_ESPLORA\_BASE\_PATH](/modules.md#regtest_esplora_base_path)
- [SLEEP\_TIME\_MS](/modules.md#sleep_time_ms)
- [TESTNET\_ESPLORA\_BASE\_PATH](/modules.md#testnet_esplora_base_path)

### Functions

- [addHexPrefix](/modules.md#addhexprefix)
- [allocateAmountsToVaults](/modules.md#allocateamountstovaults)
- [bigToBn](/modules.md#bigtobn)
- [bnToBig](/modules.md#bntobig)
- [btcAddressFromParams](/modules.md#btcaddressfromparams)
- [btcToSat](/modules.md#btctosat)
- [computeLazyDistribution](/modules.md#computelazydistribution)
- [convertMoment](/modules.md#convertmoment)
- [createAPIRegistry](/modules.md#createapiregistry)
- [createExchangeRateOracleKey](/modules.md#createexchangerateoraclekey)
- [createInclusionOracleKey](/modules.md#createinclusionoraclekey)
- [createInterbtcAPI](/modules.md#createinterbtcapi)
- [createPolkadotAPI](/modules.md#createpolkadotapi)
- [createProvider](/modules.md#createprovider)
- [currencyIdToMonetaryCurrency](/modules.md#currencyidtomonetarycurrency)
- [currencyToCurrencyId](/modules.md#currencytocurrencyid)
- [decodeBtcAddress](/modules.md#decodebtcaddress)
- [decodeFixedPointType](/modules.md#decodefixedpointtype)
- [dotToPlanck](/modules.md#dottoplanck)
- [encodeBtcAddress](/modules.md#encodebtcaddress)
- [encodeUnsignedFixedPoint](/modules.md#encodeunsignedfixedpoint)
- [ensureHashEncoded](/modules.md#ensurehashencoded)
- [getAPITypes](/modules.md#getapitypes)
- [getBitcoinNetwork](/modules.md#getbitcoinnetwork)
- [getRPCTypes](/modules.md#getrpctypes)
- [getRequestIdsFromEvents](/modules.md#getrequestidsfromevents)
- [getStorageKey](/modules.md#getstoragekey)
- [getTxProof](/modules.md#gettxproof)
- [issueAndRedeem](/modules.md#issueandredeem)
- [issueSingle](/modules.md#issuesingle)
- [monetaryToCurrencyId](/modules.md#monetarytocurrencyid)
- [newAccountId](/modules.md#newaccountid)
- [newCollateralBTCExchangeRate](/modules.md#newcollateralbtcexchangerate)
- [newMonetaryAmount](/modules.md#newmonetaryamount)
- [parseIssueRequest](/modules.md#parseissuerequest)
- [parseRedeemRequest](/modules.md#parseredeemrequest)
- [parseRefundRequest](/modules.md#parserefundrequest)
- [parseReplaceRequest](/modules.md#parsereplacerequest)
- [parseSystemVault](/modules.md#parsesystemvault)
- [parseWallet](/modules.md#parsewallet)
- [planckToDOT](/modules.md#plancktodot)
- [redeem](/modules.md#redeem)
- [reverseEndianness](/modules.md#reverseendianness)
- [reverseEndiannessHex](/modules.md#reverseendiannesshex)
- [roundLastNDigits](/modules.md#roundlastndigits)
- [roundTwoDecimals](/modules.md#roundtwodecimals)
- [roundUpBigToNearestInteger](/modules.md#roundupbigtonearestinteger)
- [roundUpBtcToNearestSatoshi](/modules.md#roundupbtctonearestsatoshi)
- [satToBTC](/modules.md#sattobtc)
- [satToMBTC](/modules.md#sattombtc)
- [setNumericStorage](/modules.md#setnumericstorage)
- [sleep](/modules.md#sleep)
- [storageKeyToNthInner](/modules.md#storagekeytonthinner)
- [stripHexPrefix](/modules.md#striphexprefix)
- [tickerToCurrencyIdLiteral](/modules.md#tickertocurrencyidliteral)
- [uint8ArrayToString](/modules.md#uint8arraytostring)
- [unwrapRawExchangeRate](/modules.md#unwraprawexchangerate)
- [waitForBlockFinalization](/modules.md#waitforblockfinalization)
- [waitForBlockRelaying](/modules.md#waitforblockrelaying)

## Type aliases

### BitcoinNetwork

Ƭ **BitcoinNetwork**: ``"mainnet"`` \| ``"testnet"`` \| ``"regtest"``

#### Defined in

[src/types/bitcoinTypes.ts:1](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/bitcoinTypes.ts#L1)

___

### CollateralAmount

Ƭ **CollateralAmount**: `PolkadotAmount` \| `KusamaAmount`

#### Defined in

[src/types/currency.ts:21](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L21)

___

### CollateralCurrency

Ƭ **CollateralCurrency**: `Polkadot` \| `Kusama`

#### Defined in

[src/types/currency.ts:22](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L22)

___

### CollateralUnit

Ƭ **CollateralUnit**: `PolkadotUnit` \| `KusamaUnit`

#### Defined in

[src/types/currency.ts:24](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L24)

___

### CurrencyUnit

Ƭ **CurrencyUnit**: `BTCUnit` \| `PolkadotUnit` \| `KusamaUnit`

#### Defined in

[src/types/currency.ts:25](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L25)

___

### MonetaryCurrency

Ƭ **MonetaryCurrency**: `Bitcoin` \| `Polkadot` \| `Kusama`

#### Defined in

[src/types/currency.ts:23](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L23)

## Variables

### ACCOUNT\_NOT\_SET\_ERROR\_MESSAGE

• `Const` **ACCOUNT\_NOT\_SET\_ERROR\_MESSAGE**: ``"cannot request without setting account"``

#### Defined in

[src/utils/constants.ts:8](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/constants.ts#L8)

___

### BTC\_IN\_SAT

• `Const` **BTC\_IN\_SAT**: ``100000000``

#### Defined in

[src/utils/currency.ts:13](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L13)

___

### DOT\_IN\_PLANCK

• `Const` **DOT\_IN\_PLANCK**: ``10000000000``

#### Defined in

[src/utils/currency.ts:15](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L15)

___

### FIXEDI128\_SCALING\_FACTOR

• `Const` **FIXEDI128\_SCALING\_FACTOR**: ``18``

#### Defined in

[src/utils/constants.ts:2](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/constants.ts#L2)

___

### IGNORED\_ERROR\_MESSAGES

• `Const` **IGNORED\_ERROR\_MESSAGES**: `string`[]

#### Defined in

[src/utils/constants.ts:6](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/constants.ts#L6)

___

### MAINNET\_ESPLORA\_BASE\_PATH

• `Const` **MAINNET\_ESPLORA\_BASE\_PATH**: ``"https://blockstream.info/api"``

#### Defined in

[src/utils/constants.ts:10](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/constants.ts#L10)

___

### MBTC\_IN\_SAT

• `Const` **MBTC\_IN\_SAT**: ``100000``

#### Defined in

[src/utils/currency.ts:14](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L14)

___

### PERCENTAGE\_GRANULARITY

• `Const` **PERCENTAGE\_GRANULARITY**: ``3``

#### Defined in

[src/utils/constants.ts:1](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/constants.ts#L1)

___

### REGTEST\_ESPLORA\_BASE\_PATH

• `Const` **REGTEST\_ESPLORA\_BASE\_PATH**: ``"http://localhost:3002"``

#### Defined in

[src/utils/constants.ts:12](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/constants.ts#L12)

___

### SLEEP\_TIME\_MS

• `Const` **SLEEP\_TIME\_MS**: ``1000``

#### Defined in

[src/utils/issueRedeem.ts:20](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/issueRedeem.ts#L20)

___

### TESTNET\_ESPLORA\_BASE\_PATH

• `Const` **TESTNET\_ESPLORA\_BASE\_PATH**: ``"https://btc-testnet.interlay.io"``

#### Defined in

[src/utils/constants.ts:11](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/constants.ts#L11)

## Functions

### addHexPrefix

▸ **addHexPrefix**(`str`): `string`

Ensure the `0x` hex prefix is present

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/encoding.ts:61](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L61)

___

### allocateAmountsToVaults

▸ **allocateAmountsToVaults**(`vaultsWithAvailableAmounts`, `amountToAllocate`): `Map`<`AccountId`, `BTCAmount`\>

Given a list of vaults with availabilities (e.g. collateral for issue, tokens
for redeem) and an amount to allocate, selects one or more vaults to fulfil
the request.
If the amount cannot be allocated by a single vault, greedily selects the vault
with highest available amount and tries again for the remainder. If at leaast
one vault can fulfil a request alone, a random one among them is selected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultsWithAvailableAmounts` | `Map`<`AccountId`, `BTCAmount`\> |
| `amountToAllocate` | `BTCAmount` |

#### Returns

`Map`<`AccountId`, `BTCAmount`\>

#### Defined in

[src/utils/issueRedeem.ts:68](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/issueRedeem.ts#L68)

___

### bigToBn

▸ **bigToBn**(`x`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Big` |

#### Returns

`BN`

#### Defined in

[src/utils/currency.ts:44](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L44)

___

### bnToBig

▸ **bnToBig**(`x`): `Big`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `BN` |

#### Returns

`Big`

#### Defined in

[src/utils/currency.ts:40](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L40)

___

### btcAddressFromParams

▸ **btcAddressFromParams**(`registry`, `params`): `BtcAddress`

#### Parameters

| Name | Type |
| :------ | :------ |
| `registry` | `TypeRegistry` |
| `params` | { `p2pkh`: `H160` \| `string`  } \| { `p2sh`: `H160` \| `string`  } \| { `p2wpkhv0`: `H160` \| `string`  } |

#### Returns

`BtcAddress`

#### Defined in

[src/utils/bitcoin.ts:75](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin.ts#L75)

___

### btcToSat

▸ **btcToSat**(`btc`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `btc` | `Big` |

#### Returns

`BN`

#### Defined in

[src/utils/currency.ts:59](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L59)

___

### computeLazyDistribution

▸ **computeLazyDistribution**(`stake`, `perToken`, `tally`): `Big`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stake` | `Big` |
| `perToken` | `Big` |
| `tally` | `Big` |

#### Returns

`Big`

#### Defined in

[src/utils/currency.ts:75](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L75)

___

### convertMoment

▸ **convertMoment**(`moment`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moment` | `Moment` |

#### Returns

`Date`

#### Defined in

[src/utils/encoding.ts:221](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L221)

___

### createAPIRegistry

▸ **createAPIRegistry**(): `TypeRegistry`

#### Returns

`TypeRegistry`

#### Defined in

[src/factory.ts:47](https://github.com/interlay/interbtc-api/blob/5eab153/src/factory.ts#L47)

___

### createExchangeRateOracleKey

▸ **createExchangeRateOracleKey**<`C`\>(`api`, `collateralCurrency`): `OracleKey`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `collateralCurrency` | `Currency`<`C`\> |

#### Returns

`OracleKey`

#### Defined in

[src/utils/currency.ts:116](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L116)

___

### createInclusionOracleKey

▸ **createInclusionOracleKey**(`api`, `type`): `OracleKey`

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `type` | `FeeEstimationType` |

#### Returns

`OracleKey`

#### Defined in

[src/utils/currency.ts:112](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L112)

___

### createInterbtcAPI

▸ **createInterbtcAPI**(`endpoint`, `network?`, `account?`, `autoConnect?`): `Promise`<[`InterBTCAPI`](/interfaces/InterBTCAPI.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `endpoint` | `string` | `undefined` |
| `network` | [`BitcoinNetwork`](/modules.md#bitcoinnetwork) | `"mainnet"` |
| `account?` | `AddressOrPair` | `undefined` |
| `autoConnect?` | `number` \| ``false`` | `undefined` |

#### Returns

`Promise`<[`InterBTCAPI`](/interfaces/InterBTCAPI.md)\>

#### Defined in

[src/factory.ts:29](https://github.com/interlay/interbtc-api/blob/5eab153/src/factory.ts#L29)

___

### createPolkadotAPI

▸ **createPolkadotAPI**(`endpoint`, `autoConnect?`): `Promise`<`ApiPromise`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `string` |
| `autoConnect?` | `number` \| ``false`` |

#### Returns

`Promise`<`ApiPromise`\>

#### Defined in

[src/factory.ts:22](https://github.com/interlay/interbtc-api/blob/5eab153/src/factory.ts#L22)

___

### createProvider

▸ **createProvider**(`endpoint`, `autoConnect?`): `ProviderInterface`

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `string` |
| `autoConnect?` | `number` \| ``false`` |

#### Returns

`ProviderInterface`

#### Defined in

[src/factory.ts:12](https://github.com/interlay/interbtc-api/blob/5eab153/src/factory.ts#L12)

___

### currencyIdToMonetaryCurrency

▸ **currencyIdToMonetaryCurrency**<`C`\>(`currencyId`): `Currency`<`C`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `currencyId` | `CurrencyId` |

#### Returns

`Currency`<`C`\>

#### Defined in

[src/types/currency.ts:64](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L64)

___

### currencyToCurrencyId

▸ **currencyToCurrencyId**<`C`\>(`currency`): [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `Currency`<`C`\> |

#### Returns

[`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md)

#### Defined in

[src/types/currency.ts:33](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L33)

___

### decodeBtcAddress

▸ **decodeBtcAddress**(`address`, `network`): { `p2pkh`: `string`  } \| { `p2sh`: `string`  } \| { `p2wpkhv0`: `string`  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `network` | [`Network`](/interfaces/bitcoin.networks.Network.md) |

#### Returns

{ `p2pkh`: `string`  } \| { `p2sh`: `string`  } \| { `p2wpkhv0`: `string`  }

#### Defined in

[src/utils/bitcoin.ts:59](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin.ts#L59)

___

### decodeFixedPointType

▸ **decodeFixedPointType**(`x`): `Big`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `SignedFixedPoint` \| `UnsignedFixedPoint` |

#### Returns

`Big`

#### Defined in

[src/utils/encoding.ts:98](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L98)

___

### dotToPlanck

▸ **dotToPlanck**(`dot`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dot` | `Big` |

#### Returns

`BN`

#### Defined in

[src/utils/currency.ts:71](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L71)

___

### encodeBtcAddress

▸ **encodeBtcAddress**(`address`, `network`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `BtcAddress` |
| `network` | [`Network`](/interfaces/bitcoin.networks.Network.md) |

#### Returns

`string`

#### Defined in

[src/utils/bitcoin.ts:13](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin.ts#L13)

___

### encodeUnsignedFixedPoint

▸ **encodeUnsignedFixedPoint**(`api`, `x`): `UnsignedFixedPoint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `x` | `Big` |

#### Returns

`UnsignedFixedPoint`

#### Defined in

[src/utils/encoding.ts:104](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L104)

___

### ensureHashEncoded

▸ **ensureHashEncoded**(`api`, `hash`): `H256`

Ensure a hash value is an encoded H256

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `api` | `ApiPromise` | The polkadot API promise used to encode if necessary |
| `hash` | `H256` \| `string` | The either H256 or string encoded hash |

#### Returns

`H256`

#### Defined in

[src/utils/encoding.ts:70](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L70)

___

### getAPITypes

▸ **getAPITypes**(): `RegistryTypes`

#### Returns

`RegistryTypes`

#### Defined in

[src/factory.ts:39](https://github.com/interlay/interbtc-api/blob/5eab153/src/factory.ts#L39)

___

### getBitcoinNetwork

▸ **getBitcoinNetwork**(`network?`): [`Network`](/interfaces/bitcoin.networks.Network.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `network` | [`BitcoinNetwork`](/modules.md#bitcoinnetwork) | `"mainnet"` |

#### Returns

[`Network`](/interfaces/bitcoin.networks.Network.md)

#### Defined in

[src/interbtc-api.ts:25](https://github.com/interlay/interbtc-api/blob/5eab153/src/interbtc-api.ts#L25)

___

### getRPCTypes

▸ **getRPCTypes**(): `Record`<`string`, `Record`<`string`, `DefinitionRpc` \| `DefinitionRpcSub`\>\>

#### Returns

`Record`<`string`, `Record`<`string`, `DefinitionRpc` \| `DefinitionRpcSub`\>\>

#### Defined in

[src/factory.ts:43](https://github.com/interlay/interbtc-api/blob/5eab153/src/factory.ts#L43)

___

### getRequestIdsFromEvents

▸ **getRequestIdsFromEvents**(`events`, `eventToFind`, `api`): `Hash`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | `EventRecord`[] | The EventRecord array returned after sending a transaction |
| `eventToFind` | `AugmentedEvent`<`ApiTypes`, `AnyTuple`\> | - |
| `api` | `ApiPromise` | - |

#### Returns

`Hash`[]

The id associated with the transaction. If the EventRecord array does not
contain required events, the function throws an error.

#### Defined in

[src/utils/issueRedeem.ts:42](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/issueRedeem.ts#L42)

___

### getStorageKey

▸ **getStorageKey**(`moduleName`, `storageItemName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleName` | `string` |
| `storageItemName` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/storage.ts:11](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/storage.ts#L11)

___

### getTxProof

▸ **getTxProof**(`electrsAPI`, `btcTxId?`, `merkleProof?`, `rawTx?`): `Promise`<[`Bytes`, `Bytes`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `electrsAPI` | [`ElectrsAPI`](/interfaces/ElectrsAPI.md) |
| `btcTxId?` | `string` |
| `merkleProof?` | `Bytes` |
| `rawTx?` | `Bytes` |

#### Returns

`Promise`<[`Bytes`, `Bytes`]\>

#### Defined in

[src/utils/bitcoin.ts:84](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin.ts#L84)

___

### issueAndRedeem

▸ **issueAndRedeem**(`api`, `electrsAPI`, `btcRelayAPI`, `bitcoinCoreClient`, `account`, `vaultAddress?`, `issueAmount?`, `redeemAmount?`, `autoExecuteIssue?`, `autoExecuteRedeem?`, `triggerRefund?`, `network?`, `atomic?`): `Promise`<[[`Issue`](/interfaces/Issue.md), [`Redeem`](/interfaces/Redeem.md)]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `api` | `ApiPromise` | `undefined` |
| `electrsAPI` | [`ElectrsAPI`](/interfaces/ElectrsAPI.md) | `undefined` |
| `btcRelayAPI` | [`BTCRelayAPI`](/interfaces/BTCRelayAPI.md) | `undefined` |
| `bitcoinCoreClient` | [`BitcoinCoreClient`](/classes/BitcoinCoreClient.md) | `undefined` |
| `account` | `KeyringPair` | `undefined` |
| `vaultAddress?` | `string` | `undefined` |
| `issueAmount` | `MonetaryAmount`<`Currency`<`Object`\>, `Object`\> | `undefined` |
| `redeemAmount` | `MonetaryAmount`<`Currency`<`Object`\>, `Object`\> | `undefined` |
| `autoExecuteIssue` | `boolean` | `true` |
| `autoExecuteRedeem` | [`ExecuteRedeem`](/enums/ExecuteRedeem.md) | `undefined` |
| `triggerRefund` | `boolean` | `false` |
| `network` | [`BitcoinNetwork`](/modules.md#bitcoinnetwork) | `"regtest"` |
| `atomic` | `boolean` | `true` |

#### Returns

`Promise`<[[`Issue`](/interfaces/Issue.md), [`Redeem`](/interfaces/Redeem.md)]\>

#### Defined in

[src/utils/issueRedeem.ts:237](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/issueRedeem.ts#L237)

___

### issueSingle

▸ **issueSingle**(`api`, `electrsAPI`, `bitcoinCoreClient`, `issuingAccount`, `amount`, `vaultAddress?`, `autoExecute?`, `triggerRefund?`, `network?`, `atomic?`): `Promise`<[`IssueResult`](/interfaces/IssueResult.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `api` | `ApiPromise` | `undefined` |
| `electrsAPI` | [`ElectrsAPI`](/interfaces/ElectrsAPI.md) | `undefined` |
| `bitcoinCoreClient` | [`BitcoinCoreClient`](/classes/BitcoinCoreClient.md) | `undefined` |
| `issuingAccount` | `KeyringPair` | `undefined` |
| `amount` | `BTCAmount` | `undefined` |
| `vaultAddress?` | `string` | `undefined` |
| `autoExecute` | `boolean` | `true` |
| `triggerRefund` | `boolean` | `false` |
| `network` | [`BitcoinNetwork`](/modules.md#bitcoinnetwork) | `"regtest"` |
| `atomic` | `boolean` | `true` |

#### Returns

`Promise`<[`IssueResult`](/interfaces/IssueResult.md)\>

#### Defined in

[src/utils/issueRedeem.ts:103](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/issueRedeem.ts#L103)

___

### monetaryToCurrencyId

▸ **monetaryToCurrencyId**<`C`\>(`monetary`): [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `monetary` | `MonetaryAmount`<`Currency`<`C`\>, `C`\> |

#### Returns

[`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md)

#### Defined in

[src/types/currency.ts:27](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L27)

___

### newAccountId

▸ **newAccountId**(`api`, `accountId`): `AccountId`

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `accountId` | `string` |

#### Returns

`AccountId`

#### Defined in

[src/utils/encoding.ts:147](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L147)

___

### newCollateralBTCExchangeRate

▸ **newCollateralBTCExchangeRate**<`C`\>(`rate`, `counterCurrency`, `useBaseUnits?`): `ExchangeRate`<`Bitcoin`, `BTCUnit`, `Currency`<`C`\>, `C`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `rate` | `Big` | `undefined` |
| `counterCurrency` | `Currency`<`C`\> | `undefined` |
| `useBaseUnits` | `boolean` | `false` |

#### Returns

`ExchangeRate`<`Bitcoin`, `BTCUnit`, `Currency`<`C`\>, `C`\>

#### Defined in

[src/utils/currency.ts:95](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L95)

___

### newMonetaryAmount

▸ **newMonetaryAmount**<`C`\>(`amount`, `currency`, `base?`): `MonetaryAmount`<`Currency`<`C`\>, `C`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CurrencyUnit`](/modules.md#currencyunit) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `amount` | `BigSource` | `undefined` |
| `currency` | `Currency`<`C`\> | `undefined` |
| `base` | `boolean` | `false` |

#### Returns

`MonetaryAmount`<`Currency`<`C`\>, `C`\>

#### Defined in

[src/utils/currency.ts:86](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L86)

___

### parseIssueRequest

▸ **parseIssueRequest**(`req`, `network`, `id`): [`Issue`](/interfaces/Issue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IssueRequest` |
| `network` | [`Network`](/interfaces/bitcoin.networks.Network.md) |
| `id` | `H256` \| `string` |

#### Returns

[`Issue`](/interfaces/Issue.md)

#### Defined in

[src/utils/encoding.ts:179](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L179)

___

### parseRedeemRequest

▸ **parseRedeemRequest**(`req`, `network`, `id`): [`Redeem`](/interfaces/Redeem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `RedeemRequest` |
| `network` | [`Network`](/interfaces/bitcoin.networks.Network.md) |
| `id` | `H256` |

#### Returns

[`Redeem`](/interfaces/Redeem.md)

#### Defined in

[src/utils/encoding.ts:199](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L199)

___

### parseRefundRequest

▸ **parseRefundRequest**(`req`, `network`): [`RefundRequestExt`](/interfaces/RefundRequestExt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `RefundRequest` |
| `network` | [`Network`](/interfaces/bitcoin.networks.Network.md) |

#### Returns

[`RefundRequestExt`](/interfaces/RefundRequestExt.md)

#### Defined in

[src/utils/encoding.ts:151](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L151)

___

### parseReplaceRequest

▸ **parseReplaceRequest**(`req`, `network`): [`ReplaceRequestExt`](/interfaces/ReplaceRequestExt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `ReplaceRequest` |
| `network` | [`Network`](/interfaces/bitcoin.networks.Network.md) |

#### Returns

[`ReplaceRequestExt`](/interfaces/ReplaceRequestExt.md)

#### Defined in

[src/utils/encoding.ts:164](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L164)

___

### parseSystemVault

▸ **parseSystemVault**(`vault`): [`SystemVaultExt`](/interfaces/SystemVaultExt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vault` | `SystemVault` |

#### Returns

[`SystemVaultExt`](/interfaces/SystemVaultExt.md)

#### Defined in

[src/utils/encoding.ts:139](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L139)

___

### parseWallet

▸ **parseWallet**(`wallet`, `network`): [`WalletExt`](/interfaces/WalletExt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `wallet` | `Wallet` |
| `network` | [`Network`](/interfaces/bitcoin.networks.Network.md) |

#### Returns

[`WalletExt`](/interfaces/WalletExt.md)

#### Defined in

[src/utils/encoding.ts:125](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L125)

___

### planckToDOT

▸ **planckToDOT**(`planck`): `Big`

#### Parameters

| Name | Type |
| :------ | :------ |
| `planck` | `BN` |

#### Returns

`Big`

#### Defined in

[src/utils/currency.ts:66](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L66)

___

### redeem

▸ **redeem**(`api`, `electrsAPI`, `bitcoinCoreClient`, `btcRelayAPI`, `redeemingAccount`, `amount`, `vaultAddress?`, `autoExecute?`, `network?`, `atomic?`, `timeout?`): `Promise`<[`Redeem`](/interfaces/Redeem.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `api` | `ApiPromise` | `undefined` |
| `electrsAPI` | [`ElectrsAPI`](/interfaces/ElectrsAPI.md) | `undefined` |
| `bitcoinCoreClient` | [`BitcoinCoreClient`](/classes/BitcoinCoreClient.md) | `undefined` |
| `btcRelayAPI` | [`BTCRelayAPI`](/interfaces/BTCRelayAPI.md) | `undefined` |
| `redeemingAccount` | `KeyringPair` | `undefined` |
| `amount` | `BTCAmount` | `undefined` |
| `vaultAddress?` | `string` | `undefined` |
| `autoExecute` | [`ExecuteRedeem`](/enums/ExecuteRedeem.md) | `undefined` |
| `network` | [`BitcoinNetwork`](/modules.md#bitcoinnetwork) | `"regtest"` |
| `atomic` | `boolean` | `true` |
| `timeout` | `number` | `undefined` |

#### Returns

`Promise`<[`Redeem`](/interfaces/Redeem.md)\>

#### Defined in

[src/utils/issueRedeem.ts:187](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/issueRedeem.ts#L187)

___

### reverseEndianness

▸ **reverseEndianness**(`bytes`): `Uint8Array`

Converts endianness of a Uint8Array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | Uint8Array, to be converted LE<>BE |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/encoding.ts:31](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L31)

___

### reverseEndiannessHex

▸ **reverseEndiannessHex**(`hex`): `string`

Reverse the endianness of the given hex string

**`dev`** Will remove `0x` prefix if present

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/encoding.ts:83](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L83)

___

### roundLastNDigits

▸ **roundLastNDigits**(`n`, `x`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |
| `x` | `BN` \| `Big` \| `string` |

#### Returns

`string`

#### Defined in

[src/utils/currency.ts:79](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L79)

___

### roundTwoDecimals

▸ **roundTwoDecimals**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/currency.ts:17](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L17)

___

### roundUpBigToNearestInteger

▸ **roundUpBigToNearestInteger**(`x`): `Big`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Big` |

#### Returns

`Big`

#### Defined in

[src/utils/currency.ts:22](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L22)

___

### roundUpBtcToNearestSatoshi

▸ **roundUpBtcToNearestSatoshi**(`amountBtc`): `Big`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountBtc` | `Big` |

#### Returns

`Big`

#### Defined in

[src/utils/currency.ts:36](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L36)

___

### satToBTC

▸ **satToBTC**(`sat`): `Big`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sat` | `BN` |

#### Returns

`Big`

#### Defined in

[src/utils/currency.ts:49](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L49)

___

### satToMBTC

▸ **satToMBTC**(`sat`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sat` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/currency.ts:54](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/currency.ts#L54)

___

### setNumericStorage

▸ **setNumericStorage**(`api`, `moduleName`, `storageItemName`, `value`, `transactionAPI`, `bits?`, `isLittleEndian?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `api` | `ApiPromise` | `undefined` |
| `moduleName` | `string` | `undefined` |
| `storageItemName` | `string` | `undefined` |
| `value` | `BN` | `undefined` |
| `transactionAPI` | [`TransactionAPI`](/interfaces/TransactionAPI.md) | `undefined` |
| `bits` | `number` | `32` |
| `isLittleEndian` | `boolean` | `true` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/storage.ts:15](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/storage.ts#L15)

___

### sleep

▸ **sleep**(`ms`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/issueRedeem.ts:183](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/issueRedeem.ts#L183)

___

### storageKeyToNthInner

▸ **storageKeyToNthInner**<`T`\>(`s`, `n?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Codec` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `s` | `StorageKey`<`T`[]\> | `undefined` |
| `n` | `number` | `0` |

#### Returns

`T`

#### Defined in

[src/utils/encoding.ts:112](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L112)

___

### stripHexPrefix

▸ **stripHexPrefix**(`str`): `string`

Remove the `0x` hex prefix if present

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/encoding.ts:53](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L53)

___

### tickerToCurrencyIdLiteral

▸ **tickerToCurrencyIdLiteral**(`ticker`): [`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ticker` | `string` |

#### Returns

[`CurrencyIdLiteral`](/enums/CurrencyIdLiteral.md)

#### Defined in

[src/types/currency.ts:49](https://github.com/interlay/interbtc-api/blob/5eab153/src/types/currency.ts#L49)

___

### uint8ArrayToString

▸ **uint8ArrayToString**(`bytes`): `string`

Converts a Uint8Array to string

**`dev`** Will remove `0x` prefix if present

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[src/utils/encoding.ts:94](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L94)

___

### unwrapRawExchangeRate

▸ **unwrapRawExchangeRate**(`option`): `UnsignedFixedPoint` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `Option`<`UnsignedFixedPoint`\> |

#### Returns

`UnsignedFixedPoint` \| `undefined`

#### Defined in

[src/utils/encoding.ts:225](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/encoding.ts#L225)

___

### waitForBlockFinalization

▸ **waitForBlockFinalization**(`bitcoinCoreClient`, `btcRelayAPI`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bitcoinCoreClient` | [`BitcoinCoreClient`](/classes/BitcoinCoreClient.md) |
| `btcRelayAPI` | [`BTCRelayAPI`](/interfaces/BTCRelayAPI.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/bitcoin.ts:110](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin.ts#L110)

___

### waitForBlockRelaying

▸ **waitForBlockRelaying**(`btcRelayAPI`, `blockHash`, `sleepMs?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `btcRelayAPI` | [`BTCRelayAPI`](/interfaces/BTCRelayAPI.md) |
| `blockHash` | `string` |
| `sleepMs` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/bitcoin.ts:99](https://github.com/interlay/interbtc-api/blob/5eab153/src/utils/bitcoin.ts#L99)
