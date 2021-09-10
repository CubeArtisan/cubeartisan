import React from 'react';
import PropTypes from 'prop-types';

import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';

const AutocardLink = withAutocard('a');

const MarkdownCardLink = ({ name, cardID, dfc }) => {
  const idURL = encodeURIComponent(cardID ?? name);
  const details = { image_normal: `/card/${idURL}/image/redirect` };
  if (dfc) details.image_flip = `/card/${idURL}/image/flip`;

  return (
    <AutocardLink href={`/card/${idURL}`} card={{ details }} target="_blank" rel="noopener noreferrer">
      {name}
    </AutocardLink>
  );
};
MarkdownCardLink.propTypes = {
  name: PropTypes.string.isRequired,
  cardID: PropTypes.string.isRequired,
  dfc: PropTypes.bool,
};
MarkdownCardLink.defaultProps = {
  dfc: false,
};
export default MarkdownCardLink;
