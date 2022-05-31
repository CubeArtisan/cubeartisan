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
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

function cardImage(Tag, card, cardProps, linkDetails) {
  const cardTag = <Tag card={card} {...cardProps} />;
  if (linkDetails) return <a href={`/card/${card.details._id}`}>{cardTag}</a>;
  return cardTag;
}

const CardGrid = ({ cardList, Tag, cardProps, linkDetails }) => {
  const { cardsInRow } = useContext(DisplayContext);
  return (
    <Grid container spacing={0} columns={cardsInRow}>
      {cardList.map((card, cardIndex) => (
        <Grid item xs={1} key={/* eslint-disable-line react/no-array-index-key */ cardIndex}>
          {cardImage(Tag, card, cardProps, linkDetails)}
        </Grid>
      ))}
    </Grid>
  );
};
CardGrid.propTypes = {
  cardList: PropTypes.arrayOf(CardPropType).isRequired,
  Tag: PropTypes.node.isRequired,
  cardProps: PropTypes.shape({}),
  linkDetails: PropTypes.bool,
};
CardGrid.defaultProps = {
  cardProps: null,
  linkDetails: false,
};
export default CardGrid;
