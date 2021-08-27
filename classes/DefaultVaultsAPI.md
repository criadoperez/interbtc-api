[@interlay/interbtc-api](/README.md) / [Exports](/modules.md) / DefaultVaultsAPI

# Class: DefaultVaultsAPI

## Hierarchy

- [`DefaultTransactionAPI`](/classes/DefaultTransactionAPI.md)

  ↳ **`DefaultVaultsAPI`**

## Implements

- [`VaultsAPI`](/interfaces/VaultsAPI.md)

## Table of contents

### Constructors

- [constructor](/classes/DefaultVaultsAPI.md#constructor)

### Properties

- [api](/classes/DefaultVaultsAPI.md#api)
- [btcNetwork](/classes/DefaultVaultsAPI.md#btcnetwork)
- [feeAPI](/classes/DefaultVaultsAPI.md#feeapi)
- [granularity](/classes/DefaultVaultsAPI.md#granularity)
- [oracleAPI](/classes/DefaultVaultsAPI.md#oracleapi)
- [poolsAPI](/classes/DefaultVaultsAPI.md#poolsapi)
- [tokensAPI](/classes/DefaultVaultsAPI.md#tokensapi)

### Methods

- [calculateCapacity](/classes/DefaultVaultsAPI.md#calculatecapacity)
- [depositCollateral](/classes/DefaultVaultsAPI.md#depositcollateral)
- [get](/classes/DefaultVaultsAPI.md#get)
- [getAPY](/classes/DefaultVaultsAPI.md#getapy)
- [getAccount](/classes/DefaultVaultsAPI.md#getaccount)
- [getBackingCollateral](/classes/DefaultVaultsAPI.md#getbackingcollateral)
- [getCollateral](/classes/DefaultVaultsAPI.md#getcollateral)
- [getIssuableAmount](/classes/DefaultVaultsAPI.md#getissuableamount)
- [getIssuedAmount](/classes/DefaultVaultsAPI.md#getissuedamount)
- [getLiquidationCollateralThreshold](/classes/DefaultVaultsAPI.md#getliquidationcollateralthreshold)
- [getLiquidationVault](/classes/DefaultVaultsAPI.md#getliquidationvault)
- [getLiquidationVaultId](/classes/DefaultVaultsAPI.md#getliquidationvaultid)
- [getMaxNominationRatio](/classes/DefaultVaultsAPI.md#getmaxnominationratio)
- [getPremiumRedeemThreshold](/classes/DefaultVaultsAPI.md#getpremiumredeemthreshold)
- [getPremiumRedeemVaults](/classes/DefaultVaultsAPI.md#getpremiumredeemvaults)
- [getPunishmentFee](/classes/DefaultVaultsAPI.md#getpunishmentfee)
- [getRequiredCollateralForVault](/classes/DefaultVaultsAPI.md#getrequiredcollateralforvault)
- [getRequiredCollateralForWrapped](/classes/DefaultVaultsAPI.md#getrequiredcollateralforwrapped)
- [getSecureCollateralThreshold](/classes/DefaultVaultsAPI.md#getsecurecollateralthreshold)
- [getStakingCapacity](/classes/DefaultVaultsAPI.md#getstakingcapacity)
- [getSystemCollateralization](/classes/DefaultVaultsAPI.md#getsystemcollateralization)
- [getTotalIssuableAmount](/classes/DefaultVaultsAPI.md#gettotalissuableamount)
- [getTotalIssuedAmount](/classes/DefaultVaultsAPI.md#gettotalissuedamount)
- [getVaultCollateralization](/classes/DefaultVaultsAPI.md#getvaultcollateralization)
- [getVaultsWithIssuableTokens](/classes/DefaultVaultsAPI.md#getvaultswithissuabletokens)
- [getVaultsWithRedeemableTokens](/classes/DefaultVaultsAPI.md#getvaultswithredeemabletokens)
- [isNoTokensIssuedError](/classes/DefaultVaultsAPI.md#isnotokensissuederror)
- [isVaultFlaggedForTheft](/classes/DefaultVaultsAPI.md#isvaultflaggedfortheft)
- [list](/classes/DefaultVaultsAPI.md#list)
- [mapIssueRequests](/classes/DefaultVaultsAPI.md#mapissuerequests)
- [mapRedeemRequests](/classes/DefaultVaultsAPI.md#mapredeemrequests)
- [mapReplaceRequests](/classes/DefaultVaultsAPI.md#mapreplacerequests)
- [parseVault](/classes/DefaultVaultsAPI.md#parsevault)
- [parseVaultStatus](/classes/DefaultVaultsAPI.md#parsevaultstatus)
- [register](/classes/DefaultVaultsAPI.md#register)
- [reportVaultTheft](/classes/DefaultVaultsAPI.md#reportvaulttheft)
- [selectRandomVaultIssue](/classes/DefaultVaultsAPI.md#selectrandomvaultissue)
- [selectRandomVaultRedeem](/classes/DefaultVaultsAPI.md#selectrandomvaultredeem)
- [sendLogged](/classes/DefaultVaultsAPI.md#sendlogged)
- [setAccount](/classes/DefaultVaultsAPI.md#setaccount)
- [unwrapCurrency](/classes/DefaultVaultsAPI.md#unwrapcurrency)
- [withdrawCollateral](/classes/DefaultVaultsAPI.md#withdrawcollateral)
- [wrapCurrency](/classes/DefaultVaultsAPI.md#wrapcurrency)
- [doesArrayContainEvent](/classes/DefaultVaultsAPI.md#doesarraycontainevent)
- [isDispatchError](/classes/DefaultVaultsAPI.md#isdispatcherror)
- [printEvents](/classes/DefaultVaultsAPI.md#printevents)
- [waitForEvent](/classes/DefaultVaultsAPI.md#waitforevent)

## Constructors

### constructor

• **new DefaultVaultsAPI**(`api`, `btcNetwork`, `electrsAPI`, `account?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `btcNetwork` | [`Network`](/interfaces/bitcoin.networks.Network.md) |
| `electrsAPI` | [`ElectrsAPI`](/interfaces/ElectrsAPI.md) |
| `account?` | `AddressOrPair` |

#### Overrides

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[constructor](/classes/DefaultTransactionAPI.md#constructor)

#### Defined in

[src/parachain/vaults.ts:281](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L281)

## Properties

### api

• **api**: `ApiPromise`

#### Inherited from

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[api](/classes/DefaultTransactionAPI.md#api)

___

### btcNetwork

• `Private` **btcNetwork**: [`Network`](/interfaces/bitcoin.networks.Network.md)

#### Defined in

[src/parachain/vaults.ts:275](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L275)

___

### feeAPI

• **feeAPI**: [`FeeAPI`](/interfaces/FeeAPI.md)

#### Defined in

[src/parachain/vaults.ts:278](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L278)

___

### granularity

• **granularity**: `number` = `5`

#### Defined in

[src/parachain/vaults.ts:274](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L274)

___

### oracleAPI

• **oracleAPI**: [`OracleAPI`](/interfaces/OracleAPI.md)

#### Defined in

[src/parachain/vaults.ts:277](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L277)

___

### poolsAPI

• **poolsAPI**: [`PoolsAPI`](/interfaces/PoolsAPI.md)

#### Defined in

[src/parachain/vaults.ts:279](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L279)

___

### tokensAPI

• **tokensAPI**: [`TokensAPI`](/interfaces/TokensAPI.md)

#### Defined in

[src/parachain/vaults.ts:276](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L276)

## Methods

### calculateCapacity

▸ `Private` **calculateCapacity**<`C`\>(`collateral`): `Promise`<`BTCAmount`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit){ `DOT`: ``10`` ; `Planck`: ``0``  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collateral` | `MonetaryAmount`<`Currency`<`C`\>, `C`\> |

#### Returns

`Promise`<`BTCAmount`\>

#### Defined in

[src/parachain/vaults.ts:521](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L521)

___

### depositCollateral

▸ **depositCollateral**<`C`\>(`amount`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `MonetaryAmount`<`Currency`<`C`\>, `C`\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[depositCollateral](/interfaces/VaultsAPI.md#depositcollateral)

#### Defined in

[src/parachain/vaults.ts:302](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L302)

___

### get

▸ **get**(`vaultId`): `Promise`<[`VaultExt`](/interfaces/VaultExt.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |

#### Returns

`Promise`<[`VaultExt`](/interfaces/VaultExt.md)\>

A vault object

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[get](/interfaces/VaultsAPI.md#get)

#### Defined in

[src/parachain/vaults.ts:352](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L352)

___

### getAPY

▸ **getAPY**(`vaultId`): `Promise`<`Big`\>

Get the total APY for a vault based on the income in InterBTC and DOT
divided by the locked DOT.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |

#### Returns

`Promise`<`Big`\>

the APY as a percentage string

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getAPY](/interfaces/VaultsAPI.md#getapy)

#### Defined in

[src/parachain/vaults.ts:615](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L615)

___

### getAccount

▸ **getAccount**(): `undefined` \| `AddressOrPair`

#### Returns

`undefined` \| `AddressOrPair`

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getAccount](/interfaces/VaultsAPI.md#getaccount)

#### Inherited from

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[getAccount](/classes/DefaultTransactionAPI.md#getaccount)

#### Defined in

[src/parachain/transaction.ts:26](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L26)

___

### getBackingCollateral

▸ **getBackingCollateral**<`C`\>(`vaultId`, `currency`, `nonce?`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |
| `currency` | `Currency`<`C`\> |
| `nonce?` | `number` |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

The entire collateral backing a vault's issued tokens.

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getBackingCollateral](/interfaces/VaultsAPI.md#getbackingcollateral)

#### Defined in

[src/parachain/vaults.ts:376](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L376)

___

### getCollateral

▸ **getCollateral**<`C`\>(`vaultId`, `collateralCurrency`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit){ `DOT`: ``10`` ; `Planck`: ``0``  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |
| `collateralCurrency` | `Currency`<`C`\> |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

The collateral of a vault, taking slashes into account.

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getCollateral](/interfaces/VaultsAPI.md#getcollateral)

#### Defined in

[src/parachain/vaults.ts:361](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L361)

___

### getIssuableAmount

▸ **getIssuableAmount**(`vaultId`): `Promise`<`BTCAmount`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |

#### Returns

`Promise`<`BTCAmount`\>

The amount of InterBTC issuable by this vault

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getIssuableAmount](/interfaces/VaultsAPI.md#getissuableamount)

#### Defined in

[src/parachain/vaults.ts:493](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L493)

___

### getIssuedAmount

▸ **getIssuedAmount**(`vaultId`): `Promise`<`BTCAmount`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |

#### Returns

`Promise`<`BTCAmount`\>

The amount of InterBTC issued by the given vault

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getIssuedAmount](/interfaces/VaultsAPI.md#getissuedamount)

#### Defined in

[src/parachain/vaults.ts:488](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L488)

___

### getLiquidationCollateralThreshold

▸ **getLiquidationCollateralThreshold**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The lower bound for the collateral rate in InterBTC.
If a Vault’s collateral rate
drops below this, automatic liquidation (forced Redeem) is triggered.

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getLiquidationCollateralThreshold](/interfaces/VaultsAPI.md#getliquidationcollateralthreshold)

#### Defined in

[src/parachain/vaults.ts:597](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L597)

___

### getLiquidationVault

▸ **getLiquidationVault**(): `Promise`<[`SystemVaultExt`](/interfaces/SystemVaultExt.md)\>

#### Returns

`Promise`<[`SystemVaultExt`](/interfaces/SystemVaultExt.md)\>

A vault object representing the liquidation vault

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getLiquidationVault](/interfaces/VaultsAPI.md#getliquidationvault)

#### Defined in

[src/parachain/vaults.ts:408](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L408)

___

### getLiquidationVaultId

▸ **getLiquidationVaultId**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

The account id of the liquidation vault

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getLiquidationVaultId](/interfaces/VaultsAPI.md#getliquidationvaultid)

#### Defined in

[src/parachain/vaults.ts:402](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L402)

___

### getMaxNominationRatio

▸ **getMaxNominationRatio**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The maximum collateral a vault can accept as nomination, as a ratio of its own collateral

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getMaxNominationRatio](/interfaces/VaultsAPI.md#getmaxnominationratio)

#### Defined in

[src/parachain/vaults.ts:368](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L368)

___

### getPremiumRedeemThreshold

▸ **getPremiumRedeemThreshold**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The collateral rate of Vaults at which users receive
a premium in DOT, allocated from the
Vault’s collateral, when performing a redeem with this Vault.

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getPremiumRedeemThreshold](/interfaces/VaultsAPI.md#getpremiumredeemthreshold)

#### Defined in

[src/parachain/vaults.ts:603](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L603)

___

### getPremiumRedeemVaults

▸ **getPremiumRedeemVaults**(): `Promise`<`Map`<`AccountId`, `BTCAmount`\>\>

#### Returns

`Promise`<`Map`<`AccountId`, `BTCAmount`\>\>

Vaults below the premium redeem threshold, sorted in descending order of their redeemable tokens

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getPremiumRedeemVaults](/interfaces/VaultsAPI.md#getpremiumredeemvaults)

#### Defined in

[src/parachain/vaults.ts:557](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L557)

___

### getPunishmentFee

▸ **getPunishmentFee**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

Fee that a Vault has to pay if it fails to execute redeem or replace requests
(for redeem, on top of the slashed BTC-in-DOT value of the request). The fee is
paid in DOT based on the InterBTC amount at the current exchange rate.

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getPunishmentFee](/interfaces/VaultsAPI.md#getpunishmentfee)

#### Defined in

[src/parachain/vaults.ts:629](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L629)

___

### getRequiredCollateralForVault

▸ **getRequiredCollateralForVault**<`C`\>(`vaultId`, `currency`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

Get the amount of collateral required for the given vault to be at the
current SecureCollateralThreshold with the current exchange rate

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit){ `DOT`: ``10`` ; `Planck`: ``0``  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |
| `currency` | `Currency`<`C`\> |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

The required collateral the vault needs to deposit to stay
above the threshold limit

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getRequiredCollateralForVault](/interfaces/VaultsAPI.md#getrequiredcollateralforvault)

#### Defined in

[src/parachain/vaults.ts:459](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L459)

___

### getRequiredCollateralForWrapped

▸ **getRequiredCollateralForWrapped**<`C`\>(`amount`, `currency`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

Get the minimum amount of collateral required for the given amount of btc
with the current threshold and exchange rate

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit){ `DOT`: ``10`` ; `Planck`: ``0``  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `BTCAmount` |
| `currency` | `Currency`<`C`\> |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

The required collateral for issuing, denominated in DOT

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getRequiredCollateralForWrapped](/interfaces/VaultsAPI.md#getrequiredcollateralforwrapped)

#### Defined in

[src/parachain/vaults.ts:474](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L474)

___

### getSecureCollateralThreshold

▸ **getSecureCollateralThreshold**(): `Promise`<`Big`\>

#### Returns

`Promise`<`Big`\>

The over-collateralization rate for DOT collateral locked
by Vaults, necessary for issuing InterBTC

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getSecureCollateralThreshold](/interfaces/VaultsAPI.md#getsecurecollateralthreshold)

#### Defined in

[src/parachain/vaults.ts:609](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L609)

___

### getStakingCapacity

▸ **getStakingCapacity**<`C`\>(`vaultId`, `collateralCurrency`): `Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit){ `DOT`: ``10`` ; `Planck`: ``0``  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |
| `collateralCurrency` | `Currency`<`C`\> |

#### Returns

`Promise`<`MonetaryAmount`<`Currency`<`C`\>, `C`\>\>

Staking capacity, as a collateral currency (e.g. DOT)

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getStakingCapacity](/interfaces/VaultsAPI.md#getstakingcapacity)

#### Defined in

[src/parachain/vaults.ts:389](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L389)

___

### getSystemCollateralization

▸ **getSystemCollateralization**(): `Promise`<`undefined` \| `Big`\>

Get the total system collateralization measured by the amount of issued InterBTC
divided by the total locked DOT collateral.

#### Returns

`Promise`<`undefined` \| `Big`\>

The total system collateralization

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getSystemCollateralization](/interfaces/VaultsAPI.md#getsystemcollateralization)

#### Defined in

[src/parachain/vaults.ts:447](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L447)

___

### getTotalIssuableAmount

▸ **getTotalIssuableAmount**(): `Promise`<`BTCAmount`\>

#### Returns

`Promise`<`BTCAmount`\>

The total amount of InterBTC that can be issued, considering the DOT
locked by the vaults

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getTotalIssuableAmount](/interfaces/VaultsAPI.md#gettotalissuableamount)

#### Defined in

[src/parachain/vaults.ts:511](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L511)

___

### getTotalIssuedAmount

▸ **getTotalIssuedAmount**(): `Promise`<`BTCAmount`\>

#### Returns

`Promise`<`BTCAmount`\>

The total amount of InterBTC issued by the vaults

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getTotalIssuedAmount](/interfaces/VaultsAPI.md#gettotalissuedamount)

#### Defined in

[src/parachain/vaults.ts:506](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L506)

___

### getVaultCollateralization

▸ **getVaultCollateralization**<`C`\>(`vaultId`, `newCollateral?`, `onlyIssued?`): `Promise`<`undefined` \| `Big`\>

Get the collateralization of a single vault measured by the amount of issued InterBTC
divided by the total locked DOT collateral.

**`remarks`** Undefined collateralization is handled as infinite collateralization in the UI.
If no tokens have been issued, the `collateralFunds / issuedFunds` ratio divides by zero,
which means collateralization is infinite.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit){ `DOT`: ``10`` ; `Planck`: ``0``  } |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `vaultId` | `AccountId` | `undefined` |
| `newCollateral?` | `MonetaryAmount`<`Currency`<`C`\>, `C`\> | `undefined` |
| `onlyIssued` | `boolean` | `false` |

#### Returns

`Promise`<`undefined` \| `Big`\>

the vault collateralization

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getVaultCollateralization](/interfaces/VaultsAPI.md#getvaultcollateralization)

#### Defined in

[src/parachain/vaults.ts:418](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L418)

___

### getVaultsWithIssuableTokens

▸ **getVaultsWithIssuableTokens**(): `Promise`<`Map`<`AccountId`, `BTCAmount`\>\>

#### Returns

`Promise`<`Map`<`AccountId`, `BTCAmount`\>\>

Vaults with issuable tokens, sorted in descending order of this value

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getVaultsWithIssuableTokens](/interfaces/VaultsAPI.md#getvaultswithissuabletokens)

#### Defined in

[src/parachain/vaults.ts:571](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L571)

___

### getVaultsWithRedeemableTokens

▸ **getVaultsWithRedeemableTokens**(): `Promise`<`Map`<`AccountId`, `BTCAmount`\>\>

#### Returns

`Promise`<`Map`<`AccountId`, `BTCAmount`\>\>

Vaults with redeemable tokens, sorted in descending order of this value

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[getVaultsWithRedeemableTokens](/interfaces/VaultsAPI.md#getvaultswithredeemabletokens)

#### Defined in

[src/parachain/vaults.ts:581](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L581)

___

### isNoTokensIssuedError

▸ `Private` **isNoTokensIssuedError**(`e`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `Error` |

#### Returns

`boolean`

#### Defined in

[src/parachain/vaults.ts:414](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L414)

___

### isVaultFlaggedForTheft

▸ **isVaultFlaggedForTheft**(`vaultId`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |

#### Returns

`Promise`<`boolean`\>

A bollean value

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[isVaultFlaggedForTheft](/interfaces/VaultsAPI.md#isvaultflaggedfortheft)

#### Defined in

[src/parachain/vaults.ts:591](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L591)

___

### list

▸ **list**(`atBlock?`): `Promise`<[`VaultExt`](/interfaces/VaultExt.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `atBlock?` | `BlockHash` |

#### Returns

`Promise`<[`VaultExt`](/interfaces/VaultExt.md)[]\>

An array containing the vaults with non-zero backing collateral

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[list](/interfaces/VaultsAPI.md#list)

#### Defined in

[src/parachain/vaults.ts:308](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L308)

___

### mapIssueRequests

▸ **mapIssueRequests**(`vaultId`): `Promise`<`Map`<`H256`, [`Issue`](/interfaces/Issue.md)\>\>

Fetch the issue requests associated with a vault

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |

#### Returns

`Promise`<`Map`<`H256`, [`Issue`](/interfaces/Issue.md)\>\>

A map with issue ids to issue requests involving said vault

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[mapIssueRequests](/interfaces/VaultsAPI.md#mapissuerequests)

#### Defined in

[src/parachain/vaults.ts:314](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L314)

___

### mapRedeemRequests

▸ **mapRedeemRequests**(`vaultId`): `Promise`<`Map`<`H256`, [`Redeem`](/interfaces/Redeem.md)\>\>

Fetch the redeem requests associated with a vault

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |

#### Returns

`Promise`<`Map`<`H256`, [`Redeem`](/interfaces/Redeem.md)\>\>

A map with redeem ids to redeem requests involving said vault

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[mapRedeemRequests](/interfaces/VaultsAPI.md#mapredeemrequests)

#### Defined in

[src/parachain/vaults.ts:323](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L323)

___

### mapReplaceRequests

▸ **mapReplaceRequests**(`vaultId`): `Promise`<`Map`<`H256`, [`ReplaceRequestExt`](/interfaces/ReplaceRequestExt.md)\>\>

Fetch the replace requests associated with a vault. In the returned requests,
the vault is either the replaced or the replacing one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `AccountId` |

#### Returns

`Promise`<`Map`<`H256`, [`ReplaceRequestExt`](/interfaces/ReplaceRequestExt.md)\>\>

A map with replace ids to replace requests involving said vault as new vault and old vault

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[mapReplaceRequests](/interfaces/VaultsAPI.md#mapreplacerequests)

#### Defined in

[src/parachain/vaults.ts:334](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L334)

___

### parseVault

▸ **parseVault**(`vault`, `network`): `Promise`<[`VaultExt`](/interfaces/VaultExt.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vault` | `Vault` |
| `network` | [`Network`](/interfaces/bitcoin.networks.Network.md) |

#### Returns

`Promise`<[`VaultExt`](/interfaces/VaultExt.md)\>

#### Defined in

[src/parachain/vaults.ts:657](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L657)

___

### parseVaultStatus

▸ `Private` **parseVaultStatus**(`status`): [`VaultStatusExt`](/enums/VaultStatusExt.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `VaultStatus` |

#### Returns

[`VaultStatusExt`](/enums/VaultStatusExt.md)

#### Defined in

[src/parachain/vaults.ts:645](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L645)

___

### register

▸ **register**(`planckCollateral`, `publicKey`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `planckCollateral` | `BN` |
| `publicKey` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/parachain/vaults.ts:290](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L290)

___

### reportVaultTheft

▸ **reportVaultTheft**(`vaultId`, `btcTxId?`, `merkleProof?`, `rawTx?`): `Promise`<`void`\>

A relayer may report Vault misbehavior by providing a fraud proof
(malicious Bitcoin transaction and transaction inclusion proof).

**`remarks`** If `txId` is not set, the `merkleProof` and `rawTx` must both be set.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `string` |
| `btcTxId?` | `string` |
| `merkleProof?` | `Bytes` |
| `rawTx?` | `Bytes` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[reportVaultTheft](/interfaces/VaultsAPI.md#reportvaulttheft)

#### Defined in

[src/parachain/vaults.ts:674](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L674)

___

### selectRandomVaultIssue

▸ **selectRandomVaultIssue**(`amount`): `Promise`<`AccountId`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `BTCAmount` |

#### Returns

`Promise`<`AccountId`\>

A vault that has sufficient DOT collateral to issue the given InterBTC amount

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[selectRandomVaultIssue](/interfaces/VaultsAPI.md#selectrandomvaultissue)

#### Defined in

[src/parachain/vaults.ts:533](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L533)

___

### selectRandomVaultRedeem

▸ **selectRandomVaultRedeem**(`amount`): `Promise`<`AccountId`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `BTCAmount` |

#### Returns

`Promise`<`AccountId`\>

A vault that has issued sufficient InterBTC to redeem the given InterBTC amount

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[selectRandomVaultRedeem](/interfaces/VaultsAPI.md#selectrandomvaultredeem)

#### Defined in

[src/parachain/vaults.ts:545](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L545)

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

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[sendLogged](/interfaces/VaultsAPI.md#sendlogged)

#### Inherited from

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[sendLogged](/classes/DefaultTransactionAPI.md#sendlogged)

#### Defined in

[src/parachain/transaction.ts:30](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L30)

___

### setAccount

▸ **setAccount**(`account`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `AddressOrPair` |

#### Returns

`void`

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[setAccount](/interfaces/VaultsAPI.md#setaccount)

#### Inherited from

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[setAccount](/classes/DefaultTransactionAPI.md#setaccount)

#### Defined in

[src/parachain/transaction.ts:22](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L22)

___

### unwrapCurrency

▸ `Private` **unwrapCurrency**(`wrappedBalance`): `Balance`

#### Parameters

| Name | Type |
| :------ | :------ |
| `wrappedBalance` | `BalanceWrapper` |

#### Returns

`Balance`

#### Defined in

[src/parachain/vaults.ts:641](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L641)

___

### withdrawCollateral

▸ **withdrawCollateral**<`C`\>(`amount`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`CollateralUnit`](/modules.md#collateralunit) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `MonetaryAmount`<`Currency`<`C`\>, `C`\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[VaultsAPI](/interfaces/VaultsAPI.md).[withdrawCollateral](/interfaces/VaultsAPI.md#withdrawcollateral)

#### Defined in

[src/parachain/vaults.ts:295](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L295)

___

### wrapCurrency

▸ `Private` **wrapCurrency**(`amount`): `BalanceWrapper`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `Balance` |

#### Returns

`BalanceWrapper`

#### Defined in

[src/parachain/vaults.ts:635](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/vaults.ts#L635)

___

### doesArrayContainEvent

▸ `Static` **doesArrayContainEvent**<`T`\>(`events`, `eventType`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Codec`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `events` | `EventRecord`[] |
| `eventType` | `AugmentedEvent`<`ApiTypes`, `T`\> |

#### Returns

`boolean`

#### Inherited from

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[doesArrayContainEvent](/classes/DefaultTransactionAPI.md#doesarraycontainevent)

#### Defined in

[src/parachain/transaction.ts:130](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L130)

___

### isDispatchError

▸ `Static` **isDispatchError**(`eventData`): eventData is DispatchError

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventData` | `unknown` |

#### Returns

eventData is DispatchError

#### Inherited from

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[isDispatchError](/classes/DefaultTransactionAPI.md#isdispatcherror)

#### Defined in

[src/parachain/transaction.ts:126](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L126)

___

### printEvents

▸ `Static` **printEvents**(`api`, `events`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `events` | `EventRecord`[] |

#### Returns

`void`

#### Inherited from

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[printEvents](/classes/DefaultTransactionAPI.md#printevents)

#### Defined in

[src/parachain/transaction.ts:66](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L66)

___

### waitForEvent

▸ `Static` **waitForEvent**<`T`\>(`api`, `event`, `timeoutMs`): `Promise`<`boolean`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Codec`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `ApiPromise` |
| `event` | `AugmentedEvent`<`ApiTypes`, `T`\> |
| `timeoutMs` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[DefaultTransactionAPI](/classes/DefaultTransactionAPI.md).[waitForEvent](/classes/DefaultTransactionAPI.md#waitforevent)

#### Defined in

[src/parachain/transaction.ts:97](https://github.com/interlay/interbtc-api/blob/5eab153/src/parachain/transaction.ts#L97)
