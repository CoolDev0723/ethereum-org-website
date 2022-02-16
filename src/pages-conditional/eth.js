import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"

import { translateMessageId } from "../utils/translations"
import Translation from "../components/Translation"
import ActionCard from "../components/ActionCard"
import ButtonLink from "../components/ButtonLink"
import CalloutBanner from "../components/CalloutBanner"
import CardList from "../components/CardList"
import EthPriceCard from "../components/EthPriceCard"
import EthVideo from "../components/EthVideo"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import HorizontalCard from "../components/HorizontalCard"
import PageMetadata from "../components/PageMetadata"
import {
  CardContainer,
  Content,
  Divider,
  GrayContainer,
  Intro,
  LeftColumn,
  RightColumn,
  TwoColumnContent,
  Page,
  StyledCard,
} from "../components/SharedStyledComponents"

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 140%;
`

const Title = styled.h1`
  font-size: 0.875rem;
  line-height: 140%;
  letter-spacing: 0.04em;
  font-weight: 500;
  margin-bottom: 1rem;
  margin-top: 0;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textTableOfContents};
`

const StyledTwoColumnContent = styled(TwoColumnContent)`
  align-items: flex-start;
`

const Subtitle = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`
const SubtitleTwo = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text300};
`

const StyledEthPriceCard = styled(EthPriceCard)`
  margin-bottom: 2rem;
`

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const Hero = styled(GatsbyImage)`
  flex: 1 1 100%;
  max-width: 800px;
  align-self: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-left: 0;
    width: 100%;
  }
`

const Header = styled.header`
  flex: 1 1 50%;
  min-width: 300px;
  margin-top: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 1.5rem;
  }
`

const H2 = styled.h2`
  margin-top: 0;
`

const H4 = styled.h4`
  font-weight: 600;
`

const StyledCardContainer = styled(CardContainer)`
  margin-bottom: 2rem;
`

const TokenCard = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
`

const TextDivider = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
  width: 10%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.searchResultBackground};
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    align-self: flex-start;
  }
`

const CentralColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 960px;
  margin: 4rem auto;
`

const CentralActionCard = styled(ActionCard)`
  flex: none;
  margin: 2rem 0;
  .action-card-image-wrapper {
    padding: 1rem;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    display: flex;

    .action-card-image-wrapper {
      min-width: 260px;
    }
    .action-card-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1rem;

      p {
        margin-bottom: 0;
      }
    }
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 5rem 0;
`

const tokens = [
  {
    emoji: ":scales:",
    title: <Translation id="page-eth-stablecoins" />,
    description: <Translation id="page-eth-stablecoins-desc" />,
  },
  {
    emoji: ":ballot_box_with_ballot:",
    title: <Translation id="page-eth-gov-tokens" />,
    description: <Translation id="page-eth-gov-tokens-desc" />,
  },
  {
    emoji: ":pile_of_poo:",
    title: <Translation id="page-eth-shit-coins" />,
    description: <Translation id="page-eth-shit-coins-desc" />,
  },
  {
    emoji: ":frame_with_picture:",
    title: <Translation id="page-eth-collectible-tokens" />,
    description: <Translation id="page-eth-collectible-tokens-desc" />,
  },
]

const benefits = [
  {
    emoji: ":woman_technologist:",
    title: <Translation id="page-eth-yours" />,
    description: <Translation id="page-eth-yours-desc" />,
  },
  {
    emoji: ":shield:",
    title: <Translation id="page-eth-cryptography" />,
    description: <Translation id="page-eth-cryptography-desc" />,
  },
  {
    emoji: ":handshake:",
    title: <Translation id="page-eth-p2p-payments" />,
    description: <Translation id="page-eth-p2p-payments-desc" />,
  },
  {
    emoji: ":money_with_wings:",
    title: <Translation id="page-eth-no-centralized" />,
    description: <Translation id="page-eth-no-centralized-desc" />,
  },
  {
    emoji: ":signal_strength:",
    title: <Translation id="page-eth-open" />,
    description: <Translation id="page-eth-open-desc" />,
  },
  {
    emoji: ":shortcake:",
    title: <Translation id="page-eth-flexible-amounts" />,
    description: <Translation id="page-eth-flexible-amounts-desc" />,
  },
]

