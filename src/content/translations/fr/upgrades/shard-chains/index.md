---
title: Chaînes de fragments
description: En savoir plus sur les chaînes de fragments, ces fragmentations du réseau qui donnent à Ethereum une plus grande capacité de transaction et facilitent son exécution.
lang: fr
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: La fragmentation (ou sharding) est une mise à niveau en plusieurs phases qui améliorera l'évolutivité et la capacité d'Ethereum.
summaryPoint2: Les chaînes de fragments répartissent la charge du réseau sur 64 nouvelles chaînes.
summaryPoint3: Elles facilitent l'exécution d'un nœud en maintenant les exigences matérielles à un niveau faible.
summaryPoint4: Les feuilles de route techniques incluent des travaux sur les chaînes de fragments dans la "Phase 1" et potentiellement la "Phase 2".
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Les chaînes de fragments devraient être lancées courant 2023, en fonction de la rapidité avec laquelle le travail progresse après le lancement de <a href="/upgrades/merge/">la fusion</a>. Ces fragments donneront à Ethereum une plus grande capacité à stocker et à accéder aux données, mais ils ne seront pas utilisés pour exécuter du code. Les détails sont encore en cours d'élaboration.
</UpgradeStatus>

## Qu'est ce que la fragmentation ou "Sharding" ? {#what-is-sharding}

La fragmentation (sharding) est le processus qui consiste à diviser une base de données horizontalement pour répartir la charge - c'est un concept courant en informatique. Dans le cadre d'Ethereum, cette fragmentation permettra de réduire l'encombrement du réseau en augmentant le nombre de transactions par seconde grâce à la création de nouvelles chaînes, appelées "fragments".

C'est important pour des raisons autres que l'évolutivité.

## Caractéristiques de la fragmentation {#features-of-sharding}

### Tout le monde peut exécuter un nœud {#everyone-can-run-a-node}

La fragmentation est un bon moyen de dimensionner si vous souhaitez que les choses restent décentralisées, car l'alternative consiste à mettre à l'échelle en augmentant la taille de la base de données existante. Cela rendrait Ethereum moins accessible aux validateurs de réseau car ils auraient besoin d'ordinateurs puissants et coûteux. Avec les chaînes de fragments, les validateurs n'ont besoin que de stocker/d'exécuter les données du fragment qu'ils valident, et non de l'ensemble du réseau (comme ce qui se passe aujourd'hui). Cela accélère les choses et réduit considérablement les besoins en matériel.

### Plus de participation au réseau {#more-network-participation}

La fragmentation vous permettra tôt ou tard de faire fonctionner Ethereum sur un ordinateur portable ou un téléphone personnel. Ainsi, un plus grand nombre de personnes devraient pouvoir participer, ou lancer des [clients](/developers/docs/nodes-and-clients/), dans un fragment Ethereum. La sécurité sera renforcée car plus le réseau est décentralisé, plus la surface d'attaque est réduite.

Les exigences en matière de matériel étant moins élevées, la fragmentation permettra plus facilement l'exécution des [clients](/developers/docs/nodes-and-clients/) par vous-même, sans avoir recours à aucun service intermédiaire. Et si vous le pouvez, pensez à exécuter plusieurs clients. Cela peut contribuer à la santé du réseau en réduisant davantage les points de défaillance. [Exécuter un client Eth2](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Dans un premier temps, vous devrez exécuter un client principal en même temps que votre client Eth2. <a href="https://launchpad.ethereum.org" target="_blank">Le tableau de bord</a> vous guidera à travers les exigences matérielles et les processus. Vous pouvez également utiliser une <a href="/developers/docs/apis/backend/#available-libraries">API backend</a>.
</InfoBanner>

## Chaînes de fragments version 1 : disponibilité des données {#data-availability}

Lorsque les premières chaînes de fragments seront expédiées, elles ne fourniront que des données supplémentaires au réseau. Elles ne traiteront pas les transactions ni les contrats intelligents. Mais elles offriront tout de même des améliorations incroyables en matière de transactions par seconde lorsqu'elles seront combinées avec les rollups.

Les Rollups sont une technologie de "layer 2" qui existe aujourd'hui. Ils permettent aux DApps de regrouper ou de "lancer" des transactions en une seule transaction hors chaîne, de générer une preuve cryptographique et de la soumettre ensuite à la chaîne. Cela réduit les données nécessaires pour une transaction. Combinez ceci avec toutes les données supplémentaires fournies par les fragments et vous obtenez 100 000 transactions par seconde.

