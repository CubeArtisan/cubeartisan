import React from 'react';
import { Markdown as GenericMarkdown } from '@cubeartisan/markdown';

import ExternalLink from '@cubeartisan/client/components/markdown/ExternalLink.js';
import MarkdownCardImage from '@cubeartisan/client/components/markdown/MarkdownCardImage.js';
import MarkdownCardLink from '@cubeartisan/client/components/markdown/MarkdownCardLink.js';
import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary.js';

const Markdown = (props) => (
  <ErrorBoundary>
    <GenericMarkdown {...props} ExternalLink={ExternalLink} CardImage={MarkdownCardImage} CardLink={MarkdownCardLink} />
  </ErrorBoundary>
);

export default Markdown;
