import React from "react"
import styled from "styled-components"
import CardList from "./CardList"
import { useIntl } from "gatsby-plugin-intl"

import { translateMessageId } from "../utils/translations"

const Container = styled.div`
  margin-bottom: 4rem;
`

const ShardChainsList = () => {
  const intl = useIntl()
  const reads = [
    {
      title: translateMessageId(
        "page-upgrade-article-title-sharding-is-great",
        intl
      ),
      description: "Vitalik Buterin",
      link: "https://vitalik.ca/general/2021/04/07/sharding.html",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-rollup-roadmap",
        intl
      ),
      description: "Vitalik Buterin",
      link: "https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-two-point-oh",
        intl
      ),
      description: "Ethos.dev",
      link: "https://ethos.dev/beacon-chain/",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-sharding-consensus",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-ethereum-foundation",
        intl
      ),
      link: "https://blog.ethereum.org/2020/03/27/sharding-consensus/",
    },
  ]

  return (
    <Container>
      <CardList content={reads} />
    </Container>
  )
}

export default ShardChainsList
