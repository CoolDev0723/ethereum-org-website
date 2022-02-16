---
title: Layer 2 Rollups
description: An introduction to the different layer 2 rollup scaling solutions currently being developed by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

Layer 2 is a collective term for solutions designed to help scale your application by handling transactions off the Ethereum Mainnet (layer 1) while taking advantage of the robust decentralized security model of Mainnet. Transaction speed suffers when the network is busy, making the user experience poor for certain types of dapps. And as the network gets busier, gas prices increase as transaction senders aim to outbid each other. This can make using Ethereum very expensive.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/). Implementing scaling solutions such as rollups is an advanced topic as the technology is less battle-tested and continues to be researched and developed.

## Why is layer 2 needed? {#why-is-layer-2-needed}

- Some use-cases, like blockchain games, make no sense with current transaction times.
- It can be unnecessarily expensive to use blockchain applications.
- Any updates to scalability should not be at the expense of decentralization or security – layer 2 builds on top of Ethereum.

## Rollups {#rollups}

Rollups are solutions that perform transaction _execution_ outside the main Ethereum chain (layer 1) but post transaction _data_ on layer 1. As transaction _data_ is on layer 1, rollups are secured by layer 1. Inheriting the security properties of layer 1 while performing execution outside of layer 1 is a defining characteristic of rollups.

Three simplified properties of rollups are:

1. transaction _execution_ outside layer 1
2. data or proof-of-transactions is on layer 1
3. a rollup smart contract in layer 1 that can enforce correct transaction execution on layer 2 by using the transaction data on layer 1

Rollups require "operators" to stake a bond in the rollup contract. This incentivises operators to verify and execute transactions correctly.

**Useful for:**

- reducing fees for users
- open participation
- fast transaction throughput

There are two types of rollups with different security models:

