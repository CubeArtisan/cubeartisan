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
import { createElement } from 'react';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';
import Latex from 'react-latex';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight, a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs/index.js';
import { LinkIcon } from '@primer/octicons-react';

import { LIMITED_PLUGINS, ALL_PLUGINS } from '@cubeartisan/client/markdown/parser.js';

import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import LinkModal from '@cubeartisan/client/components/modals/LinkModal.js';
import FoilCardImage from '@cubeartisan/client/components/FoilCardImage.js';
import { isInternalURL, isSamePageURL } from '@cubeartisan/client/utils/Util.js';

import { Col, Row, Card, CardBody } from 'reactstrap';

const AutocardLink = withAutocard('a');
const Link = withModal('a', LinkModal);

const renderBlockQuote = (node) => (
  <Card className="quote">
    <CardBody>{node.children}</CardBody>
  </Card>
);

const renderImage = (node) => <img className="markdown-image" src={node.src} alt={node.alt} title={node.title} />;

const renderLink = (node) => {
  const ref = node.href ?? '';

  if (isInternalURL(ref)) {
    // heading autolink
    if (node.node.data?.hChildren) {
      return (
        <a href={ref} className="heading-link">
          <LinkIcon size={16} className="link-icon" />
        </a>
      );
    }

    const props = isSamePageURL(ref) ? {} : { target: '_blank', rel: 'noopener noreferrer' };
    return (
      <a href={ref} {...props}>
        {node.children}
      </a>
    );
  }

  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <Link href={`/leave?url=${encodeURIComponent(ref)}`} modalProps={{ link: ref }}>
      {node.children}
    </Link>
  );
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
  const symbol = node.value.replace('/', '-').toLowerCase();
  return <img src={`/content/symbols/${symbol}.png`} alt={symbol} className="mana-symbol-sm" />;
};

const renderCardlink = ({ name, id, dfc }) => {
  const idURL = encodeURIComponent(id);
  const details = { image_normal: `/card/${idURL}/image/redirect` };
  if (dfc) details.image_flip = `/card/${idURL}/flip/image`;

  return (
    <AutocardLink href={`/tool/card/${idURL}`} card={{ details }} target="_blank" rel="noopener noreferrer">
      {name}
    </AutocardLink>
  );
};

const renderCardImage = (node) => {
  const idURL = encodeURIComponent(node.id);
  const details = { image_normal: `/card/${idURL}image/redirect` };
  if (node.dfc) details.image_flip = `/card/${idURL}/flip/image`;

  return (
    <Col className="card-image" xs="6" md="4" lg="3">
      <a href={`/card/${idURL}`} target="_blank" rel="noopener noreferrer">
        <FoilCardImage autocard card={{ details }} className="clickable" />
      </a>
    </Col>
  );
};

const renderCentering = (node) => <div className="centered-markdown">{node.children}</div>;

const renderCardrow = (node) => <Row className="cardRow">{node.children}</Row>;

const RENDERERS = {
  // overridden defaults
  link: renderLink,
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
  cardlink: renderCardlink,
  cardimage: renderCardImage,
  centering: renderCentering,
  cardrow: renderCardrow,
};

const Markdown = ({ markdown, limited }) => {
  const markdownStr = markdown?.toString() ?? '';
  return (
    <ReactMarkdown className="markdown" plugins={limited ? LIMITED_PLUGINS : ALL_PLUGINS} renderers={RENDERERS}>
      {markdownStr}
    </ReactMarkdown>
  );
};

renderCardlink.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dfc: PropTypes.bool,
};

renderCardlink.defaultProps = {
  dfc: false,
};

Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  limited: PropTypes.bool,
};

Markdown.defaultProps = {
  limited: false,
};

export default Markdown;
