---
title: 面向 Python 开发者的以太坊资源
description: 学习如何使用并通过基于 Python 的项目及工具参与以太坊的开发
lang: zh
sidebar: true
incomplete: true
---

<div class="featured">学习如何使用并通过基于 Python 的项目及工具参与以太坊的开发</div>

使用以太坊来创建去中心化应用程序 (或称“dapp”)，发挥加密货币和区块链技术的优势。 这些 dapp 可以是值得信赖的，也即一旦被部署到以太坊上，它们将总是按程序运行。 这些应用程序可以控制数字资产，以便创造新的金融应用； 它们可以是去中心化的，也即没有任何单一实体或个人能够控制它们，而且它们几乎是不可能被审查的。

## 智能合约和 Solidity 语言入门 {#getting-started-with-smart-contracts-and-solidity}

**迈出第一步，将 Python 与以太坊集成**

需要更基础的入门知识？ 请查看 [ethereum.org/learn](/learn/) 或者 [ethereum.org/developers](/developers/)。

- [区块链详解](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [理解智能合约](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [编写您的第一个智能合约](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [学习如何编写和部署 Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初学者文章 {#beginner-articles}

- [以太坊开发者指南 (Python)](https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/)
- [基于 Vyper 的智能合约简介](https://kauri.io/#collections/Getting%20Started/an-introduction-to-smart-contracts-with-vyper/)
- [使用 Python 和 Brownie 部署您自己的 ERC20 令牌](https://betterprogramming.pub/python-blockchain-token-deployment-tutorial-create-an-erc20-77a5fd2e1a58)
- [如何使用 Python Flask 开发以太坊合约？](https://medium.com/coinmonks/how-to-develop-ethereum-contract-using-python-flask-9758fe65976e)
- [Web3.py 简介 ·面向 Python 开发者的以太坊](https://www.dappuniversity.com/articles/web3-py-intro)
- [如何通过 Python 和 web3.py 调用智能合约函数？](https://stackoverflow.com/questions/57580702/how-to-call-a-smart-contract-function-using-python-and-web3-py)

## 面向中等程度用户的文章 {#intermediate-articles}

- [面向 Python 程序员的去中心化应用程序开发](https://levelup.gitconnected.com/dapps-development-for-python-developers-f52b32b54f28)
- [创建 Python 以太坊接口：第 1 部分](https://hackernoon.com/creating-a-python-ethereum-interface-part-1-4d2e47ea0f4d)
- [基于 Python 的以太坊智能合约开发：完整（入门）教程](https://hackernoon.com/ethereum-smart-contracts-in-python-a-comprehensive-ish-guide-771b03990988)
- [使用 Brownie 和 Python 部署智能合约](https://dev.to/patrickalphac/using-brownie-for-to-deploy-smart-contracts-1kkp)
- [使用 Brownie 在 OpenSea 上创建 NFT](https://www.freecodecamp.org/news/how-to-make-an-nft-and-render-on-opensea-marketplace/)

## 面向高等程度用户的使用模式 {#advanced-use-patterns}

- [使用 Python 编译、部署和调用以太坊智能合约](https://yohanes.gultom.id/2018/11/28/compiling-deploying-and-calling-ethereum-smartcontract-using-python/)
- [使用 Slither 分析 Solidity 智能合约](https://kauri.io/#collections/DevOps/analyze-solidity-smart-contracts-with-slither/#analyze-solidity-smart-contracts-with-slither)
- [Blockchain Fintech 教程：使用 Python 借贷和借贷](https://blog.chain.link/blockchain-fintech-defi-tutorial-lending-borrowing-python/)

## Python 项目和工具 {#python-projects-and-tools}

### 活跃：

- [Web3.py](https://github.com/ethereum/web3.py) - _用于与以太坊交互的 Python 库_
- [Brownie](https://github.com/eth-brownie/brownie) - _一个用于部署、测试和与以太坊智能合约交互的 Python 框架_
- [Vyper](https://github.com/ethereum/vyper/) - _一个具有 Python 风格的以太坊智能合约编程语言_
- [py-evm](https://github.com/ethereum/py-evm) - _以太坊虚拟机的实现_
- [Mamba](https://mamba.black) - _一个用 Vyper 语言编写、编译和部署智能合约的框架_
- [eth-tester](https://github.com/ethereum/eth-tester) - _用于测试基于以太坊应用程序的工具_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _使用以太坊相关代码库的实用函数工具_
- [py-solc-x](https://pypi.org/project/py-solc-x/) - _Python 封装的 solidity 0.5.x 编译器_
- [py-wasm](https://github.com/ethereum/py-wasm) - _Web 汇编解释器的 Python 实现_
- [pydevp2p](https://github.com/ethereum/pydevp2p) - _P2P 协议栈的 Python 实现_
- [pymaker](https://github.com/makerdao/pymaker) - _Maker 合约的 Python API _

### 已归档/不再维护：

- [Trinity](https://github.com/ethereum/trinity) - _以太坊的 Python 客户端_

想要获取更多的资源？ 请查看 [ethereum.org/developers](/developers/)。

## 使用 Python 工具的项目

以下基于以太坊的项目使用本页提到的工具。 相关的开源代码库可作为一个很好的参考，例如代码和最佳做法。

- [Yearn Finance](https://yearn.finance/) 和 [Yearn Vault Contracts 库](https://github.com/yearn/yearn-vaults)
- [Curve](https://curve.fi/) 和 [Curve 智能合约库](https://github.com/curvefi/curve-contract)
- [BadgerDAO](https://badger.com/) 和 [使用 Brownie 工具链的智能合约](https://github.com/Badger-Finance/badger-system)

## Python 社区贡献者 {#python-community-contributors}

[以太坊 Python Discord 社区](https://discord.gg/9zk7snTfWe)是一个迅速发展壮大的社区，专门用于讨论上述任何项目和相关主题的资源。

## 其他汇总列表 {#other-aggregated-lists}

维基百科中关于 Vyper 的[可靠资源列表](https://github.com/ethereum/vyper/wiki/Vyper-tools-and-resources)
