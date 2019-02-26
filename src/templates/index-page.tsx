import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import styled from 'styled-components'

const FlexWrapper = styled.span`
  display: flex;
  flex-flow: column wrap;
  * {
    margin: 1rem 0;
  }
`

export const IndexPageTemplate: FC<IndexPageTemplateProps> = ({
  image,
  title,
  subheading,
  mainpitch
}) => (
  <div>
    <FlexWrapper
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          typeof image !== 'string' ? image.childImageSharp.fluid.src : image
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
        {subheading}
      </h3>
    </FlexWrapper>
    <section className="section section--gradient">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="tile">
              <h1 className="title">{mainpitch.title}</h1>
            </div>
            <div className="tile">
              <h3 className="subtitle">{mainpitch.description}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="column is-10 is-offset-1">
        <h3 className="has-text-weight-semibold is-size-2">Next Matches</h3>
        <BlogRoll />
        <div className="column is-12 has-text-centered">
          <Link className="btn" to="/blog">
            Check them all
          </Link>
        </div>
      </div>
    </section>
  </div>
)

type ImageSharp = {
  childImageSharp: {
    fluid: {
      src: string
    }
  }
}

type IndexPageTemplateProps = {
  image: ImageSharp | string
  title: string
  subheading: string
  mainpitch: {
    title: string
    description: string
  }
}

const IndexPage: FC<IndexPageProps> = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
      />
    </Layout>
  )
}

type IndexPageProps = {
  data: {
    markdownRemark: {
      frontmatter: any
    }
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subheading
        mainpitch {
          title
          description
        }
      }
    }
  }
`
