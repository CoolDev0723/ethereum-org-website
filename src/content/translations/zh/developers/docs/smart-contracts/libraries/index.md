---
title: 智能合约库
description:
lang: zh
sidebar: true
---

您无需从头开始编写项目中的每一个智能合约 我们有许多开源代码的智能合约库可为您的项目提供可重复利用的构建块，从而使您不必重新开始。

## 前置要求 {#prerequisites}

在我们跳转到智能合约库之前，清楚地了解一个智能合约的构成是一个不错的主意。 如果尚未进行智能合约的了解，请直接点击</[智能合约](/developers/docs/smart-contracts/anatomy/)。

## 资料库中的内容 {#whats-in-a-library}

您通常可以在智能合约库中找到两种构建模块：可以添加到合约中的可复用代码，与各种标准的实现。

### 行为 {#behaviors}

当编写智能合约时，您很可能会发现自己在写重复的代码。 比如说在智能合约中指派一个*管理员*地址执行受保护的操作，或添加一个紧急*暂停*按钮以应对预料不到的问题。

智能合约库通常提供这些行为的可复用实现方式为[标准库](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries)或在 solidity 中通过[继承](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance)的方式实现。

例如，以下是[`不可拥有的`合约的简化版本](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol)来自 [OpenZepelin 合约库](https://github.com/OpenZeppelin/openzeppelin-contracts)，它设计了一个作为合约所有者的地址，并且提供了一个修饰者来限制该所有者获得一种方法。

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

在您的合约中使用这个构建模块，您需要先导入它，然后在您自己的合约中扩展它。 这个将会允许您使用 `Ownable` 合约提供的修饰符来保护您的函数。

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

另一个比较受欢迎的例子是[ SafeMath ](https://docs.openzeppelin.com/contracts/3.x/utilities#math)或[DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)。 这些库（与基础合约不同）提供了语言本身不具有的带有溢出检查的算术函数。 使用这些库而不是本地的算术操作可以来防止您的合约出现溢出错误，这些错误可能会导致灾难性的后果！

### 标准 {#standards}

为了促进[可组合性和互操作性](/developers/docs/smart-contracts/composability/)，以太坊社区已经以 **ERC** 的形式定义了几个标准。 您可以在[标准](/developers/docs/standards/)部分阅读更多关于他们的信息。

当将 ERC 作为您的合约的一部分时，更好的做法是寻找已有的标准去实现而不是试图推出您自己的方式。 许多智能合约库包含了最流行的 ERC 标准的实现。 例如，[ERC20 可互换代币标准](/developers/tutorials/understand-the-erc-20-token-smart-contract/)可在 [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md) [DappSys](https://github.com/dapphub/ds-token/) 和 [OpenZepelin](https://docs.openzeppelin.com/contracts/3.x/erc20)中找到。 此外，一些 ERC 还提供规范实现作为 ERC 本身的一部分。

值得一提的是，一些 ERC 不是独立的，而是对其他 ERC 的补充。 例如， [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) 为 ERC20 添加了一个扩展，以提高其可用性。

## 如何添加库 {#how-to}

始终参考您所包含的库的文档，以获得关于如何将其包含在您的项目中的具体说明 一些 Solidity 合约库使用 `npm` 来打包，所以您可以直接 `npm` 安装它们。 大多数[编译](/developers/docs/smart-contracts/compiling/)合约的工具会在您的 node_modules 中查找智能合约库，所以您可以做以下工作。

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

无论您使用哪种方法，当包括一个库时，总是要注意[语言](/developers/docs/smart-contracts/languages/)的版本。 例如，如果您用 Solidity 0.5 编写您的合约，您就不能使用 Solidity 0.6 的库。

## 何时使用 {#when-to-use}

为您的项目使用智能合约库有几个好处。 首先，它为您提供了现成的构建模块，您可以将其纳入您的系统，而不必自己编码，从而节省了您的时间。

安全性也是一个重要的优点。 开源智能合约库也经常受到严格审查。 鉴于许多项目都依赖于它们，社区有强烈的动机来对它们持续审计。 在应用程序代码中发现错误比在可重用的合约库中发现错误要常见得多。 一些库还接受了[外部审计](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audit)，以提高安全性。

然而，使用智能合约库有可能将您不熟悉的代码纳入您的项目。 导入一个合约并将其直接包含在您的项目中是很诱人的，但如果没有很好地理解该合约的作用，您可能会由于一个意外的行为而无意中在您的系统中引入一个问题。 一定要确保阅读您要导入的代码的文档，然后在使其成为您的项目的一部分之前审查代码本身。

最后，在决定是否包括一个库时，要考虑其总体使用情况。 一个被广泛采用的方案的好处是有一个更大的社区和更多的眼睛来关注它的问题。 在使用智能合约进行建设时，安全应该是您的首要关注点！

## 相关工具 {#related-tools}

**OpenZeppelin 合约-** **_安全的智能合约开发库。_**

- [相关文档](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社区论坛](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_安全、简单、灵活的智能合约构建模块。_**

- [相关文档](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_一个带有合约、库和案例的 Solidity 项目，帮助您为现实世界建立功能齐全的分布式应用。_**

- [GitHub](https://github.com/HQ20/contracts)

## 相关教程 {#related-tutorials}

- [以太坊开发者的安全考虑](/developers/docs/smart-contracts/security/) _- 构建智能合约时的安全考虑教程，包括库的使用。_
- [了解 ERC-20 代币智能合约](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- 关于 ERC20 标准的教程，由多个库提供。_

## 延伸阅读 {#further-reading}

_还有哪些社区资源对您有所帮助？ 编辑并添加本页面！_
