---
title: 在以太坊主网络上的企业
description: 有关公共以太坊区块链上的企业应用的指南、文章和工具
lang: zh
sidebar: true
---

# 企业以太坊主网络 {#ethereum-for-enterprise}

区块链应用程序有助于企业：

- 增加信任，降低企业之间协调的成本
- 提高业务网络的帐户属性及运营效率
- 发现新的商业模式和创造价值的机会
- 提高组织未来的竞争力

企业级的区块链应用可以建立在以太坊[主网](/glossary/#mainnet)或基于以太坊技术的私有链上。 详见[企业级私有以太坊](/enterprise/private-ethereum/)。

## 以太坊主网与私有链 {#private-vs-public}

以太坊主网是唯一的。 建立在主网上的应用程序能够相互调用，类似于在互联网上建立的应用程序能够相互连接，充分发挥区块链去中心化的潜力。

许多企业和财团已经为基于以太坊技术的特定应用程序部署了私人的、需要许可的区块链。

### 主要区别 {#key-differences}

- 区块链安全/不可变性——区块链能否抵制被篡改是由其协商一致性的算法决定的。 以太网主网的安全是由世界各地的个人和矿工管理的数千个独立节点间的交互保证的。 私有链通常有少数几个节点，由一个或几个组织控制。 这些节点可以被严格地控制，但少数节点重写链上信息或进行欺诈性交易的行为必须受到惩罚。
- 性能——由于私有的以太坊可能使用具有特殊硬件要求和不同共识算法的高性能节点，例如 POA 等。它们可能在基准层（第一层）实现较高的交易吞吐量。 在以太网主网上，使用 [Layer 2 解决方案](/developers/docs/scaling/layer-2-rollups/) 可以实现高吞吐量。
- 成本——经营私有链的成本主要是建立和管理这条链所花费的精力及运行它的服务器。 虽然与以太网连接没有成本，但每笔交易都有 gas 成本，必须在 Ether 支付。 目前正在开发交易转发器（又名 gas 站），以消除最终用户甚至企业在交易中直接使用 Ether 的必要性。 一些[分析](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf)显示，在以太坊主网上运行应用程序的总成本可能低于运行私有链。
- 节点权限——只有授权的节点可以加入私有链。 任何人都可以在以太坊主链上设置一个节点。
- 隐私——访问写入私有链的数据可以通过限制访问网络来控制，并更加细粒度地进行访问控制和私有交易。 任何人都可以查看写入到主网一层的所有数据，所以敏感信息应该脱链存储、传输或者加密。 一些实现了以上设想的设计模式已经出现（如 Baseline、Aztec），以及能够保持数据分割的二层解决方案。

### 为什么要在以太坊主网上开发 {#why-build-on-ethereum-mainnet}

企业从 2016 年左右开始使用区块链技术，当时已经有了 Hyperledger、Quorum 和 Corda 项目。 最初的重点主要放在私有企业级区块链上。但从 2019 年开始，人们对商业应用程序在公共与私有区块链上的思考发生了转变。 福雷斯特进行的[调查](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf)显示，“调查答卷人... 看看这个潜力，75% 的人说他们可能会在未来使用公链，将近三分之一的人说他们很可能”。 EY’s Paul Brody 曾经[谈到](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668)有关在以太坊主链上进行构建的优点。其中（根据不同的应用）包括了更强的安全性/不可更改性、透明、低成本及方便与其他主链上的应用交互（网络效应）。 企业之间分享一个共同的参照基准，可以避免不必要地产生无数孤立的节点，它们不能相互沟通、分享或同步信息。

公链另一个引人注意的发展是[第二层](/developers/docs/scaling/layer-2)。 第二层主要是一种可伸缩性技术类别，它提高了公共链上的吞吐量。 但第二层解决方案也可以[解决一些其他问题。这些问题正是当初企业开发者在过去选择私有链的原因](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/)。

“Baseline 协议”是一个关键项目，它定义了一项协议，使企业之间能够进行保密和复杂的合作而不会在链上留下任何敏感数据。 它在 2020 年取得了重大的[进展](https://www.oasis-open.org/2020/08/26/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise/)。

## 企业开发者资源 {#enterprise-developer-resources}

### 组织 {#organizations}

不同组织为使以太坊企业级应用合作更便利作出了一些努力：

- [企业以太坊联盟（Enterprise Ethereum Alliance, EEA）](https://entethalliance.org/) EEA 旨在让各组织能够在其日常业务中采用和使用以太坊技术。 它让以太坊的生态系统可以找到新的商业机会，推进工业界的采用，并让参与者之间可以相互学习与合作。 EEA 的主网工作组是在公共以太坊主机上建设的企业代表的协调中心，以及希望支持他们的以太坊社区成员。
- [以太坊 OASIS 开放项目（Ethereum OASIS Open Project）](https://github.com/ethereum-oasis/oasis-open-project) 以太坊 OASIS 开放项目是一个 OASIS 开放项目，它为不同的利益攸关方提供了一个中立的论坛，以高质量地规范以太坊长期稳定性、交互性并使其易于集成。 该项目打算制定明确、开放标准、高质量的文档和共同的测试套件，以促进以太坊协议的改进。
- [Baseline 项目](https://www.baseline-protocol.org/) Baseline 协议是一个开放源码倡议，它结合了加密方面，发送消息和区块链的进步，通过公共以太坊主网以低成本的方式提供安全和私人的业务流程。 该协议使企业之间能够进行保密和复杂的合作，而不会在链上留下任何敏感的数据。 Baseline 项目是以太坊 OASIS 开放项目的一个次级项目，由 Baseline 技术指导委员会协调。

### 产品和服务 {#products-and-services}

- [Alchemy](https://www.alchemy.com/) _ 提供了 API 服务和工具，用于构建和监控以太坊上的应用程序_
- [Blockapps](https://blockapps.net/) _通过部署企业级以太坊协议、工具和 API 形成 STRATO 平台_
- [Chainstack](https://chainstack.com/) _主网和测试网以太坊基础设施托管在公共& 分开的客户云中_
- [ConsenSys](https://consensys.net/)_ 为以太坊上的开发提供了一系列的工具和产品，同时还包括了咨询和自定义开发服务_
- [Envision Blockchain](https://envisionblockchain.com/)_ 向专注于以太坊主网的企业提供咨询和开发服务_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _通过在您信任的商业伙伴网络中签发 RFQ、合同、订单和发票提供了一个采购流程_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _ 遵守 Apache 2.0 开源许可并用 Java 编写的开源以太坊客户端_
- [Infura](https://infura.io/) _对以太坊和 IPFS 网络的可调用的 API 访问_
- [Provide](https://provide.services/) _为 Enterprise Web3 应用程序提供基础架构和 API_
- [Unibright](https://unibright.io/) _一个拥有 20 多年业务流程和整合经验的区块链专家、架构师、开发人员和咨询人员团队_

### 工具和库 {#tooling-and-libraries}

- [Alathio](https://explorer.aleth.io/) _以太坊数据分析平台_
- [Epirus](https://www.web3labs.com/epirus) _ Web3 实验室的开发、部署和监控区块链应用程序的平台_
- [Ernst & Young 的“Nightfall”](https://github.com/EYBlockchain/nightfall) _私有的交易工具包_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _与 Web3 应用提供商一起使用的交易签名应用程序_
- [Tenderly](https://tenderly.co/) _一个提供实时分析、警报和监测并支持私有网络的数据平台。_
- [Truffle Suite](https://trufflesuite.com) _区块链开发套件（Truffle、Ganache、Drizzle）_

### 可扩展性解决方案 {#scalability-solutions}

[第二层](/developers/docs/scaling/layer-2-rollups/) 是一套在以太坊上（一层）运行的技术或系统，它与一层具有相同的安全属性，但提供了更大的交易处理能力（吞吐量），更低交易费（操作费用），和比第一层更快的交易确认速度。 第二层扩容解决方案由第一层保护，但它们使区块链应用程序相比第一层能够处理更多的用户、操作或数据。 其中许多解决方案利用最近在加密和零知识证明（ZK）方面取得的进展，最大限度地提高了性能和安全性。

在第二层上开发应用可以帮助 [解决一些当初导致企业开发者在过去选择私有链的问题](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/)，同时保留了使用以太坊主网的好处。

已准备工作或即将完成的 L2 解决办法的例子包括：

- Optimistic rollups（链上数据、欺诈证明）
  - [Optimism](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Offchain Labs Arbitrum Rollup](https://fuel.sh)
- ZK rollups（链上数据，ZK 有效性证明）
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkSync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium（链下数据，ZK 有效性证明）
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plasma（链下数据，欺诈证明）
  - [OMG Network](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Matic Network](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- 状态通道
  - [Connext](https://connext.network/)
  - [Kchannels](https://www.kchannels.io/)
  - [Perun](https://perun.network)
  - [Raiden](https://raiden.network/)
- 侧链
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- 组合多个类别属性的混合解决方案
  - [Offchain Labs Arbitrum SCSC](https://offchainlabs.com/arbitrum.pdf)
  - [Celer](https://celer.network)

## 以太主网上的企业级应用 {#enterprise-live-on-mainnet}

以下是已经部署到以太主网上的一些企业级应用

### 支付 {#payments}

- [Brave 浏览器](https://basicattentiontoken.org/) _让用户关注广告，用户可以通过 BAT 代币支付出版商以支持他们。_
- [hCaptcha](https://www.hcaptcha.com/) _防止机器人的 CAPTCHA 系统，这个系统将用户标记机器学习数据的费用支付给网站操作者。 现在由 Cloudfllar 部署。_
- [Audius](https://audius.co/) _一个直接连接音乐粉丝和艺术家的流媒体服务，并且允许艺术家由他们的粉丝全额支付，直接和即时支付给每个流媒体_

### 金融 {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _债券发行和结算_
- [Societe Generale](https://www.societegenerale.com/en/news/newsroom/societe-generale-performs-first-financial-transaction-settled-central-bank-digital) _保证金发行_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _FAT 商标发行与代币化_
- [Sila](https://silamoney.com/) _银行和 ACH 支付的基础设施即服务_
- [Tinlake](https://tinlake.centrifuge.io/) _应收款融资通过代币化的真实资产，如发票、抵押或串流使用费_
- [Kratos](https://triterras.com/kratos) _商品交易和贸易融资平台，将商品交易者连接起来，并使他们能够直接在线交易和从贷方获得资本_
- [Fasset](https://www.fasset.com/) _支持可持续基础设施的平台_

### 数据公证 {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _最终贷款的详细信息被散列并记录在主网上_
- [Slusk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _数据完整性可以通过定期将索引数据的哈希写入到主网_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _意大利最大的新闻机构与假新闻作斗争，并使读者能够通过在主网上录制这些新闻故事来验证其来源_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _在以太坊上记录新闻稿，以确保公司责任和信用_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _记录以太坊上的手表的出处和修理历史_

### 供应链 {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _提单和单证传输提供者_
- [Morphosus.network](https://morpheus.network/) _供应链自动化平台，它实现了私有链与以太坊主网公证数据的混合，加拿大食品、石油天然气经销有限公司和阿根廷宠物食品供应商 Vitalcan 等目前在使用 _
- [Minespider](https://www.minespider.com/) _供应链跟踪_
- [ShipChain](https://shipchain.io) _公开的以太坊侧链，同时也是企业级的可见可信任的供应链，特别是以多式联运物流为目的_
- [Follow Our Fibre](https://www.followourfibre.com) _直观跟踪供应链_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/contract-manager) _通过在您信任的商业伙伴网络中签发 RFQ、合同、订单和发票提供了一个采购流程_
- [Treum](https://treum.io/) _使用区块链技术为供应链带来透明度、可追溯性和可交易性_

### 所有权与证明 {#credentials}

- [犹他州](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _在以太坊签发数码结婚证书_
- [两所意大利高中](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _在以太坊主网上颁发的数字文凭_
- [圣加仑大学](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _验证瑞士一所大学学位的试点项目_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _ [Hyland](https://www.learningmachine.com/)_ 在主网上记录所有教育证书
- [波汉科学技术大学](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _南韩大学向其新毕业生提供区块链储存的文凭_
- [OpenCerts](https://opencerts.io/) _在新加坡发布区块链教育凭据_
- [BlockCerts](https://www.blockcerts.org/) _开发了一个开放的区块链凭据标准_
- [SkillTree](http://skilltree.org/) _在线技能培训和认证，可以通过过期触发器或依赖其他技能来配置_

### 工具 {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _电费支付_

如果您想要向这个列表中继续添加，请参阅[贡献说明](/contributing/)。
