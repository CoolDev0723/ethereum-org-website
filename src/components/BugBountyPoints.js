import React, { useContext, useState, useEffect } from "react"
import { ThemeContext } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import axios from "axios"

import Emoji from "./Emoji"
import Translation from "./Translation"
import Icon from "./Icon"
import Link from "./Link"
import Tooltip from "./Tooltip"

const PointsExchange = styled.div`
  flex: 1 1 560px;
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  margin: 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem 0;
  }
`

const PointsExchangeLabel = styled.div`
  text-transform: uppercase;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`

const PointsExchangeTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0rem;
`

const InfoIcon = styled(Icon)`
  margin-left: 0.5rem;
  fill: ${(props) => props.theme.colors.text200};
`

const TextNoMargin = styled.p`
  margin-bottom: 0rem;
`

const Token = styled(GatsbyImage)`
  margin-right: 0.5rem;
`

const TokenValue = styled.p`
  font-size: 1.25rem;
  margin: 0rem;
  margin-right: 1rem;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const ValueRow = styled(Row)`
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const TokenLogo = graphql`
  fragment TokenLogo on File {
    childImageSharp {
      gatsbyImageData(
        height: 24
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

const USD_PER_POINT = 2

const BugBountyPoints = () => {
  const [state, setState] = useState({
    currentETHPriceUSD: "",
    currentDAIPriceUSD: "",
    hasError: false,
  })
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cdai&vs_currencies=usd"
      )
      .then((response) => {
        if (response.data && response.data.ethereum && response.data.dai) {
          const currentETHPriceUSD = response.data.ethereum.usd
          const currentDAIPriceUSD = response.data.dai.usd
          setState({
            currentETHPriceUSD,
            currentDAIPriceUSD,
            hasError: false,
          })
        }
      })
      .catch((error) => {
        console.error(error)
        setState({
          hasError: true,
        })
      })
  }, [])

  const isLoading = !state.currentETHPriceUSD

  const pointsInETH = (USD_PER_POINT / state.currentETHPriceUSD).toFixed(5)
  const pointsInDAI = (USD_PER_POINT / state.currentDAIPriceUSD).toFixed(5)

  const tooltipContent = (
    <div>
      <Translation id="data-provided-by" />{" "}
      <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
    </div>
  )

  const data = useStaticQuery(graphql`
    query {
      dai: file(relativePath: { eq: "upgrades/dai.png" }) {
        ...TokenLogo
      }
      ethLight: file(relativePath: { eq: "upgrades/eth-black.png" }) {
        ...TokenLogo
      }
      ethDark: file(relativePath: { eq: "upgrades/eth-orange.png" }) {
        ...TokenLogo
      }
    }
  `)
  const ethImage = isDarkTheme ? data.ethDark : data.ethLight

  return (
    <PointsExchange>
      <PointsExchangeLabel>
        <Translation id="page-upgrades-bug-bounty-points-exchange" />{" "}
        <Tooltip content={tooltipContent}>
          <InfoIcon name="info" size="14" />
        </Tooltip>
      </PointsExchangeLabel>
      <PointsExchangeTitle>
        <Translation id="page-upgrades-bug-bounty-points-point" />
      </PointsExchangeTitle>
      {state.hasError && (
        <ValueRow>
          <TokenValue>
            <Translation id="page-upgrades-bug-bounty-points-error" />
          </TokenValue>
        </ValueRow>
      )}
      {isLoading && !state.hasError && (
        <ValueRow>
          <TokenValue>
            <Translation id="page-upgrades-bug-bounty-points-loading" />
          </TokenValue>
        </ValueRow>
      )}
      {!isLoading && !state.hasError && (
        <ValueRow>
          <Row>
            <Emoji mr={`0.5rem`} text=":dollar:" />
            <TokenValue>
              <Translation id="page-upgrades-bug-bounty-points-usd" />
            </TokenValue>
          </Row>
          <Row>
            <Token image={getImage(data.dai)} />
            <TokenValue>{pointsInDAI} DAI</TokenValue>
          </Row>
          <Row>
            <Token image={getImage(ethImage)} />
            <TokenValue>{pointsInETH} ETH</TokenValue>
          </Row>
        </ValueRow>
      )}
      <p>
        <Translation id="page-upgrades-bug-bounty-points-payout-desc" />
      </p>
      <TextNoMargin>
        <em>
          <Translation id="page-upgrades-bug-bounty-points-rights-desc" />
        </em>
      </TextNoMargin>
    </PointsExchange>
  )
}

export default BugBountyPoints
