import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulSimpleBlogPost')
    console.log('BlogPostTemplate post: ', JSON.stringify(post));
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')
    const { minutes: timeToRead } = readingTime(post?.body.body)
    
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target
        return (
           <GatsbyImage
              image={getImage(gatsbyImage)}
              alt={description}
           />
         )
        },
      },
    };

    return (
      <Layout location={this.props.location}>
        <div className={styles.container}>
          <span className={styles.meta}>
            {post.author?.name} &middot;{' '}
            <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
            {timeToRead} minute read
          </span>
          <div className={styles.article}>
            <div className={styles.body}>
              {post.body?.body}
            </div>
            <Tags tags={post.tags} />
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/blog/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/blog/${next.slug}`} rel="next">
                        {next.title} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug {
    contentfulSimpleBlogPost {
      slug
      id
      contentful_id
      title
      body {
        body
      } 
    }    
  }
`

// contentfulBlogPost(slug: { eq: $slug }) {
//       slug
//       title
//       author {
//         name
//       }
//       publishDate(formatString: "MMMM Do, YYYY")
//       rawDate: publishDate
//       heroImage {
//         gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
//         resize(height: 630, width: 1200) {
//           src
//         }
//       }
//       body {
//         raw
//
//       }
//       tags
//       description {
//         raw
//       }
//     }
//     previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
//       slug
//       title
//     }
//     next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
//       slug
//       title
//     }