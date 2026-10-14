import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

import * as heroStyles from '../components/hero.module.css'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    if (post == null) {
       return null;
    }
    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <GatsbyImage className={heroStyles.heroImage} alt={post.title} image={getImage(post.heroImage)} objectFit="contain" backgroundColor={post.heroBgColor}/>
            <h1 className="{heroStyles.heroDetails}">{post.title}</h1>
          </div>
          <div className="wrapper">
            <div>
		{documentToReactComponents(JSON.parse(post.body.raw), {
		renderNode: {
		    [BLOCKS.EMBEDDED_ASSET]: (node) => {
		    const id = node?.data?.target?.sys?.id;
		    const asset = post.body.references?.find((item) => item.contentful_id === id);

		    if (!asset?.file?.url) {
			console.warn("Missing Contentful asset:", id);
			return null;
		    }

		    const { url, contentType } = asset.file;
		    const mediaUrl = url.startsWith("//")
			? `https:${url}`
			: url;

		    if (contentType?.startsWith("image/")) {
			return (
			<img
			    src={mediaUrl}
			    title={asset.title || ""}
			    alt={asset.description || asset.title || ""}
			/>
			);
		    }

		    if (contentType?.startsWith("video/")) {
			return (
			<div className="embed-responsive embed-responsive-16by9">
			    <video controls>
			    <source src={mediaUrl} type={contentType} />
			    Your browser does not support HTML5 video.
			    </video>
			</div>
			);
		    }

		    return (
			<a href={mediaUrl}>
			{asset.title || "Open attached media"}
			</a>
		    );
		    },
                    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                    const id = node?.data?.target?.sys?.id;

                    const entry = post.body.references?.find(
                        (item) => item.contentful_id === id
                    );

                    if (!entry) {
                        console.warn("Missing embedded entry:", id);
                        return null;
                    }

                    const page = post.tags[0];

                    return (
                        <a href={`/blog/${page}/${entry.slug}`}>
                        {entry.title}
                        </a>
                    );
                    },
		},
		})}
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
    contentfulBlogPost(slug: { eq: $slug }, node_locale: { eq: $locale }, title:{ ne: null }) {
      title
      node_locale
      heroImage {
        gatsbyImageData(
          width: 1180
          layout: FULL_WIDTH
          resizingBehavior: SCALE
        )
      }
      heroBgColor
      tags
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            description
            file {
              url
              contentType
            }
          }
          ... on ContentfulBlogPost {
            contentful_id
            title
            slug
          }
        }
      }
    }
  }
`
