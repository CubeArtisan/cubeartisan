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
import { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import CardPropType from '@hypercube/client/proptypes/CardPropType';

const MaybeboardContext = createContext({
  maybeboard: [],
  addCard: () => {},
  removeCard: () => {},
  updateCard: () => {},
});

export const MaybeboardContextProvider = ({ initialCards, ...props }) => {
  const [maybeboard, setMaybeboard] = useState([...initialCards]);

  const addMaybeboardCard = useCallback((card) => {
    setMaybeboard((current) => [...current, card]);
  }, []);
  const removeMaybeboardCard = useCallback((removeIndex) => {
    setMaybeboard((current) => current.filter((card, index) => index !== removeIndex));
  }, []);
  const updateMaybeboardCard = useCallback((updatedCard) => {
    setMaybeboard((current) => {
      const newMaybeboard = [...current];
      const index = newMaybeboard.findIndex((card) => card._id === updatedCard._id);
      if (index > 0) {
        newMaybeboard[index] = updatedCard;
      }
      return newMaybeboard;
    });
  }, []);

  const value = { maybeboard, addMaybeboardCard, removeMaybeboardCard, updateMaybeboardCard };

  return <MaybeboardContext.Provider value={value} {...props} />;
};

MaybeboardContextProvider.propTypes = {
  initialCards: PropTypes.arrayOf(CardPropType).isRequired,
};

export default MaybeboardContext;
