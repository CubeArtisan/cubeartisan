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
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

import { sortDeep } from '@cubeartisan/client/utils/Sort.js';

import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';
import SpoilerImage from '@cubeartisan/client/components/SpoilerImage.js';
import CardGrid from '@cubeartisan/client/components/CardGrid.js';
import SetCardsInRow from '@cubeartisan/client/components/SetCardsInRow.js';

const VisualSpoiler = ({ cards }) => {
  const { primary, secondary, tertiary, quaternary, showOther } = useContext(SortContext);
  const sorted = sortDeep(cards, showOther, quaternary, primary, secondary, tertiary);
  const cardList = sorted
    .map((tuple1) => tuple1[1].map((tuple2) => tuple2[1].map((tuple3) => tuple3[1].map((card) => card))))
    .flat(4);

  return (
    <>
      <SetCardsInRow />
      <CardGrid cardList={cardList} Tag={SpoilerImage} />
    </>
  );
};

VisualSpoiler.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
};
export default VisualSpoiler;
