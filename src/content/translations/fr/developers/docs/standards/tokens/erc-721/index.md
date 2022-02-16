---
title: Norme de jeton non fongible ERC-721
description:
lang: fr
sidebar: true
---

## Introduction {#introduction}

**Qu'est-ce qu'un jeton non fongible (NFT) ?**

Un NFT est utilisé pour identifier quelque chose ou quelqu'un d'une façon unique. Ce type de jeton est parfait pour une utilisation sur les plateformes proposant des objets de collection, clés d'accès, billets de loterie, sièges numérotés pour concerts et matchs sportifs, etc. Ce type spécial de jeton ayant des possibilités incroyables, il mérite donc une norme adéquate, comme l'ERC-721.

**Qu'est-ce que l'ERC-721 ?**

L'ERC-721 introduit une norme pour les NFT. En d'autres termes, ce type de jeton est unique et peut avoir une valeur différente de celle d'un autre jeton du même contrat intelligent, peut-être en raison de son âge, de sa rareté ou du visuel qui lui est associé. Visuel ? Vous avez dit visuel ?

Oui ! Tous les NFT ont une variable `uint256` appelée `tokenId`. Pour tout contrat ERC-721, la paire `address, uint256 tokenId` du contrat doit être globalement unique. Une DApp peut avoir un "convertisseur" qui utilise le `tokenId` comme entrée et affiche une image de quelque chose de cool, comme des zombies, des armes, des compétences ou de superbes chats !

## Prérequis {#prerequisites}

- [Comptes](/developers/docs/accounts/)
- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Normes de jetons](/developers/docs/standards/tokens/)

## Présentation {#body}

La demande de commentaires ERC-721, proposée par William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs en janvier 2018, est une norme de jeton non fongible qui implémente une API pour les jetons des contrats intelligents.

Elle fournit des fonctionnalités permettant de transférer des jetons d'un compte à un autre, ou d'obtenir le solde actuel d'un compte en jetons, le nom du propriétaire d'un jeton spécifique et le nombre total de jetons disponibles sur le réseau. En plus de celles-ci, il en existe d'autres pour, par exemple, approuver que des jetons provenant d'un compte soient déplacés par un compte tiers.

Si un contrat intelligent implémente les méthodes et les événements suivants, il peut être nommé Contrat de jeton non fongible ERC-721 et, une fois déployé, sera responsable d'effectuer un suivi des jetons créés sur Ethereum.

De [EIP-721](https://eips.ethereum.org/EIPS/eip-721) :

#### Méthodes {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

#### Événements {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Exemples {#web3py-example}

Voyons comment une norme peut être si importante pour nous faciliter le contrôle de tout contrat de jeton ERC-721 sur Ethereum. Nous avons juste besoin de l'interface binaire-programme (ABI) du contrat pour créer une interface à n'importe quel jeton ERC-721. Comme vous pouvez le voir ci-dessous, nous utiliserons une ABI simplifiée, pour en faire un exemple de faible friction.

#### Exemple Web3.py {#web3py-example}

Pour commencer, assurez-vous d'avoir installé la bibliothèque Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
$ pip install web3
```

```python
from web3 import Web3
from web3.utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
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
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.toChecksumAddress(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Using the Transfer Event ABI to get info about transferred Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.sha3(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - 120 blocks is the max range for CloudFlare Provider
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument

recent_tx = [get_event_data(tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Le contrat CryptoKitties comporte des événements intéressants en dehors des événements standards.

Vérifions deux d'entre eux, `Pregnant` et `Birth`.

```python
# Using the Pregnant and Birth Events ABI to get info about new Kitties.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.sha3(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.sha3(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[0]]
})

recent_pregnants = [get_event_data(ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[1]]
})

recent_births = [get_event_data(ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT populaires {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) répertorie les NFT les plus importants sur Ethereum en termes de volume de transferts.
- [CryptoKitties](https://www.cryptokitties.co/) est un jeu axé sur des créatures de collection adorables dont on peut faire l'élevage et que nous appelons CryptoKitties.
- [Sorare](https://sorare.com/) est un jeu de football mondial où vous pouvez collectionner des objets en édition limitée, gérer vos équipes et concourir pour gagner des prix.
- [Ethereum Name Service (ENS)](https://ens.domains/) offre un moyen sécurisé et décentralisé d'adresser des ressources à la fois sur et hors de la blockchain en utilisant des noms simples et lisibles.
- [Unstoppable Domains](https://unstoppabledomains.com/) est une société basée à San Francisco, qui construit des domaines sur des blockchains. Les domaines de blockchains remplacent les adresses des cryptomonnaies par des noms lisibles et peuvent être utilisés pour activer des sites Web résistants à la censure.
- [Gods Unchained Cards](https://godsunchained.com/) est un jeu de cartes à collectionner (JCC) de la blockchain Ethereum, qui utilise des NFT pour apporter une vraie propriété aux actifs en jeu.

## Complément d'information {#further-reading}

- [EIP-721: ERC-721 Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Docs](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implémentation ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)

## Sujets connexes {#related-topics}

- [ERC-20](/developers/docs/standards/tokens/erc-20/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
