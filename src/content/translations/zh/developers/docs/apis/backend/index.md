---
title: 后端 API 库
description: 以太坊客户端应用程序接口 (API) 的介绍，使您能够从您的应用程序中与区块链进行交互。
lang: zh
sidebar: true
---

为了使软件应用程序能够与以太坊区块链进行交互（例如：读取区块链数据或发送交易信息到网络），软件必须连接到以太坊节点。

为此目的，每个以太坊客户端都执行 [JSON-RPC](/developers/docs/apis/json-rpc/) 规范，所以应用程序可以依赖统一的[端点](/developers/docs/apis/json-rpc/#json-rpc-methods)集。

如果您想使用特定的编程语言去连接以太坊的节点，您可自行选择，但是在社区中已有几个方便的库，可以更方便地实现应用程序与以太坊的连接。 通过这些库，开发者可以方便地写下直观的一行函数来初始化（后端的）JSON RPC 请求并用于与以太坊进行交互。

## 前置要求 {#prerequisites}

了解[以太坊堆栈](/developers/docs/ethereum-stack/)和[以太坊客户端](/developers/docs/nodes-and-clients/)可能会对您有所帮助。

## 为什么要使用库？ {#why-use-a-library}

这些库降低了与一个以太坊节点交互的复杂性。 它们还提供实用的函数（例如：将 ETH 转化为 Gwei），而作为开发者，您可以花费更少的时间来处理以太坊客户端的复杂问题，从而将更多的时间集中于处理您的应用程序的独特功能。

## 可用的库 {#available-libraries}

**Alchemy -** **_以太坊开发平台_**

- [alchemy.com](https://www.alchemy.com/)
- [相关文档](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_以太坊网络应用程序接口 (Web API)_**

- [blockcypher.com](https://www.blockcypher.com/)
- [相关文档](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_以太坊 API 即服务。_**

- [infura.io](https://infura.io)
- [相关文档](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare 以太坊网关。**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_JSON-RPC API 用于访问以太坊主网和测试网。_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [相关文档](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_运行您自己的以太坊 API 服务以同时支持 ETH 和 ETC。_**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_共享及专用的以太坊节点即服务。_**

- [chainstack.com](https://chainstack.com)
- [相关文档](https://docs.chainstack.com)

**QuikNode -** **_区块链开发者平台。_**

- [quiknode.io](https://quiknode.io)

**Python Tooling -** **_通过 Python 进行以太坊交互的各种库。_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py 聊天室](https://gitter.im/ethereum/web3.py)

**web3j -** **_以太坊的 Java/Android/Kotlin/Scala 集成库。_**

- [GitHub](https://github.com/web3j/web3j)
- [相关文档](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_开源软件，提供以太坊和以太坊经典 API 的服务。_**

- [rivet.cloud](https://rivet.cloud)
- [相关文档](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_区块链的开源 .NET 集成库。_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [相关文档](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**QuikNode -** **_终极区块链开发平台。_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [相关文档](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

## 延伸阅读 {#further-reading}

_还有哪些社区资源对您有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [开发框架](/developers/docs/frameworks/)

## 相关教程 {#related-tutorials}

- [设置 Web3js 并在 Javascript 中使用以太坊区块链](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _关于在您的项目中设置 web3.js 的说明。_
- [在 JavaScript 中调用智能合约](/developers/tutorials/calling-a-smart-contract-from-javascript/) _使用 DAI token，从而使用 JavaScript 调用合约函数。_