const tokenLinks = [
  {
    link: "/stablecoins/",
    caption: "",
    title: <Translation id="page-eth-tokens-stablecoins" />,
    description: <Translation id="page-eth-tokens-stablecoins-description" />,
  },
  {
    link: "/defi/",
    caption: "",
    title: <Translation id="page-eth-tokens-defi" />,
    description: <Translation id="page-eth-tokens-defi-description" />,
  },
  {
    link: "/nft/",
    caption: "",
    title: <Translation id="page-eth-tokens-nft" />,
    description: <Translation id="page-eth-tokens-nft-description" />,
  },
  {
    link: "/dao/",
    caption: "",
    title: <Translation id="page-eth-tokens-dao" />,
    description: <Translation id="page-eth-tokens-dao-description" />,
  },
]

const cardListContent = [
  {
    link: "https://docs.ethhub.io/ethereum-basics/monetary-policy/",
    title: <Translation id="page-eth-monetary-policy" />,
    description: "EthHub",
    caption: <Translation id="page-eth-ethhub-caption" />,
  },
  {
    link: "https://medium.com/ethhub/why-ether-is-valuable-2b4e39e01eb3",
    title: <Translation id="page-eth-value" />,
    description: "Anthony Sassano",
    caption: <Translation id="page-eth-last-updated" />,
  },
  {
    link: "https://support.mycrypto.com/how-to/getting-started/how-to-buy-ether-with-usd",
    title: <Translation id="page-eth-how-to-buy" />,
    description: "MyCrypto",
    caption: <Translation id="page-eth-how-to-buy-caption" />,
  },
]

