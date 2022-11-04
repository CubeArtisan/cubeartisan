import { Link } from '@mui/material';
import PropTypes from 'prop-types';

import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import { makeDefaultCard } from '@cubeartisan/client/utils/Card.js';

const AutocardLink = withAutocard(Link);

const MarkdownCardLink = ({ name, cardID, dfc }) => {
  const urlId = cardID ?? name ?? 'test';
  const idURL = encodeURIComponent(urlId);

  const card = makeDefaultCard();

  card.details.image_normal = `/card/${idURL}/image/redirect`;
  if (dfc) card.details.image_flip = `/card/${idURL}/image/flip`;
  card.cardID = cardID ?? card.cardID;

  return (
    <AutocardLink href={`/card/${idURL}`} card={card} target="_blank" rel="noopener noreferrer">
      {name}
    </AutocardLink>
  );
};
MarkdownCardLink.propTypes = {
  name: PropTypes.string.isRequired,
  cardID: PropTypes.string,
  dfc: PropTypes.bool,
};
MarkdownCardLink.defaultProps = {
  dfc: false,
  cardID: null,
};
export default MarkdownCardLink;
