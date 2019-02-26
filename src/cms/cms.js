import React from 'react'
import CMS from 'netlify-cms'
import { CSSInjector } from './CSSInjector'

import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerPreviewTemplate('index', props => (
  <CSSInjector>
    <IndexPagePreview {...props} />
  </CSSInjector>
))

CMS.registerPreviewTemplate('match', props => (
  <CSSInjector>
    <BlogPostPreview {...props} />
  </CSSInjector>
))

