---
title: Standard token non fungibile ERC-721
description:
lang: it
sidebar: true
---

## Introduzione {#introduction}

**Cos'è un token non fungibile?**

Un token non fungibile (NFT) è usato per identificare inequivocabilmente qualcosa o qualcuno. Questo tipo di Token è perfetto su piattaforme che offrono oggetti collezionabili, chiavi di accesso, biglietti della lotteria, posti numerati per concerti o eventi sportivi ecc. Questo particolare tipo di token offre possibilità straordinarie quindi si merita uno standard vero e proprio, ed ERC-721 serve proprio per questo!

**Cos'è ERC-721?**

ERC-721 introduce uno standard per NFT, in altre parole questo tipo di token è unico e può avere un diverso valore rispetto a un altro token dello stesso Smart Contract, magari dovuto all'età, alla rarità o ad altro, come il suo aspetto. Cosa? Aspetto?

Sì! Tutti gli NFT hanno una variabile `uint256` chiamata `tokenId`, quindi per i contratti ERC-721 la coppia `contract address, uint256 tokenId` deve essere unica a livello globale. Detto ciò, una dapp può avere un "convertitore" che utilizza `tokenId` come input e restituisce l'immagine di qualcosa come zombie, armi, abilità o teneri gattini.

## Prerequisiti {#prerequisites}

- [Account](/developers/docs/accounts/)
- [Smart Contract](/developers/docs/smart-contracts/)
- [Standard token](/developers/docs/standards/tokens/)

## Corpo {#body}

ERC-721 (Ethereum Request for Comments 721), proposto da William Entriken, dieter Shirley, Jacob Evans e Nastassia Sachs nel gennaio 2018, è uno standard token non fungibile che implementa un'API per token all'interno di Smart Contract.

Fornisce funzionalità ad esempio per il trasferimento di token da un account a un altro, la richiesta del saldo corrente di token di un account, del proprietario di un token specifico e anche la quantità totale di token disponibili sulla rete. Oltre a questo ha anche altre funzionalità, come la possibilità di approvare che una quantità di token di un account possa essere spostata da un account terzo.

Se uno Smart Contract implementa i seguenti metodi ed eventi può essere chiamato contratto token non fungibile ERC-721 e, una volta distribuito, sarà responsabile di tenere traccia dei token creati su Ethereum.

Da [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

#### Metodi {#methods}

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

#### Eventi {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Esempi {#web3py-example}

Vediamo perché uno standard è così importante per semplificare l'ispezione dei contratti token ERC-721 su Ethereum. Ci serve solo la Contract Application Binary Interface (ABI) per creare un'interfaccia per qualsiasi token ERC-721. Come puoi vedere di seguito, useremo un'ABI semplificata per fornire un esempio semplice da capire.

#### Esempio Web3.py {#web3py-example}

Prima di tutto, controlla di avere installato la libreria Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
$ pip install web3
```

```python
from web3 import Web3
from web3.utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# Questa è una Contract Application Binary Interface (ABI) semplificata per un contratto NFT ERC-721.
# Espone solo i metodi balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Viene utilizzata l'ABI Transfer Event per ottenere informazioni sui gattini trasferiti.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Abbiamo bisogno della firma dell'evento per filtrare i registri
event_signature = w3. ha3(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3. oChecksumAddress(ck_token_addr),
    "topics": [event_signature]
})

# Note:
# - 120 blocchi è l'intervallo massimo per il provider CloudFlare
# - Se non hai trovato un evento Transfer puoi provare a ottenere un tokenId all'indirizzo:
# https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
# Fai clic per espandere i registri dell'evento e copiare l'argomento "tokenId"

recent_tx = [get_event_data(tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Incolla "tokenId" qui dal link precedente
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Il contratto CryptoKitties contiene alcuni eventi interessanti oltre a quelli standard.

Diamo un'occhiata a due di questi, `Pregnant` e `Birth`.

```python
# Viene usata l'ABI Pregnant e Birth Events per ottenere informazioni sui nuovi gattini.
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

# Abbiamo bisogno della firma dell'evento per filtrare i registri
ck_event_signatures = [
    w3. ha3(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.sha3(text="Birth(address,uint256,uint256,uint256,uint256)"). ex(),
]

# Ecco un evento Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3. th.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3. oChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[0]]
})

recent_pregnants = [get_event_data(ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Ecco un evento Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_extra_events_abi[1]]
})

recent_births = [get_event_data(ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT più popolari {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) elenca i principali NFT su Ethereum per volume di trasferimento.
- [CryptoKitties](https://www.cryptokitties.co/) è un gioco basato su creature a cui si può dare da mangiare, collezionabili e molto tenere chiamate CryptoKitties.
- [Sorare](https://sorare.com/) è un gioco di calcio fantasy globale in cui si possono collezionare oggetti in edizione limitata e gestire squadre, gareggiando per vincere premi.
- [The Ethereum Name Service (ENS)](https://ens.domains/) offre un modo sicuro e decentralizzato per indirizzare risorse sia all'interno che all'esterno della blockchain utilizzando nomi semplici e leggibili.
- [Unstoppable Domains](https://unstoppabledomains.com/) è un'azienda di San Francisco che crea domini sulle blockchain. I domini delle blockchain sostituiscono gli indirizzi della criptovaluta con nomi facilmente leggibili, che possono essere usati per creare siti web resistenti alla censura.
- [Gods Unchained Cards](https://godsunchained.com/) è un gioco di carte collezionabili sulla blockchain Ethereum che usa gli NFT per dare una proprietà reale alle risorse del gioco.

## Letture consigliate {#further-reading}

- [EIP-721: ERC-721 Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Docs](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 Implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)

## Argomenti correlati {#related-topics}

- [ERC-20](/developers/docs/standards/tokens/erc-20/)
- [ERC-777](/developers/docs/standards/tokens/erc-777/)
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/)
