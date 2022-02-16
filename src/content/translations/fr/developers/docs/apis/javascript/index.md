---
title: Bibliothèques d'API JavaScript
description: Introduction aux Api clientes Ethereum, qui vous permettent d'interagir avec la blockchain depuis votre application.
lang: fr
sidebar: true
---

Pour qu'une application Web puisse interagir avec la blockchain Ethereum (c'est-à-dire lire les données de la blockchain et/ou envoyer des transactions sur le réseau), elle doit se connecter à un nœud Ethereum.

Dans ce but, chaque client Ethereum implémente la spécification JSON-RPC afin de former un ensemble uniforme de points de terminaison sur lesquels les applications peuvent s'appuyer.

Si vous voulez utiliser JavaScript pour vous connecter à un nœud Ethereum, il est possible d'avoir recours à Vanilla JavaScript, mais plusieurs bibliothèques de commodité existent à l'intérieur même de l'écosystème, ce qui rend les choses beaucoup plus simples. Avec ces bibliothèques, les développeurs peuvent rédiger des méthodes intuitives d'une seule ligne pour initialiser les demandes JSON RPC (pas directement visibles) qui interagissent avec Ethereum.

## Prérequis {#prerequisites}

Il peut être utile de comprendre non seulement en quoi consiste JavaScript, mais aussi la [pile Ethereum](/developers/docs/ethereum-stack/) et les [clients Ethereum](/developers/docs/nodes-and-clients/).

## Pourquoi utiliser une bibliothèque ? {#why-use-a-library}

Les bibliothèques suppriment une grande partie de la complexité de l'interaction directe avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par ex. convertir des ETH en gwei) afin que vous puissiez, en tant que développeur, passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous consacrer aux fonctionnalités uniques de votre application.

## Fonctionnalités d'une bibliothèque {#library-features}

### Se connecter à des nœud Ethereum {#connect-to-ethereum-nodes}

En utilisant des fournisseurs, les bibliothèques vous permettent de vous connecter à Ethereum et de lire ses données, que ce soit sur JSON-RPC, INFURA, Etherscan, Alchemy ou Metamask.

**Exemple Ether**

```js
// Un Web3Provider enveloppe un fournisseur Web3 standard, qui est
// ce que Metamask injecte comme window.ethereum dans chaque page.
const provider = new ethers.providers.Web3Provider(window.ethereum)

// Le plugin Metamask permet également de signer des transactions pour
// envoyer de l'ether et payer pour changer l'état de la blockchain.
// Pour cela, nous avons besoin du signataire du compte...
const signer = provider.getSigner()
```

**Exemple Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// ou
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// changer de fournisseur
web3.setProvider("ws://localhost:8546")
// ou
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Utiliser le fournisseur IPC en node.js
var net = require("net")
var web3 = new Web3("/Users/monutilisateur/Library/Ethereum/geth.ipc", net) // Chemin type mac os
// ou
var web3 = new Web3(
  new Web3.providers.IpcProvider(
    "/Users/monutilisateur/Library/Ethereum/geth.ipc",
    net
  )
) // Chemin type mac os
// sous windows le chemin est : "\\\\.\\pipe\\geth.ipc"
// sous linux le chemin est : "/users/monutilisateur/.ethereum/geth.ipc"
```

Une fois la configuration effectuée, vous pourrez interroger la blockchain pour :

- les numéros de blocs
- le carburant estimé
- les événements du contract intelligent
- l'ID du réseau
- et plus encore...

### Fonctionnalités d'un portefeuille {#wallet-functionality}

Les bibliothèques vous permettent de créer des portefeuilles, gérer vos clés et signer des transactions.

Voici un exemple provenant de la bibliothèque Ethers :

```js
// Créer une instance de portefeuille à partir d'un mnémonique...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromMnemonic(mnemonic)

