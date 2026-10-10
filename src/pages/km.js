import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styles from './blog.module.css'
import Layout from "../components/layout"
import ArticlePreview from '../components/article-preview'

class KMIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const idx = get(this, 'props.data.contentfulAsset')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            <GatsbyImage className={styles.heroImage} alt={idx.title} image={getImage(idx)} />
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

export default KMIndex

export const pageQuery = graphql`
  query KMIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC },filter: {node_locale: {eq: "en-US"}, tags: {in: "km"}}) {
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
    contentfulAsset(title: {eq: "km-index"}) {
      title
      gatsbyImageData(width: 1180)
    }
  }
`

