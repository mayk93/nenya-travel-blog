import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulSimpleBlogPost.nodes');
    if (!posts || !posts.length) return <Layout location={this.props.location}>No Posts ATM</Layout>

    return (
      <Layout location={this.props.location}>
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
      allContentfulSimpleBlogPost {
        nodes {
          id
          slug
          title
          body {
            body
          }
        }
        totalCount
      }
    }
`

// Test
// allContentfulBlogPost {
//         edges {
//           node {
//             id
//             contentful_id
//           }
//         }
//         nodes {
//           contentful_id
//           id
//         }
//       }

