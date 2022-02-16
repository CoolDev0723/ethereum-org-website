---
title: Standard token ERC-20
description:
lang: it
sidebar: true
---

## Introduzione {#introduction}

**Cos'è un token?**

I token possono rappresentare praticamente tutto in Ethereum:

- punti di reputazione in piattaforme online
- abilità di un personaggio di un videogioco
- biglietti della lotteria
- strumenti finanziari come una partecipazione in una società
- una valuta legale come il dollaro statunitense
- un'oncia d'oro
- e molto altro...

Una caratteristica così potente di Ethereum deve essere gestita da uno standard robusto. Questo è esattamente il ruolo di ERC-20! Questi standard permette agli sviluppatori di creare applicazioni token interoperabili con altri prodotti e servizi.

**Cos'è ERC-20?**

ERC-20 introduce uno standard per i token fungibili. In altre parole questi token hanno una proprietà che rende ogni token esattamente uguale (per tipo e valore) a un altro token. Per esempio, un token ERC-20 funziona esattamente come ETH, ossia 1 token è e sarà sempre uguale a tutti gli altri token.

## Prerequisiti {#prerequisites}

- [Account](/developers/docs/accounts)
- [Smart Contract](/developers/docs/smart-contracts/)
- [Standard per i token](/developers/docs/standards/tokens/)

## Corpo {#body}

ERC-20 (Ethereum Request for Comments 20), proposto da Fabian Vogelsteller nel novembre 2015, è uno standard token che implementa un'API per token all'interno di Smart Contract.

Fornisce funzionalità ad esempio per il trasferimento di token da un account a un altro, la richiesta del saldo corrente di token di un account e anche la quantità totale di token disponibili sulla rete. Oltre a questo ha anche altre funzionalità, come la possibilità di approvare che una quantità di token di un account possa essere spesa da un account di terze parti.

Se uno Smart Contract implementa i seguenti metodi ed eventi può essere chiamato contratto token ERC-20 e, una volta distribuito, sarà responsabile di tenere traccia dei token creati su Ethereum.

Da [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

#### Metodi {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

#### Eventi {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Esempi {#web3py-example}

Vediamo perché uno standard è così importante per semplificare l'ispezione dei contratti token ERC-20 su Ethereum. Ci serve solo la Contract Application Binary Interface (ABI) per creare un'interfaccia per qualsiasi token ERC-20. Come puoi vedere di seguito, useremo un'ABI semplificata per fornire un esempio semplice da capire.

#### Esempio Web3.py {#web3py-example}

Prima di tutto, controlla di avere installato la libreria Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
$ pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# questa è un'ABI (Contract Application Binary Interface) semplificata per un contratto token ERC-20.
# Espone solo i metodi balanceOf(address), decimals(), symbol() e totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

dai_contract = w3.eth.contract(address=w3.toChecksumAddress(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.toChecksumAddress(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Letture consigliate {#further-reading}

- [EIP-20: ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokens](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 Implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [ConsenSys - ERC-20 Implementation](https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20.sol)

## Argomenti correlati {#related-topics}

- [ERC-721](/developers/docs/standards/tokens/erc-721/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
