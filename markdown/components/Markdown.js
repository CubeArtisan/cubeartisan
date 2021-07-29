/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import React, { createElement, lazy } from 'react';
import PropTypes from 'prop-types';
import { a11yLight, a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs/index.js';
import { LinkIcon } from '@primer/octicons-react';
import { Row, Card, CardBody } from 'reactstrap';

import { LIMITED_PLUGINS, ALL_PLUGINS } from '@cubeartisan/markdown/plugins/index.js';
import { isInternalURL, isSamePageURL } from '@cubeartisan/markdown/plugins/utils.js';
import styled from '@cubeartisan/markdown/components/styledHelper.js';
import Suspense from '@cubeartisan/markdown/components/Suspense.js';

const ReactMarkdown = lazy(() => import('react-markdown'));
const Latex = lazy(() => import('react-latex'));
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const ChangelogSymbol = styled('span')`
  font-family: 'Lucida Console', Monaco, monospace;
`;

const renderBlockQuote = (node) => (
  <Card className="quote">
    <CardBody>{node.children}</CardBody>
  </Card>
);

const renderImage = (node) => <img className="markdown-image" src={node.src} alt={node.alt} title={node.title} />;

const renderLink = (ExternalLink) => {
  const RenderLink = ({ href, children, node }) => {
    const ref = href ?? '';

    if (isInternalURL(ref)) {
      // heading autolink
      if (node.data?.hChildren) {
        return (
          <a href={ref} className="heading-link">
            <LinkIcon size={16} className="link-icon" />
          </a>
        );
      }

      const props = isSamePageURL(ref) ? {} : { target: '_blank', rel: 'noopener noreferrer' };
      return (
        <a href={ref} {...props}>
          {children}
        </a>
      );
    }

    return (
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
      <ExternalLink href={ref}>{children}</ExternalLink>
    );
  };
  RenderLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node,
    node: PropTypes.shape({
      data: PropTypes.shape({
        hChildren: PropTypes.bool,
      }),
    }),
  };
  RenderLink.defaultProps = {
    children: null,
    node: { data: null },
  };
  return RenderLink;
};

const renderHeading = (node) => createElement(`h${node.level}`, node.node?.data?.hProperties ?? {}, node.children);

const renderCode = (node) => {
  const mode = getComputedStyle(document.body).getPropertyValue('--mode').trim();
  const style = mode === 'dark' ? a11yDark : a11yLight;

  return (
    <SyntaxHighlighter language={node.language || 'text'} style={style}>
      {node.value || ''}
    </SyntaxHighlighter>
  );
};

const renderTable = (node) => (
  <div className="table-responsive">
    <table className="table table-bordered">{node.children}</table>
  </div>
);

const renderMath = (node) => <Latex trusted={false} displayMode>{`$$ ${node.value} $$`}</Latex>;

const renderInlineMath = (node) => <Latex trusted={false}>{`$ ${node.value} $`}</Latex>;

const renderUserlink = (node) => {
  const name = node.value;
  return (
    <a href={`/user/${name}`} target="_blank" rel="noopener noreferrer">
      @{name}
    </a>
  );
};

const renderSymbol = (node) => {
  if (node.value === '->' || node.value === '→') {
    return <ChangelogSymbol className="badge badge-primary">→</ChangelogSymbol>;
  }
  if (node.value === '-') {
    return <ChangelogSymbol className="badge badge-danger">-</ChangelogSymbol>;
  }
  if (node.value === '+') {
    return <ChangelogSymbol className="badge badge-success">+</ChangelogSymbol>;
  }
  const symbol = node.value.replace('/', '-').toLowerCase();
  return <img src={`/content/symbols/${symbol}.png`} alt={symbol} className="mana-symbol-sm" />;
};

const renderCentering = (node) => <div className="centered-markdown">{node.children}</div>;

const renderCardrow = (node) => <Row className="cardRow">{node.children}</Row>;

const Markdown = ({ markdown, limited, CardLink, CardImage, ExternalLink }) => {
  const markdownStr = markdown?.toString() ?? '';
  const RENDERERS = {
    // overridden defaults
    link: renderLink(ExternalLink),
    linkReference: renderLink,
    image: renderImage,
    imageReference: renderImage,
    blockquote: renderBlockQuote,
    heading: renderHeading,
    code: renderCode,
    table: renderTable,
    // plugins
    math: renderMath,
    inlineMath: renderInlineMath,
    userlink: renderUserlink,
    symbol: renderSymbol,
    cardlink: CardLink,
    cardimage: CardImage,
    centering: renderCentering,
    cardrow: renderCardrow,
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactMarkdown className="markdown" plugins={limited ? LIMITED_PLUGINS : ALL_PLUGINS} renderers={RENDERERS}>
        {markdownStr}
      </ReactMarkdown>
    </Suspense>
  );
};
Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  limited: PropTypes.bool,
  CardLink: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  CardImage: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  ExternalLink: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
Markdown.defaultProps = {
  ExternalLink: 'a',
};
Markdown.defaultProps = {
  limited: false,
};

export default Markdown;
