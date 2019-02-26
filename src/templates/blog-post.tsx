import React, { FC, ReactNode } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Players from '../components/Players'
import Content, { HTMLContent } from '../components/Content'
import { format } from 'date-fns'
import styled from 'styled-components'

const FlexWrapper = styled.span`
  display: flex;
  flex-flow: column wrap;
  * {
    margin: 1rem 0;
  }
`
const Info = styled.div`
  background: #f5f5f5;
  color: #555;
  padding: 0.35rem;
  margin-bottom: 1rem;
  border-radius: 3px;
`

type ContentProps = Partial<{
  className: string
  content: string
}>
export const BlogPostTemplate: FC<BlogPostTemplateProps> = ({
  content,
  contentComponent,
  subtitle,
  title,
  duration,
  location,
  date,
  image,
  helmet
}) => {
  const PostContent = (contentComponent || Content) as FC<ContentProps>
  return (
    <>
      <FlexWrapper
        className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${
            image && typeof image !== 'string' ? image.childImageSharp.fluid.src : image
          })`,
          backgroundPosition: `center center`,
          backgroundAttachment: `fixed`
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow: 'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em'
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow: 'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em'
          }}
        >
          {subtitle}
        </h3>
      </FlexWrapper>
      <section className="section">
        {helmet || ''}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Info>
                <div>
                  <strong>When:</strong> {date}
                </div>
                <div>
                  <strong>Where:</strong> {location}
                </div>
                <div>
                  <strong>How long:</strong> {duration} h
                </div>
              </Info>
              <PostContent content={content} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

type BlogPostTemplateProps = {
  content: string
  contentComponent: ReactNode
  subtitle: string
  title: string
  duration: string
  date: string
  location: string
  image: ImageSharp | string
  helmet: ReactNode
}

const BlogPost: FC<BlogPostProps> = ({ data }) => {
  const { markdownRemark: post } = data
  const formattedDate = format(post.frontmatter.date, 'YYYY-MM-DD')
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
        date={post.frontmatter.date}
        image={post.frontmatter.image}
        subtitle={post.frontmatter.subtitle}
        title={post.frontmatter.title}
        duration={String(post.frontmatter.duration)}
        location={post.frontmatter.location}
      />
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Players
                date={formattedDate}
                price={post.frontmatter.price}
                monzouser={post.frontmatter.monzouser}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

type ImageSharp = {
  childImageSharp: {
    fluid: {
      src: string
    }
  }
}

type BlogPostProps = {
  data: {
    markdownRemark: {
      id: string
      html: string
      frontmatter: {
        title: string
        subtitle: string
        date: string
        duration: number
        price: number
        location: string
        monzouser: string
        image: ImageSharp | string
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
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        subtitle
        date(formatString: "dddd, DD MMMM YYYY @ HH:mm")
        duration
        price
        location
        monzouser
      }
    }
  }
`
