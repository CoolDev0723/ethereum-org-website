import React, { useContext } from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import BannerNotification from "../components/BannerNotification"
import ButtonLink from "../components/ButtonLink"
import CallToContribute from "../components/CallToContribute"
import Card from "../components/Card"
import Codeblock from "../components/Codeblock"
import FeedbackCard from "../components/FeedbackCard"
import FileContributors from "../components/FileContributors"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import TableOfContents from "../components/TableOfContents"
import SectionNav from "../components/SectionNav"
import Translation from "../components/Translation"
import Emoji from "../components/Emoji"
import DocsNav from "../components/DocsNav"
import DeveloperDocsLinks from "../components/DeveloperDocsLinks"
import YouTube from "../components/YouTube"

import { ZenModeContext } from "../contexts/ZenModeContext.js"

import { isLangRightToLeft } from "../utils/translations"
import {
  Divider,
  Paragraph,
  Header1,
  Header2,
  Header3,
  Header4,
  ListItem,
} from "../components/SharedStyledComponents"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isZenMode ? "center" : "space-between")};
  width: 100%;
  padding: 0 2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 0;
  }
  background-color: ${(props) => props.theme.colors.ednBackground};
`

const DesktopTableOfContents = styled(TableOfContents)`
  padding-top: ${(props) => (props.isPageIncomplete ? `5rem` : `3rem`)};
`

// Apply styles for classes within markdown here
const Content = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.m};
  max-width: ${(props) => props.theme.breakpoints.m};
  padding: 3rem 4rem 4rem;
  margin: 0px auto;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 8rem 2rem 2rem;
  }

  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .citation {
    p {
      color: ${(props) => props.theme.colors.text200};
    }
  }
`

const H1 = styled(Header1)`
  font-size: 2.5rem;
  font-family: ${(props) => props.theme.fonts.monospace};
  text-transform: uppercase;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 2rem;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 1rem;
  }
`

const H2 = styled(Header2)`
  font-family: ${(props) => props.theme.fonts.monospace};
  text-transform: uppercase;

  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const H3 = styled(Header3)`
  margin-top: 3rem;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1rem;
    font-weight: 600;
  }
`

const H4 = styled(Header4)`
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1rem;
    font-weight: 600;
  }
`

const BackToTop = styled.div`
  margin-top: 3rem;
  display: flex;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  li: ListItem,
  pre: Codeblock,
  table: MarkdownTable,
  ButtonLink,
  InfoBanner,
  Card,
  Divider,
  SectionNav,
  Pill,
  CallToContribute,
  Emoji,
  DeveloperDocsLinks,
  YouTube,
}

const Contributors = styled(FileContributors)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-bottom: 2rem;
  }
`

const DocsPage = ({ data, pageContext }) => {
  const { isZenMode } = useContext(ZenModeContext)
  const mdx = data.pageData
  const { locale } = useIntl()
  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang)

  const tocItems = mdx.tableOfContents.items
  const isPageIncomplete = mdx.frontmatter.incomplete

  const { editContentUrl } = data.siteData.siteMetadata
  const { relativePath, slug } = pageContext
  const absoluteEditPath = `${editContentUrl}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <BannerNotification shouldShow={isPageIncomplete}>
        {/* TODO move to common.json */}
        <Translation id="banner-page-incomplete" />
      </BannerNotification>
      <ContentContainer isZenMode={isZenMode}>
        <Content>
          <H1 id="top">{mdx.frontmatter.title}</H1>
          <Contributors
            relativePath={relativePath}
            editPath={absoluteEditPath}
          />
          <TableOfContents
            slug={slug}
            editPath={absoluteEditPath}
            items={tocItems}
            isMobile={true}
            maxDepth={mdx.frontmatter.sidebarDepth}
          />
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          {isPageIncomplete && <CallToContribute editPath={absoluteEditPath} />}
          <BackToTop>
            <a href="#top">
              <Translation id="back-to-top" /> ↑
            </a>
          </BackToTop>
          {locale === "en" && <FeedbackCard />}
          <DocsNav relativePath={relativePath}></DocsNav>
        </Content>
        {mdx.frontmatter.sidebar && tocItems && (
          <DesktopTableOfContents
            slug={slug}
            editPath={absoluteEditPath}
            items={tocItems}
            isPageIncomplete={isPageIncomplete}
            maxDepth={mdx.frontmatter.sidebarDepth}
          />
        )}
      </ContentContainer>
    </Page>
  )
}

export const query = graphql`
  query DocsPageQuery($relativePath: String) {
    siteData: site {
      siteMetadata {
        editContentUrl
      }
    }
    pageData: mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        lang
        incomplete
        sidebar
        sidebarDepth
        isOutdated
      }
      body
      tableOfContents
    }
  }
`

export default DocsPage
