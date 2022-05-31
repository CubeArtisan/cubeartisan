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
import { createContext, useCallback, useMemo, useState } from 'react';

import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef MaybeboardContextValue
 * @property {(card: Card) => void} addMaybeboardCard
 * @property {(cardIdx: number) => void} removeMaybeboardCard
 * @property {(card: Card) => void} updateMaybeboardCard
 * @property {Card[]} maybeboard
 * @type {React.Context<MaybeboardContextValue>}
 */
const MaybeboardContext = createContext({
  maybeboard: [],
  addMaybeboardCard: () => {},
  removeMaybeboardCard: () => {},
  updateMaybeboardCard: () => {},
});

export const MaybeboardContextProvider = ({ initialCards, ...props }) => {
  const [maybeboard, setMaybeboard] = useState(Array.from(initialCards));

  const addMaybeboardCard = useCallback((card) => {
    setMaybeboard((current) => [...current, card]);
  }, []);
  const removeMaybeboardCard = useCallback((removeIndex) => {
    setMaybeboard((current) => current.filter((card, index) => index !== removeIndex));
  }, []);
  const updateMaybeboardCard = useCallback((updatedCard) => {
    setMaybeboard((current) => {
      const newMaybeboard = Array.from(current);
      const index = newMaybeboard.findIndex((card) => card._id === updatedCard._id);
      if (index > 0) {
        newMaybeboard[index] = updatedCard;
      }
      return newMaybeboard;
    });
  }, []);

  const value = useMemo(
    () => ({ maybeboard, addMaybeboardCard, removeMaybeboardCard, updateMaybeboardCard }),
    [maybeboard, addMaybeboardCard, removeMaybeboardCard, updateMaybeboardCard],
  );

  return <MaybeboardContext.Provider value={value} {...props} />;
};
MaybeboardContextProvider.propTypes = {
  initialCards: PropTypes.arrayOf(CardPropType).isRequired,
};

export default MaybeboardContext;
