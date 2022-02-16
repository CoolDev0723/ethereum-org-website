---
title: 数据和分析学
description: 如何获取在链分析和数据以用于您的 dapps。
lang: zh
sidebar: true
---

## 介绍 {#Introduction}

随着网络利用率不断提高，链上数据中将有越来越多的宝贵信息。 随着数据量的迅速增加，计算和汇总此信息以报告或驱动一个 dApp 可能变成很费时间和体力的过程。

利用现有数据提供商可以加快发展，产生更准确的结果，并减少正在进行的维护工作。 这将使一个团队能够集中精力处理试图在项目中提供的核心功能。

## 前提条件 {#prerequisites}

您应该理解[区块浏览器](/developers/docs/data-and-analytics/block-explorers/) 的基本概念，以便更好地理解在数据分析环境中使用它们。 此外，熟悉[索引](/glossary/#index)概念，以了解它们给系统设计带来的好处。

就架构基础而言，也要从理论上了解 [API](https://www.wikipedia.org/wiki/API) 和 [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) 是什么。

## Graph {#the-graph}

[Graph 网络](https://thegraph.com/)是用于组织区块链数据的去中心化索引协议。 通过 Graph 网络，开发者可以建立完全在公共基础设施上运行的无服务器应用程序，而不是建立和管理链外和集中的数据存储来聚合链上数据。

使用 [GraphQL](https://graphql.org/)，开发人员可以查询任何管理的开放 API（被称为子图表），以获得必要的信息来驱动他们的应用程序。 通过查询这些索引子图表，报告和 dApp 不仅能够提高性能和可扩展性，而且能够通过网络共识准确地构建。 当网络中新增改进和/或子图表时，您的项目可以快速迭代，利用这些增强功能。

## 区块浏览器 {#block-explorers}

许多[区块浏览器](/developers/docs/data-and-analytics/block-explorers/)提供 [RESTfify](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) 网关，它将使开发者可以看见区块上的实时数据、交易、矿工，帐户和其他链上活动。

开发者然后可以处理和转换此数据，让他们的用户有独特的洞察力并与[区块链](/glossary/#blockchain)交互。

## 延伸阅读 {#further-reading}

- [Graph 网络概览](https://thegraph.com/docs/network#overview)
- [Graph 查询实战](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan 上的 API 代码示例](https://etherscan.io/apis#contracts)
