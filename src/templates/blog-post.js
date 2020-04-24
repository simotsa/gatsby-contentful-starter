import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { renderToStaticMarkup } from 'react-dom/server'

function renderMedia(file) {
  if (file.contentType === 'video/mp4') {
    return (
      <div className='embed-responsive embed-responsive-16by9' style={vidStyle}>
        <video controls>
          <source src={file.url} type='video/mp4'/>
          <p>Your browser doesnt support HTML5 video.</p>
        </video>
      </div>
    )
  } else if (file.contentType === 'image/jpeg') {
    return (<img class="img-fluid" src={file.url} />)
  } else {
    return (<p>Unknown content type</p>)
  }
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const options = { renderNode: { 'embedded-asset-block': (node) => { 
        let file = node.data.target.fields.file
        let jsx = renderMedia(file)
        let markup = renderToStaticMarkup(jsx)
        return markup
    }}}

    if (post == null) {
       return null;
    }
    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <Img className={heroStyles.heroImage} alt={post.title} fluid={post.heroImage.fluid} />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <div>
            {documentToReactComponents(JSON.parse(post.body.body),{ renderNode: {
                  [BLOCKS.EMBEDDED_ASSET]: (node) => {
                    const { title, description, file } = node.data.target.fields;
                    const mimeType = file[post.node_locale].contentType
                    const mimeGroup = mimeType.split('/')[0]
                    switch (mimeGroup) {
                        case 'image':
                        return <img
                            title={ title ? title[post.node_locale] : null}
                            alt={description ?  description[post.node_locale] : null}
                            src={file[post.node_locale].url}
                        />
                        case 'application':
                        return <a
                            alt={description ?  description[post.node_locale] : null}
                            href={file[post.node_locale].url}
                            >{ title ? title[post.node_locale] : file[post.node_locale].details.fileName }
                        </a>
                        default:
                        return <span style={{backgroundColor: 'red', color: 'white'}}> {mimeType} embedded asset </span>
                    }
                  }
              }})
            }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }, node_locale: { eq: $locale }, body:{body: { ne: null }}, title:{ ne: null }) {
      title
      node_locale
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        body
      }
    }
  }
`
