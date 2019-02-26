import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'
import { format } from 'date-fns'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const formattedDate = format(entry.getIn(['data', 'title']), 'dddd D MMMM YYYY')
  return (
  <BlogPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    title={formattedDate}
    duration={entry.getIn(['data', 'duration'])}
    location={entry.getIn(['data', 'location'])}
    price={entry.getIn(['data', 'price'])}
    image={entry.getIn(['data', 'image'])}
    monzouser={entry.getIn(['data', 'monzouser'])}
  />
)}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
