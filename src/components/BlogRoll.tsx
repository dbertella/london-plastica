import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { format } from 'date-fns'

type BlogRollProps = {
  data: {
    allMarkdownRemark: {
      edges: { node: EdgeNode }[]
    }
  }
}
class BlogRoll extends React.Component<BlogRollProps, {}> {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article className="tile is-child box notification">
                <div>
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {format(post.frontmatter.title, 'dddd D MMMM YYYY')}
                    <span> &bull; </span>
                    {post.frontmatter.duration} h
                  </Link>
                  <br />
                  <p className="subtitle is-size-5">
                    {post.frontmatter.subtitle} {post.frontmatter.location}
                  </p>
                </div>
                <div>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Book your spot →
                  </Link>
                </div>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

type EdgeNode = {
  excerpt: string
  id: string
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    templateKey: string
    subtitle: string
    duration: string
    location: string
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___title] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                subtitle
                templateKey
                title
                duration
                location
              }
            }
          }
        }
      }
    `}
    // @ts-ignore
    render={(data: BlogRollProps, count: number) => (
      // @ts-ignore
      <BlogRoll data={data} count={count} />
    )}
  />
)
