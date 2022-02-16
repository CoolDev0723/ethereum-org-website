---
title: 设置 web3.js 以用 JavaScript 操作 Ethereum 区块链。
description: 如何使用智能合约与使用 Solidity 语言的代币进行交互
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: 初学者
lang: zh
sidebar: true
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教程中，我们将了解如何开始使用 [web3.js](https://web3js.readthedocs.io/) 与以太坊区块链进行交互。 Web3.js 可用于前端和后端，从区块链读取数据或进行交易，甚至部署智能合约。

第一步是将 web3.js 加入到您的项目中。 要在网页中使用它，您可以使用 JSDeliver 等 CDN 直接导入库。

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

如果您更喜欢在后端或使用 build 的前端项目中安装库，可以使用 npm 进行安装：

```bash
npm install web3 --save
```

然后将 Web3.js 导入到 Node.js 脚本或 Browserify 前端项目，您可以使用下面的 JavaScript 代码行：

```js
const Web3 = require("web3")
```

现在我们在项目中加入了库，我们需要对其进行初始化。 如果您的项目需要能够与区块链通信。 大部分以太坊库通过 RPC 的调用与[节点](/developers/docs/nodes-and-clients/)进行通信。 为了启动我们的 web3 服务提供器，我们会实例化一个 Web3 实例，将服务提供器的 URL 作为构造函数传递。 如果您有一个节点或 [ganache 实例在您的计算机上运行](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)，它看起来将是这样：

```js
const web3 = new Web3("http://localhost:8545")
```

如果您想直接访问托管节点，您可以使用 Infura 或 [Cloudfare](https://cloudflare-eth.com/) 提供的免费节点：

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

为了测试我们是否正确配置了 web3 实例，我们将尝试使用 `getBlockNumber` 函数检索最新的区块编号。 此函数接受回调作为参数，并以整数形式返回区块编号。

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

如果您执行这个程序，它只会打印最新的区块编号：区块链的顶部。 您还可以使用 await/async 函数调用来避免在代码中的嵌套回调：

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

您可以在[官方 web3 文档](https://web3js.readthedocs.io/en/v1.2.6/web3-eth.html#)中查看 web3 实例上可用的所有函数。

大多数 Web3 库都是异步的，因为在后台，该库对返回结果的节点进行 JSON RPC 调用。

<Divider />

如果您在浏览器中运行， 一些钱包直接注入一个 web3 实例，并且您应该尽可能地尝试使用它，特别是如果您计划与用户的以太坊地址交互以进行交易。

下面是检测 Metamask 钱包是否可用的代码段，如果可用，请尝试启用它。 稍后它将允许您读取用户的余额，并使它们能够验证您想让它们在以太坊区块链上进行的交易：

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Acccounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

像 [Ethers.js](https://docs.ethers.io/ethers.js/html/) 这样的 web3.js 的替代品确实存在，但我们将把所有 JavaScript 教程都集中在 web3.js 上，因为它是在浏览器中与以太坊交互的官方库。 在下一个教程中，我们将了解[如何轻松监听区块链上的新传入区块并查看它们包含的内容](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)。
