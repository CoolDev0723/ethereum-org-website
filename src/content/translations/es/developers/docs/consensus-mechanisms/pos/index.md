---
title: Prueba de participación (PoS)
description: Una explicación del protocolo de consenso de la prueba de participación y su papel en Ethereum.
lang: es
sidebar: true
incomplete: true
---

Ethereum se está trasladando a un mecanismo de consenso llamado prueba de participación (PoS) desde la[prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow/). Este siempre ha sido el plan, ya que es clave para la estrategia de la comunidad: conseguir que Ethereum crezca mediante [las actualizaciones de Eth2](/upgrades/). Sin embargo, obtener una correcta PoS es un gran reto técnico y no es tan sencillo como usar PoW para alcanzar un consenso a través de la red.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, te recomendamos que primero leas los [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## ¿Qué es la prueba de participación (PoS)? {#what-is-pos}

La prueba de participación es un tipo de [mecanismo de consenso](/developers/docs/consensus-mechanisms/) que usan las redes de blockchain para lograr consensos distribuidos.

Esto requiere que los usuarios participen con sus ETH para convertirse en un validador de la red. Al igual que los mineros, los validadores son los responsables durante la [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/); deben ordenar las transacciones y crear nuevos bloques para que todos los nodos puedan coincidir en el estado de la red.

La Prueba de participación incluye una serie de mejoras para el sistema de Prueba de trabajo:

- Mejor eficiencia energética: no necesitas usar mucha energía para minar los bloques
- Barreras de entrada más bajas, requisitos de hardware reducidos: no necesitas hardware de primer nivel para tener una oportunidad de crear nuevos bloques
- Mayor inmunidad a la centralización: la Prueba de participación debería conducir a la existencia de más nodos en la red
- Mayor compatibilidad con cadenas fragmentadas: una actualización clave en la escala de la red de Ethereum

## Prueba de participación, staking (apuestas) y validadores {#pos-staking-validators}

La Prueba de participación es el mecanismo subyacente que activa a los validadores cuando reciben una apuesta suficiente. Para Ethereum, los usuarios necesitarán apostar 32 ETH para convertirse en validadores. Los validadores se escogen aleatoriamente para crear bloques y son responsables de revisar y confirmar bloques que no han creado ellos. Las apuestas de los usuarios también se utilizan como una forma de incentivar el buen comportamiento de los validadores. Por ejemplo, un usuario puede perder una parte de su apuesta por cosas como desconectarse (no validar), o bien perder toda su apuesta si se realiza una conspiración deliberada.

## ¿Cómo funciona la Prueba de participación de Ethereum? {#how-does-pos-work}

A diferencia de la Prueba de trabajo, los validadores no necesitan usar cantidades significativas de potencia informática, ya que a ellos se les selecciona de manera aleatoria y no están compitiendo. No necesitan minar bloques, sino que únicamente precisan crear bloques cuando se les elige y validar los bloques propuestos cuando no lo son. Esta validación es conocida como certificación (attesting). La certificación se podría comprender con una expresión como la siguiente: "yo creo que este bloque tiene buena pinta". Los validadores obtienen recompensas por proponer nuevos bloques y por certificar a los que los han encontrado.

Si certificas bloques maliciosos, perderás tu apuesta.

### La cadena de baliza (blockchain) {#the-beacon-chain}

Cuando en Ethereum se reemplaza la Prueba de trabajo por la Prueba de participación, se añade la complejidad de las [cadenas fragmentadas](/upgrades/shard-chains/). Se trata de cadenas de valores independientes que necesitarán validadores para procesar las transacciones y crear nuevos bloques. El plan es disponer de 64 cadenas fragmentadas y todos necesitan comprender cuál es el estado de la red. Por eso, una coordinación extra es necesaria y se realizará mediante [cadena de baliza](/upgrades/beacon-chain/).

La cadena de baliza recibe la información del estado de los fragmentos y la hace disponible para otros fragmentos para que, de este modo, la red pueda permanecer sincronizada. La cadena de baliza también gestionará a los validadores, desde el registro de los depósitos de sus apuestas hasta la emisión de sus recompensas y penalizaciones.

A continuación se explica el funcionamiento de este proceso.

### ¿Cómo funciona la validación? {#how-does-validation-work}

Cuando envías una transacción en un fragmento, un validador será responsable de agregar tu transacción a un bloque de fragmentos. La cadena de baliza elige a los validadores de manera algorítmica para que propongan nuevos bloques.

#### Certificación {#attestation}

Si no se elige a un validador para que proponga un nuevo bloque de fragmentos, tendrán que certificar la propuesta de otro validador y confirmar que todo parece funcionar correctamente. Se trata de la certificación que se registra en la cadena de baliza, en lugar de en la transacción en sí misma.

Se requiere un mínimo de 128 validadores para certificar cada bloque de fragmentos; esto se denomina "comité".

El comité dispone de un periodo de tiempo en el que proponer y validar un bloque de fragmentos. Esto se denomina "slot". Por cada slot se genera únicamente un bloque válido. Cada "epoch" contiene 32 slots. Cuando se completa un epoch, el comité se disuelve y se reforma con nuevos participantes seleccionados aleatoriamente. Esto sirve de ayuda para que los fragmentos se mantengan a salvo de comités que realicen acciones incorrectas.

#### Crosslinks {#rewards-and-penalties}

Cuando un bloque de fragmentos nuevo dispone de suficientes certificaciones, se crea un crosslink que confirma la inclusión del bloque y de tu transacción en la cadena de baliza.

Una vez generado el crosslink, el validador que haya propuesto el bloque obtendrá su recompensa.

#### Finalidad {#finality}

En redes distribuidas, una transacción tiene "finalidad" cuando forma parte de un bloque que no puede cambiar.

Para hacer esto en la Prueba de participación, Casper, un protocolo de finalidad, consigue que los validadores se pongan de acuerdo sobre el estado de un bloque en ciertos puntos de control. Si dos tercios de los validadores están de acuerdo, el bloque se considera finalizado. Los validadores perderán sus apuestas completas si posteriormente intentan revertir este proceso mediante un ataque del 51%.

En palabras de Vlad Zamfir: "es como si un minero participa en un ataque del 51% y provoca el colapso inmediato de su equipo de minería".

## Prueba de participación y seguridad

La amenaza de un [ataque del 51%](https://www.investopedia.com/terms/1/51-attack.asp) sigue existiendo en la Prueba de participación, pero es incluso más arriesgado para los atacantes. Para conseguirlo, necesitarás controlar el 51% de los ETH que se hayan apostado. Esto no solo supondría una gran cantidad de dinero, sino que probablemente causaría que el valor de ETH disminuyera. No tiene mucho sentido destruir el valor de una moneda, si dispones de una participación mayoritaria. Tiene mucho más sentido mantener la red segura y saludable.

Existen los slashings de apuestas, expulsiones y otras penalizaciones (coordinados por la cadena de baliza) para evitar otros actos de comportamiento inadecuado. Además, es responsabilidad de los validadores informar acerca de estos incidentes.

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                                                                                                                                                                                                                                                                                                                                    | Desventajas                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| La participación se hace más sencilla para ti al ejecutar un nodo. Esto no requiere grandes inversiones en hardware o energía. Además, si no dispones de suficientes ETH para participar, puedes unirte a comunidades de participación.                                                                                                                     | La Prueba de participación está todavía en fase inicial de desarrollo y se ha evaluado en menor medida que la Prueba de trabajo |
| La participación es más descentralizada. Esto permite incrementar la participación y una mayor cantidad de nodos no se traduce necesariamente en un incremento del porcentaje de rendimiento, como con la minería.                                                                                                                                          |                                                                                                                                 |
| La participación permite realizar una fragmentación segura. Las cadenas de fragmentos permiten a Ethereum crear múltiples bloques al mismo tiempo, lo que incrementa el rendimiento de las transacciones. La fragmentación de la red en un sistema de Prueba de trabajo reduciría simplemente la potencia necesaria para comprometer una porción de la red. |                                                                                                                                 |

## Más información {#further-reading}

- [¿Qué es la Prueba de participación?](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Es necesario que leas primero la sección en la que se explica la cadena de baliza de Ethereum 2.0](https://ethos.dev/beacon-chain/) _Ethos.dev_

## Temas relacionados {#related-topics}

- [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/)