- **Optimistic rollups**: assumes transactions are valid by default and only runs computation, via a [**fraud proof**](/glossary/#fraud-proof), in the event of a challenge
- **Zero-knowledge rollups**: runs computation off-chain and submits a [**validity proof**](/glossary/#validity-proof) to the chain

### Optimistic rollups {#optimistic-rollups}

Optimistic rollups sit in parallel to the main Ethereum chain on layer 2. They can offer improvements in scalability because they don't do any computation by default. Instead, after a transaction, they propose the new state to Mainnet or "notarise" the transaction.

With Optimistic rollups, transactions are written to the main Ethereum chain as `calldata`, optimising them further by reducing the gas cost.

As computation is the slow, expensive part of using Ethereum, Optimistic rollups can offer up to 10-100x improvements in scalability dependent on the transaction. This number will increase even more with the introduction of [shard chains](/upgrades/shard-chains) as more data will be available if a transaction is disputed.

#### Disputing transactions {#disputing-transactions}

Optimistic rollups don't compute the transaction, so there needs to be a mechanism to ensure transactions are legitimate and not fraudulent. This is where fraud proofs come in. If someone notices a fraudulent transaction, the rollup will execute a fraud-proof and run the transaction's computation, using the available state data. This means you may have longer wait times for transaction confirmation than a ZK-rollup because the transaction could get challenged.

![Diagram showing what happens when a fraudulent transaction occurs in an Optimistic rollup in Ethereum](./optimistic-rollups.png)

The gas you need to run the computation of the fraud proof is even reimbursed. Ben Jones from Optimism describes the bonding system in place:

"_anyone who might be able to take an action that you would have to prove fraudulent to secure your funds requires that you post a bond. You basically take some ETH and lock it up and you say "Hey, I promise to tell the truth"... If I don't tell the truth and fraud is proven, this money will be slashed. Not only does some of this money get slashed but some of it will pay for the gas that people spent doing the fraud proof_"

So you can see the incentives: participants get penalized for conducting fraud and reimbursed for proving fraud.

#### Pros and cons {#optimistic-pros-and-cons}

| Pros                                                                                                             | Cons                                                                        |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Anything you can do on Ethereum layer 1, you can do with Optimistic rollups as it's EVM and Solidity compatible. | Long wait times for on-chain transaction due to potential fraud challenges. |
| All transaction data is stored on the layer 1 chain, meaning it's secure and decentralized.                      | An operator can influence transaction ordering.                             |

#### A visual explanation of optimistic rollups {#optimistic-video}

Watch Finematics explain optimistic rollups:

<YouTube id="7pWxCklcNsU" start="263" />

#### Use Optimistic rollups {#use-optimistic-rollups}

Multiple implementations of Optimistic rollups exist that you can integrate into your dapps:

- [Arbitrum](https://arbitrum.io/)
- [Optimism](https://optimism.io/)
- [Boba](https://boba.network/)
- [Fuel Network](https://fuel.sh/)
- [Cartesi](https://cartesi.io/)

### Zero-knowledge rollups {#zk-rollups}

**Zero-knowledge rollups (ZK-rollups)** bundle (or "roll-up") hundreds of transfers off-chain and generate a cryptographic proof. These proofs can come in the form of SNARKs (succinct non-interactive argument of knowledge) or STARKs (scalable transparent argument of knowledge). SNARKs and STARKs are known as validity proofs and get posted to layer 1.

The ZK-rollup smart contract maintains the state of all transfers on layer 2, and this state can only be updated with a validity proof. This means that ZK-rollups only need the validity proof instead of all transaction data. With a ZK-rollup, validating a block is quicker and cheaper because less data is included.

With a ZK-rollup, there are no delays when moving funds from layer 2 to layer 1 because a validity proof accepted by the ZK-rollup contract has already verified the funds.

Being on layer 2, ZK-rollups can be optimised to reduce transaction size further. For instance, an account is represented by an index rather than an address, which reduces a transaction from 32 bytes to just 4 bytes. Transactions are also written to Ethereum as `calldata`, reducing gas.

#### Pros and cons {#zk-pros-and-cons}

| Pros                                                                                                              | Cons                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Faster finality time since the state is instantly verified once the proofs are sent to the main chain.            | Some don't have EVM support.                                                                          |
| Not vulnerable to the economic attacks that [Optimistic rollups](#optimistic-pros-and-cons) can be vulnerable to. | Validity proofs are intense to compute – not worth it for applications with little on-chain activity. |
| Secure and decentralized, since the data that is needed to recover the state is stored on the layer 1 chain.      | An operator can influence transaction ordering                                                        |

#### A visual explanation of ZK-rollups {#zk-video}

Watch Finematics explain ZK-rollups:

<YouTube id="7pWxCklcNsU" start="406" />

#### Use ZK-rollups {#use-zk-rollups}

Multiple implementations of ZK-rollups exist that you can integrate into your dapps:

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs zkSync](https://zksync.io/)
- [Aztec 2.0](https://aztec.network/)
- [Polygon Hermez](https://hermez.io/)
- [zkTube](https://zktube.io/)

## Hybrid solutions {#hybrid-solutions}

Hybrid solutions exist that combine the best parts of multiple layer 2 technologies, and may offer configurable trade-offs.

### Use hybrid solutions {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## Further reading {#further-reading}

- [An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Optimistic Rollups vs ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Zero-Knowledge Blockchain Scalability](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Why rollups + data shards are the only sustainable solution for high scalability](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Ethereum-powered ZK-Rollups: World Beaters](https://hackmd.io/@canti/rkUT0BD8K)

**ZK-rollups**

- [What Are Zero-Knowledge Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub on zk-rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [STARKs vs SNARKs] (https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)

**Optimistic rollups**

- [Everything you need to know about Optimistic Rollup](https://research.paradigm.xyz/rollups)
- [EthHub on optimistic rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [The Essential Guide to Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [How does Optimism's Rollup really work?](https://research.paradigm.xyz/optimism)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Hybrid solutions**

- [Adding Hybrid PoS-Rollup Sidechain to Celer’s Coherent Layer-2 Platform on Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [Volitions: best of all worlds](https://polynya.medium.com/volitions-best-of-all-worlds-cfd313aec9a8)

**Videos**

- [Rollups - The Ultimate Ethereum Scaling Strategy?](https://youtu.be/7pWxCklcNsU)

_Know of a community resource that helped you? Edit this page and add it!_