const EthPage = (props) => {
  const intl = useIntl()
  const data = props.data
  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-eth-whats-eth-meta-title", intl)}
        description={translateMessageId("page-eth-whats-eth-meta-desc", intl)}
        image={getImage(data.ogImage)?.images.fallback.src}
      />
      <Content>
        <HeroContainer>
          <Header>
            <Title>
              <Translation id="page-eth-whats-eth" />
            </Title>
            <Slogan>
              <Translation id="page-eth-currency-for-future" />
            </Slogan>
            <Subtitle>
              <Translation id="page-eth-is-money" />
            </Subtitle>
            <SubtitleTwo>
              <Translation id="page-eth-currency-for-apps" />
            </SubtitleTwo>
            <StyledEthPriceCard />
            <ButtonLink to="/get-eth/" title="where to buy eth">
              <Translation id="page-eth-button-buy-eth" />
            </ButtonLink>
          </Header>
          <Hero
            image={getImage(data.eth)}
            alt={translateMessageId("page-eth-whats-eth-hero-alt", intl)}
            loading="eager"
          />
        </HeroContainer>
      </Content>
      <GrayContainer>
        <Content>
          <Intro>
            <p>
              <Translation id="page-eth-description" />{" "}
            </p>
          </Intro>
          <StyledCardContainer>
            {benefits.map((benefits, idx) => (
              <StyledCard
                key={idx}
                emoji={benefits.emoji}
                title={benefits.title}
                description={benefits.description}
              />
            ))}
          </StyledCardContainer>
          <InfoBanner emoji=":wave:" shouldCenter={true}>
            <b>
              <Translation id="page-eth-buy-some" />
            </b>{" "}
            <Translation id="page-eth-buy-some-desc" />{" "}
            <Link to="/what-is-ethereum/">
              <Translation id="page-eth-more-on-ethereum-link" />
            </Link>
            <Translation id="page-eth-period" />
          </InfoBanner>
        </Content>
      </GrayContainer>
      <Content>
        <CentralColumn>
          <H2>
            <Translation id="page-eth-whats-unique" />
          </H2>
          <p>
            <Translation id="page-eth-whats-unique-desc" />
          </p>
          <EthVideo alt={translateMessageId("page-eth-video-alt", intl)} />
          <div>
            <H4>
              <Translation id="page-eth-fuels" />
            </H4>
            <p>
              <Translation id="page-eth-fuels-desc" />
            </p>
            <p>
              <Translation id="page-eth-fuels-desc-2" />
            </p>
            <p>
              <Translation id="page-eth-fuels-desc-3" />{" "}
              <strong>
                <Translation id="page-eth-powers-ethereum" />
              </strong>
              .{" "}
              <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
                <Translation id="page-eth-mining-link" />
              </Link>
            </p>
            <p>
              <Translation id="page-eth-fuels-staking" />{" "}
              <Link to="/staking/">
                <Translation id="page-eth-fuels-more-staking" />
              </Link>
            </p>
          </div>
          <CentralActionCard
            to="/what-is-ethereum/"
            title={translateMessageId("page-eth-whats-ethereum", intl)}
            description={translateMessageId(
              "page-eth-whats-ethereum-desc",
              intl
            )}
            image={getImage(data.ethereum)}
          />
          <TextDivider />
          <div>
            <H4>
              <Translation id="page-eth-underpins" />
            </H4>
            <p>
              <Translation id="page-eth-underpins-desc" />
            </p>
            <p>
              <Translation id="page-eth-underpins-desc-2" />
            </p>
            <CentralActionCard
              to="/defi/"
              title={translateMessageId("page-eth-whats-defi", intl)}
              description={translateMessageId(
                "page-eth-whats-defi-description",
                intl
              )}
              image={getImage(data.defi)}
            />
          </div>
          <TextDivider />
          <div>
            <H4>
              <Translation id="page-eth-uses" />
            </H4>
            <p>
              <Translation id="page-eth-uses-desc" />
            </p>
            <p>
              <Translation id="page-eth-uses-desc-2" />{" "}
            </p>
            <ul>
              <li>
                <Link to="https://sablier.finance">
                  <Translation id="page-eth-stream-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-3" />
              </li>
              <li>
                <Link to="/get-eth/#dex">
                  <Translation id="page-eth-trade-link-2" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-4" />
              </li>
              <li>
                <Link to="https://app.compound.finance/">
                  <Translation id="page-eth-earn-interest-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-5" />
              </li>
              <li>
                <Link to="/stablecoins/">
                  <Translation id="page-eth-stablecoins-link" />
                </Link>{" "}
                – <Translation id="page-eth-uses-desc-6" />
              </li>
            </ul>
          </div>
          <Divider />
        </CentralColumn>
        <StyledCalloutBanner
          titleKey={"page-eth-where-to-buy"}
          descriptionKey={"page-eth-where-to-buy-desc"}
          image={getImage(data.ethCat)}
          alt={translateMessageId("page-eth-cat-img-alt", intl)}
          maxImageWidth={300}
        >
          <div>
            <ButtonLink to="/get-eth/">
              <Translation id="page-eth-get-eth-btn" />
            </ButtonLink>
          </div>
        </StyledCalloutBanner>
      </Content>

      <TwoColumnContent>
        <LeftColumn>
          <h3>
            <Translation id="page-eth-has-value" />
          </h3>
          <p>
            <Translation id="page-eth-has-value-desc" />
          </p>
          <p>
            <Translation id="page-eth-has-value-desc-2" />
          </p>
          <p>
            <Translation id="page-eth-has-value-desc-3" />
          </p>
          <p>
            <Translation id="page-eth-has-value-desc-4" />
          </p>
          <p>
            <Translation id="page-eth-has-value-desc-5" />
          </p>
        </LeftColumn>
        <RightColumn>
          <CardList content={cardListContent} />
        </RightColumn>
      </TwoColumnContent>
      <StyledTwoColumnContent id="tokens">
        <LeftColumn>
          <h3>
            <Translation id="page-eth-not-only-crypto" />
          </h3>
          <p>
            <Translation id="page-eth-not-only-crypto-desc" />{" "}
          </p>
          <p>
            <Translation id="page-eth-not-only-crypto-desc-2" />
          </p>
          <h4>
            <Translation id="page-eth-more-on-tokens" />
          </h4>
          <CardList id="tokens" content={tokenLinks} />
        </LeftColumn>
        <RightColumn>
          <h3>
            <Translation id="page-eth-popular-tokens" />
          </h3>
          {tokens.map((token, idx) => (
            <TokenCard
              key={idx}
              emoji={token.emoji}
              title={token.title}
              description={token.description}
              size={5}
            />
          ))}
        </RightColumn>
      </StyledTwoColumnContent>
    </Page>
  )
}

export default EthPage

export const query = graphql`
  {
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ogImage: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 220
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    defi: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 220
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethCat: file(relativePath: { eq: "eth-gif-cat.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