// ...ou à partir d'une clé privée
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Adresse Promise par le signataire de l'API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Une adresse de portefeuille est aussi disponible de façon synchrone
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Composants cryptographiques internes
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Portefeuille mnémonique
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Remarque : Un portefeuille créé avec une clé privée ne comporte pas
//       de mnémonique (la dérivation l'empêche)
walletPrivateKey.mnemonic
// null

// Signature d'un message
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Signature d'une transaction
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// La méthode de connexion retourne une nouvelle instance du
// portefeuille connecté à un portefeuille du fournisseur
wallet = walletMnemonic.connect(provider)

// Interrogation du réseau
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Envoi d'Ether
wallet.sendTransaction(tx)
```

[Lire les documents complets](https://docs.ethers.io/v5/api/signer/#Wallet)

Une fois la configuration effectuée, vous pourrez :

- créer un compte ;
- envoyer des transactions ;
- signer des transactions ;
- et plus encore...

### Interagir avec les fonctions d'un contrat intelligent {#interact-with-smart-contract-functions}

Les bibliothèques clientes javascript autorisent votre application à appeler des fonctions de contrat intelligent en lisant l'interface binaire-programme (ABI) d'un contrat compilé.

L'ABI explique principalement les fonctions du contrat au format JSON et vous permet de l'utiliser comme un objet JavaScript standard.

Ainsi, le contrat Solidity ci-dessous :

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Donnerait le JSON suivant :

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Cela veut dire que vous pouvez :

- envoyer une transaction vers le contrat intelligent et exécuter sa méthode ;
- faire un appel afin d'estimer le carburant nécessaire pour exécuter une méthode quand exécutée par le EVM ;
- déployer un contrat ;
- et plus encore...

### Fonctions utilitaires {#utility-functions}

Les fonctions utilitaires vous offrent des raccourcis pour améliorer le développement Ethereum.

Les valeurs ETH sont en wei par défaut. 1 ETH = 1 000 000 000 000 000 000 WEI – ça en fait, des chiffres à gérer ! `web3.utils.toWei` convertit l'ether en wei pour vous.

Et dans l'Ethers cela ressemble à ce qui suit :

```js
// Obtenir le solde d'un compte (par l'adresse ou le nom ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Vous devrez souvent formatter la sortie pour l'utilisateur
// qui préfère voir les valeurs en ether (plutôt qu'en wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Fonctions utilitaires Web3js](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#)
- [Fonctions utilitaires Ethers](https://docs.ethers.io/v5/api/utils/)

## Bibliothèques disponibles {#available-libraries}

**Web3.js -** **_Api JavaScript Ethereum _**

- [Documentation](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_Implémentation complète d'un portefeuille Ethereum, et utilitaires en JavaScript et TypeScript_**

- [Documentation](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Protocole permettant d'indexer les données Ethereum et IPFS, et d'exécuter des requêtes sur celles-ci en utilisant GraphQL_**

- [The Graph](https://thegraph.com/)
- [Explorateur Graph](https://thegraph.com/explorer/)
- [Documentation](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_Bibliothèque JS réactive de haut niveau optimisée pour les clients légers_**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Alternative Typescript à Web3.js._**

- [Documentation](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Enveloppe autour de Web3.js avec nouvelles tentatives automatiques et API améliorées._**

- [Documentation](https://docs.alchemyapi.io/documentation/alchemy-web3)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Frameworks de développement](/developers/docs/frameworks/)

## Tutoriels connexes {#related-tutorials}

- [Configurer Web3js pour utiliser la blockchain Ethereum avec JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)_ - Instructions pour installer et intégrer Web3js à votre projet_
- [ Appeler un contrat intelligent à partir de JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _ - À l'aide du jeton DAI, découvrez comment appeler une fonction de contrat en utilisant JavaScript._
- [Envoi des transactions en utilisant Web3 et Alchemy](/developers/tutorials/sending-transactions-using-Web3-and-alchemy/) _ - Procédure étape par étape pour envoyer des transactions depuis le backend._
