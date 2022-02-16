---
title: ERC-20 Token Szabvány
description:
lang: hu
sidebar: true
---

## Bevezetés {#introduction}

**Mi is az a token?**

A tokenek gyakorlatilag bármit képviselhetnek az Ethereumon:

- reputációs pontokat egy online platformon
- egy karakter képességeit egy játékban
- lottó szelvényeket
- pénzügyi eszközöket, mint például részesedést egy cégben
- fiat valutát, mint az USD
- egy uncia aranyat
- és még sok más...

Egy ilyen erős Ethereum tulajdonságot egy szintén erős szabványnak kell kezelnie, igaz? És pontosan itt jön képbe az ERC-20 szerepe! Ez a szabvány lehetővé teszi a fejlesztők számára, hogy olyan token alkalmazásokat fejlesszenek, amelyek együttműködnek más termékekkel és szolgáltatásokkal.

**Mi az az ERC-20?**

Az ERC-20 bevezeti a Felcserélhető Token szabványt, vagyis a tokeneknek meg van az a tulajdonságuk, hogy minden egyes token pontosan ugyanaz (típusban és értékben), mint egy másik token. Például egy ERC-20 token úgy viselkedik, mint az ETH, vagyis 1 token egyenlő és egyenlő is marad az összes többi tokennel.

## Előfeltételek {#prerequisites}

- [Számlák](/developers/docs/accounts)
- [Okosszerződések](/developers/docs/smart-contracts/)
- [Token szabványok](/developers/docs/standards/tokens/)

## Törzs {#body}

Az ERC-20 (Ethereum Request for Comments 20), melyet Fabian Vogelsteller javasolt 2015 novemberében, egy Token Szabvány, mely egy API-t implementál a tokenek számára az okosszerződéseken belül.

Olyan funkcionalitásokat tartalmaz, mint a token átutalás egyik számláról a másikra vagy a token jelenlegi egyenlege az adott számlán valamint a teljes elérhető token mennyiség a hálózaton. Emellett vannak más más funkciók is, mint például annak jóváhagyása, hogy egy harmadik fél számlája elkölthessen egy bizonyos mennyiségű tokent az adott számláról.

Ha egy okosszerződés implementálja a következő metódusokat és eseményeket, akkor egy ERC-20 token szerződésnek lehet nevezni, és a telepítés után a létrejött tokenek számontartásáért lesz felelős az Ethereumon.

Az [EIP-20-ból](https://eips.ethereum.org/EIPS/eip-20):

#### Metódusok {#methods}

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

#### Események {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Példák {#web3py-example}

Nézzük meg, miért olyan fontos egy szabvány, hogy egyszerűbbé tegye számunkra azt, hogy bármely ERC-20 token szerződést megtekinthessük az Ethereumon. Csak a szerződés Application Binary Interface-ére (ABI) lesz szükség, hogy egy felületet készítsünk bármely ERC-20 tokennek. Ahogy lentebb látni fogod, egy egyszerűsített ABI-t használunk, hogy egy egyszerűbb példával éljünk.

#### Web3.py példa {#web3py-example}

Először győződj meg arról, hogy a [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python könyvtár telepítve van:

```
$ pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Ez egy ERC-20 token szerződés egyszerűsített Application Binary Interface-e (ABI).
# Csak a következő metódusokat tartalmazza: balanceOf(address), decimals(), symbol() és totalSupply()
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

## További olvasnivaló {#further-reading}

- [EIP-20: ERC-20 Token Szabvány](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokenek](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 Implementáció](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [ConsenSys - ERC-20 Implementáció](https://github.com/ConsenSys/Tokens/blob/master/contracts/eip20/EIP20.sol)

## Kapcsolódó témák {#related-topics}

- [ERC-721](/developers/docs/standards/tokens/erc-721/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