<InfoBanner isWarning={false}>
  Etant donné les progrès récents dans la recherche et le développement de solutions de mise à l'échelle de la couche 2, cela a incité la priorisation de la mise à jour de la fusion avant les chaînes de fragments (shard chains). Celles-ci seront au centre des préoccupations à la suite de la transition du réseau principal aux preuves de ses enjeu.

[En savoir plus sur les rollups](/developers/docs/scaling/layer-2-rollups/)
</InfoBanner>

## Chaînes de fragments version 2 : exécution de code {#code-execution}

Le plan a toujours été d'ajouter des fonctionnalités supplémentaires aux fragments (shards), pour les rendre plus similaires au réseau principal [Ethereum](/glossary/#mainnet) actuel. Cela leur permettrait de stocker et d'exécuter des contrats intelligents et de gérer des comptes. Mais compte tenu de l'augmentation des transactions par seconde que la version 1 des fragments apporte, cela est-il encore nécessaire ? Cette question est toujours débattue au sein de la communauté et il semble qu'il y ait quelques options.

### Les fragments doivent-ils être exécutés ? {#do-shards-need-code-execution}

Vitalik Buterin, en parlant au Bankless podcast, a présenté 3 options potentielles qui valent la peine d'être discutées.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Exécution d'état non requise {#state-execution-not-needed}

Cela signifierait que nous ne donnerions pas aux fragments la capacité de gérer des contrats intelligents et que nous les utiliserions seulement comme dépôts de données.

#### 2. Avoir des fragments d'exécution {#some-execution-shards}

Peut-être y a-t-il un compromis où nous n'avons pas besoin de tous les fragments (64 sont prévus pour l'instant) pour être plus intelligents. Nous pourrions simplement ajouter cette fonctionnalité à quelques fragments, et pas aux autres. Cela pourrait accélérer l'implémentation.

#### 3. Attendre de pouvoir faire des snarks Zero Knowledge (ZK) {#wait-for-zk-snarks}

Enfin, peut-être devrions-nous revenir sur ce débat lorsque les pièges de ZK seront renforcés. C'est une technologie qui pourrait contribuer à apporter des transactions véritablement privées au réseau. Il est probable qu’ils auront besoin de fragments plus intelligents, mais ils sont toujours en recherche et développement.

#### Autres sources {#other-sources}

Voici d'autres réflexions qui vont dans le même sens :

- [Phase One and Done: Eth2 as a data availability engine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Ce point de discussion reste actif. Nous mettrons à jour ces pages dès que nous aurons plus d’informations.

## Relations entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Eth2 sont en quelque sorte liées. Récapitulons donc comment les chaînes de fragments sont liées aux autres mises à niveau.

### Fragments et chaîne phare {#shards-and-beacon-chain}

La chaîne phare contient toute la logique permettant de sécuriser et de synchroniser les fragments de façon sécurisée. La chaîne phare coordinera les stakers dans le réseau, en les assignant à des fragments sur lesquels ils doivent travailler. De plus, elle facilitera la communication entre les fragments en recevant et en stockant des données sur les transactions qui sont accessibles par d'autres fragments. Cela donnera aux fragments un aperçu de l'état d'Ethereum pour garder tout à jour.

<ButtonLink to="/upgrades/beacon-chain/">La chaîne phare</ButtonLink>

### Les fragments (shards) et la fusion {#shards-and-docking}

Au même moment où des fragments supplémentaires sont ajoutés, le réseau principal d'Ethereum sera déjà sécurisé par la chaîne phare à l'aide d'une preuve d'enjeu. Cela autorise un réseau principal (mainnet) ouvert pour créer des chaînes de fragments (shards chains), alimentées par les solutions de la couche 2 (layer 2) qui renforcent l'évolutivité.

Reste à voir si le réseau principal existera en tant que seul fragment "intelligent" capable de gérer l'exécution de code – mais autrement, une décision pour étendre les fragments pourra être envisagée si besoin.

<ButtonLink to="/upgrades/merge/">
  La fusion
</ButtonLink>

<Divider />

### En savoir plus {#read-more}

<ShardChainsList />
