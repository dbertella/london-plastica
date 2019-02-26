import React, { FC, ReactNode } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Players from '../components/Players'
import Book from '../components/Book'
import Content, { HTMLContent } from '../components/Content'
import { format } from 'date-fns'

type ContentProps = Partial<{
  className: string
  content: string
}>
export const BlogPostTemplate: FC<BlogPostTemplateProps> = ({
  content,
  contentComponent,
  title,
  date,
  duration,
  location,
  price,
  helmet
}) => {
  const PostContent = (contentComponent || Content) as FC<ContentProps>
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {date}<span> &bull; </span>{duration} h
            </h1>
            <p>{title} {location}</p>
            <p>£ {price}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

type BlogPostTemplateProps = {
  content: string
  contentComponent: ReactNode
  title: string
  date: string
  duration: string
  location: string
  price: string
  helmet: ReactNode
}

const BlogPost: FC<BlogPostProps> = ({ data }) => {
  const { markdownRemark: post } = data
  const formattedDate = format(new Date(post.frontmatter.date), 'YYYY-MM-DD')
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Game">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        duration={String(post.frontmatter.duration)}
        price={String(post.frontmatter.price)}
        location={post.frontmatter.location}
      />
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Players date={formattedDate} />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Book date={formattedDate} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

type BlogPostProps = {
  data: {
    markdownRemark: {
      id: string
      html: string
      frontmatter: {
        date: string
        title: string
        duration: number
        price: number
        location: string
      }
    }
  }
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
        duration
        price
        location
      }
    }
  }
`
