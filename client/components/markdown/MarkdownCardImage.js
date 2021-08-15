import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

import FoilCardImage from '@cubeartisan/client/components/FoilCardImage.js';

const MarkdownCardImage = ({ id, dfc }) => {
  const idURL = encodeURIComponent(id);
  const details = { image_normal: `/card/${idURL}image/redirect` };
  if (dfc) details.image_flip = `/card/${idURL}/image/flip`;

  return (
    <Col className="card-image" xs="6" md="4" lg="3">
      <a href={`/card/${idURL}`} target="_blank" rel="noopener noreferrer">
        <FoilCardImage autocard card={{ details }} className="clickable" />
      </a>
    </Col>
  );
};
MarkdownCardImage.propTypes = {
  id: PropTypes.string.isRequired,
  dfc: PropTypes.bool,
};
MarkdownCardImage.defaultProps = {
  dfc: false,
};
export default MarkdownCardImage;
