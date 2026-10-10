import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={author.node} />
          <div className="wrapper">
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.id}>
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

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC },filter: {title: {ne: null},tags: {in: "general"},node_locale: {eq: "en-US"}}) {
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
    allContentfulPerson(filter: { name: { eq: "index" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          image {
            gatsbyImageData(
              width: 1180
              height: 480
              resizingBehavior: PAD
              backgroundColor: "#000000"
              placeholder: TRACED_SVG
            )
          }
          address
          phone
        }
      }
    }
  }
`
