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
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import styled from '@cubeartisan/client/utils/styledHelper.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';

function cardImage(Tag, card, cardProps, linkDetails) {
  const cardTag = <Tag card={card} {...cardProps} />;
  if (linkDetails) return <a href={`/card/${card.details._id}`}>{cardTag}</a>;
  return cardTag;
}

export const FixedCol = styled(Col)`
  flex: 0 0 ${({ cardsinrow }) => 100 / cardsinrow}%;
  max-width: ${({ cardsinrow }) => 100 / cardsinrow}%;
`;

const CardGrid = ({ cardList, Tag, colProps, cardProps, linkDetails, ...props }) => {
  const { cardsInRow } = useContext(DisplayContext);
  return (
    <Row noGutters className="justify-content-center" {...props}>
      {cardList.map((card, cardIndex) => (
        <FixedCol
          key={/* eslint-disable-line react/no-array-index-key */ cardIndex}
          {...colProps}
          cardsinrow={cardsInRow}
        >
          {cardImage(Tag, card, cardProps, linkDetails)}
        </FixedCol>
      ))}
    </Row>
  );
};

CardGrid.propTypes = {
  cardList: PropTypes.arrayOf(CardPropType).isRequired,
  Tag: PropTypes.node.isRequired,
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
