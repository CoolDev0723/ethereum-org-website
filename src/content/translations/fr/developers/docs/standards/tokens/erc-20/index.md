---
title: Norme de jeton ERC-20
description:
lang: fr
sidebar: true
---

## Introduction {#introduction}

**Qu'est ce qu'un jeton ?**

Un jeton peut représenter à peu près n'importe quoi sur Ethereum :

- Des points de réputation sur une plateforme en ligne
- Les compétences d'un personnage de jeu
- Un billet de loterie
- Des actifs financiers, comme une action dans une société
- Une monnaie fiduciaire comme l'EUR
- Une once d'or
- Et plus encore...

Un écosystème aussi puissant qu'Ethereum doit être géré selon une norme robuste, non ? C'est exactement là que l'ERC-20 joue son rôle ! Cette norme permet aux développeurs de construire des applications de jetons interopérables avec d'autres produits et services.

**Qu'est-ce que l'ERC-20 ?**

L'ERC-20 introduit une norme pour les jetons fongibles. En d'autres termes, ils disposent d'une propriété qui fait que chaque jeton est exactement le même (en termes de type et de valeur) qu'un autre jeton. Par exemple, un jeton ERC-20 agit exactement comme de l'ETH, ce qui signifie que 1 jeton est et sera toujours égal à tous les autres jetons.

## Prérequis {#prerequisites}

- [Comptes](/developers/docs/accounts)
- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Normes de jetons](/developers/docs/standards/tokens/)

## Présentation {#body}

La demande de commentaires ERC-20, proposée par Fabian Vogelsteller en novembre 2015, est une norme de jeton qui implémente une API pour les jetons au sein des contrats intelligents.

Elle fournit des fonctionnalités permettant de transférer des jetons d'un compte à un autre, ou d'obtenir le solde actuel d'un compte en jetons et le nombre total de jetons disponibles sur le réseau. En plus de celles-ci, il en existe d'autres pour, par exemple, approuver que des jetons provenant d'un compte soient dépensés par un compte tiers.

Si un contrat intelligent implémente les méthodes et les événements suivants, il peut être nommé Contrat de jeton ERC-20 et, une fois déployé, sera responsable d'effectuer un suivi des jetons créés sur Ethereum.

De [EIP-20](https://eips.ethereum.org/EIPS/eip-20) :

#### Méthodes {#methods}

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

#### Événements {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Exemples {#web3py-example}

Voyons comment une norme est si importante pour nous faciliter le contrôle de tout contrat de jeton ERC-20 sur Ethereum. Nous avons juste besoin de l'interface binaire-programme (ABI) du contrat pour créer une interface à n'importe quel jeton ERC-20. Comme vous pouvez le voir ci-dessous, nous utiliserons une ABI simplifiée, pour en faire un exemple de faible friction.

#### Exempl Web3.py {#web3py-example}

Pour commencer, assurez-vous d'avoir installé la bibliothèque Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) :

```
$ pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.
# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
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

## Complément d'information {#further-reading}

- [EIP-20: ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokens](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implémentation ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [ConsenSys - Implémentation ERC-20](https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20.sol)

## Sujets connexes {#related-topics}

- [ERC-721](/developers/docs/standards/tokens/erc-721/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
