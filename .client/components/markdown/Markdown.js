import GenericMarkdown from '@cubeartisan/markdown';

import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import ExternalLink from '@cubeartisan/client/components/markdown/ExternalLink.js';
import MarkdownCardImage from '@cubeartisan/client/components/markdown/MarkdownCardImage.js';
import MarkdownCardLink from '@cubeartisan/client/components/markdown/MarkdownCardLink.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';

const Markdown = (props) => (
  <ErrorBoundary>
    <Suspense>
      <GenericMarkdown
        {...props}
        renderExternalLink={ExternalLink}
        renderCardImage={MarkdownCardImage}
        renderCardLink={MarkdownCardLink}
      />
    </Suspense>
  </ErrorBoundary>
);

export default Markdown;
