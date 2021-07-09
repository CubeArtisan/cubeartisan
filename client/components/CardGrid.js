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
import PropTypes from 'prop-types';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

import { Row, Col } from 'reactstrap';

function cardImage(Tag, card, cardProps, linkDetails) {
  const cardTag = <Tag card={card} {...cardProps} />;
  if (linkDetails) return <a href={`/card/${card.details._id}`}>{cardTag}</a>;
  return cardTag;
}

const CardGrid = ({ cardList, Tag, colProps, cardProps, linkDetails, ...props }) => {
  return (
    <Row noGutters className="justify-content-center" {...props}>
      {cardList.map((card, cardIndex) => (
        <Col key={/* eslint-disable-line react/no-array-index-key */ cardIndex} {...colProps}>
          {cardImage(Tag, card, cardProps, linkDetails)}
        </Col>
      ))}
    </Row>
  );
};

CardGrid.propTypes = {
  cardList: PropTypes.arrayOf(CardPropType).isRequired,
  Tag: PropTypes.func.isRequired,
  colProps: PropTypes.shape({}),
  cardProps: PropTypes.shape({}),
  linkDetails: PropTypes.bool,
};

CardGrid.defaultProps = {
  colProps: null,
  cardProps: null,
  linkDetails: false,
};

export default CardGrid;
