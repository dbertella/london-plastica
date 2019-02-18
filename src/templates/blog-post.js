import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import netlifyIdentity from 'netlify-identity-widget'

const generateHeaders = () => {
  const headers = { 'Content-Type': 'application/json' }
  if (netlifyIdentity.currentUser()) {
    return netlifyIdentity
      .currentUser()
      .jwt()
      .then(token => {
        return { ...headers, Authorization: `Bearer ${token}` }
      })
  }
  return Promise.resolve(headers)
}

export const BlogPostTemplate = ({
  content,
  contentComponent,
  title,
  date,
  duration,
  helmet
}) => {
  const PostContent = contentComponent || Content
  const imIn = () =>
    generateHeaders().then(headers =>
      fetch('/.netlify/functions/test', { headers })
        .then(response => response.json())
        .then(r => console.log(r))
    )
  const imOut = () =>
    generateHeaders().then(headers =>
      fetch('/.netlify/functions/test', { headers })
        .then(response => response.json())
        .then(r => console.log(r))
    )
  const getAll = () =>
    generateHeaders().then(headers =>
      fetch('/.netlify/functions/get-all', { headers })
        .then(response => response.json())
        .then(r => console.log(r))
    )
  const getAllByDate = () =>
    generateHeaders().then(headers =>
      fetch('/.netlify/functions/get-all-by-date', { headers })
        .then(response => response.json())
        .then(r => console.log(r))
    )

  // React.useEffect(() => {
  //   netlifyIdentity.init()
  // }, [])

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{date}</p>
            <p>{duration} h</p>
            <PostContent content={content} />

            <button onClick={imIn}>I'm in</button>
            <button onClick={imOut}>Not available</button>
            <button onClick={getAll}>Get all</button>
            <button onClick={getAllByDate}>Get by date</button>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  duration: PropTypes.string,
  helmet: PropTypes.object
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(data)
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        duration={post.frontmatter.duration}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY HH:mm")
        title
        description
        duration
      }
    }
  }
`
