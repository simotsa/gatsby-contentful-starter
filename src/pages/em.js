import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as styles from './blog.module.css'
import Layout from "../components/layout"
import ArticlePreview from '../components/article-preview'

class EMIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const page = get(this, 'props.data.contentfulPage')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            <GatsbyImage className={styles.heroImage} alt={page.title} image={getImage(page.hero)} />
          </div>
          <div className="wrapper">
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default EMIndex

export const pageQuery = graphql`
  query EMIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
       sort: {publishDate: DESC},
       filter: {node_locale: {eq: "en-US"}, tags: {in: "em"}}
    ) {
      edges {
        node {
          title
          slug
          node_locale
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            gatsbyImageData(
              width: 350
              height: 196
              resizingBehavior: SCALE
              placeholder: TRACED_SVG
            )
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    contentfulPage(title: { eq: "em-tab" })
    {
      title
      hero {
        gatsbyImageData(width: 1180)
      }
    }
  }
`
