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
import { useContext } from 'react';

import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 */

/**
 * @template TagProps
 * @typedef TagWithProps
 * @property {React.ComponentType<TagProps>} Tag
 * @property {Omit<TagProps, 'card'>} tagProps
 */

/**
 * @template TagProps
 * @param {Card} card
 * @param {TagWithProps<TagProps>} tagWithProps
 * @param {boolean} [linkDetails]
 */
function cardImage(card, tagWithProps, linkDetails = false) {
  const { Tag, tagProps } = tagWithProps;
  // @ts-ignore
  const cardTag = <Tag card={card} {...tagProps} />;
  if (linkDetails) return <a href={`/card/${card.details._id}`}>{cardTag}</a>;
  return cardTag;
}

/**
 * @typedef CardGridPropsNoTag
 * @property {Card[]} cardList
 * @property {boolean} [linkDetails]
 */

/**
 * @template TagProps
 * @type {React.FC<CardGridPropsNoTag & TagWithProps<TagProps>>}
 */
const CardGrid = ({ cardList, Tag, tagProps, linkDetails }) => {
  const { cardsInRow } = useContext(DisplayContext);
  return (
    <Grid container spacing={0} columns={cardsInRow}>
      {cardList.map((card, cardIndex) => (
        <Grid item xs={1} key={/* eslint-disable-line react/no-array-index-key */ cardIndex}>
          {cardImage(card, { Tag, tagProps }, linkDetails)}
        </Grid>
      ))}
    </Grid>
  );
};
CardGrid.propTypes = {
  // @ts-ignore
  cardList: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  // @ts-ignore
  Tag: PropTypes.elementType.isRequired,
  // @ts-ignore
  tagProps: PropTypes.shape({}),
  linkDetails: PropTypes.bool,
};
CardGrid.defaultProps = {
  // @ts-ignore
  tagProps: {},
  linkDetails: false,
};
export default CardGrid;
