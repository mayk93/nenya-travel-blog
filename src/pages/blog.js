import React from 'react'
import {graphql} from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class BlogIndex extends React.Component {
    render() {
        const posts = get(this, 'props.data.allContentfulBlogPost.nodes');
        if (!posts || !posts.length) return <Layout location={this.props.location}>No Posts ATM</Layout>

        return (
            <Layout location={this.props.location}>
                <Seo title="Blog"/>
                <Hero title="Blog"/>
                <ArticlePreview posts={posts}/>
            </Layout>
        )
    }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
      allContentfulSimpleBlogPost {
        nodes {
          slug
          id
          title
          body {
            body
          }
        }
      }
  }
`

// allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
//   nodes {
//     title
//     slug
//     publishDate(formatString: "MMMM Do, YYYY")
//     tags
//     heroImage {
//       gatsbyImage(
//         layout: FULL_WIDTH
//         placeholder: BLURRED
//         width: 424
//         height: 212
//       )
//     }
//     description {
//       raw
//     }
//   }
// }
