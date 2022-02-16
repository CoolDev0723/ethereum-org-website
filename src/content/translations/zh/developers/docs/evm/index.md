---
title: 以太机虚拟机 (EVM)
description: 介绍以太坊虚拟机及其与状态、交易和智能合约的关系。
lang: zh
sidebar: true
---

EVM 的物理实例无法像指着一朵云彩或者海浪那样，轻易具体的描述出来，但它确实作为一个单一的实体 _存在_ ，由数以千计运行以太坊客户端的电脑连接在一起构成。

以太坊协议本身的存在仅仅是为了保持这种特殊状态机的连续、不间断和永久的运行。 这是所有以太坊帐户和智能合约赖以存在的环境。 在链中任何给定的区块上，以太坊只有一个“规范”状态，而 EVM 定义了从一个区块计算产生下一个区块新的有效状态的规则。

## 前置要求 {#prerequisites}

对计算机科学中常见术语的基本了解，如[字节](https://wikipedia.org/wiki/Byte)、[内存](https://wikipedia.org/wiki/Computer_memory)和[堆栈](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>)是理解 EVM 所必需的。 熟悉诸如 [哈希函数](https://wikipedia.org/wiki/Cryptographic_hash_function)、[工作量证明](https://wikipedia.org/wiki/Proof_of_work)和 [Merkle 树](https://wikipedia.org/wiki/Merkle_tree)等密码学/区块链概念对理解也很有帮助。

## 从账本到状态机 {#from-ledger-to-state-machine}

通常使用“分布式账簿”的类比来描述像比特币这样的区块链，它使用密码学的基本工具来实现去中心化的货币。 加密货币的行为类似于“正常”货币，这是因为有规则支配着人们可以做什么和不可以做什么来修改账簿。 例如，比特币地址不能花费比之前收到的更多的比特币。 这些规则是比特币和许多其他区块链上所有交易的基础。

虽然以太坊有自己的本机加密货币 (ETH)，遵循几乎完全相同的直观规则，但它也支持更强大的功能：[智能合约](/developers/docs/smart-contracts/)。 对于此更复杂的功能，需要一个更复杂的类比。 以太坊不是分布式账本，而是分布式[状态机](https://wikipedia.org/wiki/Finite-state_machine)。 以太坊的状态是一个大型数据结构，它不仅保存所有帐户和余额，而且还保存一个*机器状态*，它可以根据预定义的一组规则在不同的区块之间进行更改，并且可以执行任意的机器代码。 在区块中更改状态的具体规则由 EVM 定义。

![EVM 组成结构图](../../../../../developers/docs/evm/evm.png) _图表来自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## 以太坊状态转换函数 {#the-ethereum-state-transition-function}

EVM 的行为就像一个数学函数：在给定输入的情况下，它会产生确定性的输出。 因此，将以太坊更正式地描述为具有**状态转换函数**非常有帮助：

```
Y(S, T)= S'
```

给定一个旧的有效状态 `（S）`> 和一组新的有效交易 `（T）`，以太坊状态转换函数 ` Y（S，T）` 产生新的有效输出状态` S'`

### 状态 {#state}

在以太坊的上下文中，状态是一个巨大的数据结构，称为[调整后的 Merkle Patricia Trie](https://eth.wiki/en/fundamentals/patricia-tree)，使所有[帐户](/developers/docs/accounts/)通过哈希链接，并可回溯到存储在区块链上的单个根哈希。

### 交易 {#transactions}

交易是来自帐户的密码学签名指令。 交易分为两种：一种是消息调用交易，另一种是合约创建交易。

合约创建交易会创建一个新的合约帐户，其中包含已编译的 [智能合约](/developers/docs/smart-contracts/anatomy/) 字节码。 每当另一个帐户对该合约进行消息调用时，它都会执行其字节码。

## EVM 说明 {#evm-instructions}

EVM 作为一个[堆栈机](https://wikipedia.org/wiki/Stack_machine)运行，其栈的深度为 1024 个项。 每个项目都是 256 位字，为了便于使用，选择了 256 位加密技术（如 Keccak-256 哈希或 secp256k1 签名）。

在执行期间，EVM 会维护一个瞬态*内存*（作为字可寻址的字节数组），该内存不会在交易之间持久存在。

然而，合约确实包含一个 Merkle Patricia _存储_ trie（作为可字寻址的字数组），该 trie 与帐户和部分全局状态关联。

已编译的智能合约字节码作为许多 EVM [ opcodes ](/developers/docs/evm/opcodes)执行，它们执行标准的堆栈操作，例如 ` XOR`、` AND`、` ADD`、`SUB`等。 EVM 还实现了一些区块链特定的堆栈操作，如 `ADDRESS`、`BALANCE`、`BLOCKHASH` 等。

![表明 EVM 操作需要 Gas 的图表](../../../../../developers/docs/gas/gas.png) _图表改编自[以太坊 EVM 说明](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## EVM 实现 {#evm-implementations}

EVM 的所有实现都必须遵守以太坊黄皮书中描述的规范。

在以太坊的 5 年历史中，EVM 经历了几次修订，并且以各种编程语言完成了 EVM 的多种实现。

所有[以太坊客户端](/developers/docs/nodes-and-clients/#execution-clients)都包含一个 EVM 实现。 此外，还有多个独立的实现方法，包括：

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [eEVM](https://github.com/microsoft/eevm) - _C++_
- [Hyperledger Burrow](https://github.com/hyperledger/burrow) - _Go_
- [hevm](https://github.com/dapphub/dapptools/tree/master/src/hevm) - _Haskell_

## 延伸阅读 {#further-reading}

- [以太坊黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper aka KEVM：K 中的 EVM 语法](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [以太坊虚拟机操作码](https://www.ethervm.io/)
- [Solidity 文档的简短介绍](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)

## 相关主题 {#related-topics}

- [Gas](/developers/docs/gas/)
