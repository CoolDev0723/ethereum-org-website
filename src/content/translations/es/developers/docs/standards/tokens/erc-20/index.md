---
title: Estándar de token ERC-20
description:
lang: es
sidebar: true
---

## Introducción {#introduction}

**¿Qué es un token?**

Los tokens pueden representar cualquier elemento virtualmente en Ethereum:

- puntos de reputación en la plataforma online
- las habilidades de un personaje en un juego
- boletos de lotería
- activos financieros como una acción en una empresa
- una moneda fiat como el USD
- un lingote de oro
- y más...

Una característica tan poderosa de Ethereum debe ser manejada con un estándar sólido, ¿verdad? ¡Ahí es exactamente donde el ERC desempeña su papel! Este estándar permite a los desarrolladores construir aplicaciones de token que son interoperables con otros productos y servicios.

**¿Qué es el ERC-20?**

El ERC-20 introduce un estándar para los tokens funcionales, es decir, tienen una propiedad que hace que cada token sea exactamente igual (en tipo y valor) que otro token. Por ejemplo, un token ERC-20 actúa igual que ETH, es decir, 1 token es y siempre será igual a todos los demás tokens.

## Requisitos previos {#prerequisites}

- [Cuentas](/developers/docs/accounts)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Estándares de token](/developers/docs/standards/tokens/)

## Cuerpo {#body}

El ERC-20 (Ethereum Request for Comments 20), propuesto por Fabian Vogelsteller en Noviembre 2015, es un estándar de token que implementa una API para tokens dentro de contratos inteligentes.

Proporciona funcionalidades como transferir tokens de una cuenta a otra, para obtener el saldo actual del token de una cuenta y también el suministro total del token disponible en la red. Además de estos también tiene otras funcionalidades como aprobar que una cantidad de token de una cuenta puede ser gastada por una cuenta de terceros.

Si un contrato inteligente implementa los siguientes métodos y eventos, se puede llamar un contrato de token ERC-20, y una vez implementado, será el responsable de llevar un seguimiento de los tokens creados en Ethereum.

Desde [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

#### Métodos {#methods}

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

#### Eventos {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Ejemplos {#web3py-example}

Vamos a ver cómo un estándar es tan importante para que las cosas sean sencillas para que inspeccionemos cualquier contrato de token de ERC-20 en Ethereum. Sólo necesitamos la Interfaz binaria de aplicaciones de contrato (ABI) para crear una interfaz a cualquier token ER-20. Como puedes ver a continuación, usaremos una ABI simplificada, para que sea un ejemplo de fricción bajo.

#### Ejemplo de Web3.py {#web3py-example}

Primero asegúrate de haber instalado [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python library:

```
$ pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F" # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" # Ether envuelto (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11" # Uniswap V2: DAI 2

# Esta es una interfaz binaria simplificada de la aplicación de contratos (ABI) de un contrato de token ERC.
# Solo expondrá los métodos: balanceOf(address), decimals(), symbol() and totalSupply()
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

## Leer más {#further-reading}

- [EIP-20: Estándar de token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [Tokens de OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin: Implementación de ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [ConsenSys: Implementación de ERC-20](https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20.sol)

## Temas relacionados {#related-topics}

- [ERC-721](/developers/docs/standards/tokens/erc-721/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
