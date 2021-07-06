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

const CubeContext = createContext({
  cube: {},
  canEdit: false,
  cubeID: null,
  hasCustomImages: false,
  updateCubeCard: () => {},
  updateCubeCards: () => {},
});

export const CubeContextProvider = ({ initialCube, canEdit, ...props }) => {
  const [cube, setCube] = useState({
    ...initialCube,
    cards: initialCube.cards ? initialCube.cards.map((card, index) => ({ ...card, index })) : [],
  });

  const updateCubeCard = useCallback((index, newCard) => {
    setCube((currentCube) => {
      const newCube = { ...currentCube };
      newCube.cards = Array.from(newCube.cards);
      newCube.cards[index] = newCard;
      return newCube;
    });
  }, []);

  const updateCubeCards = useCallback((newCards) => {
    setCube((currentCube) => {
      const newCube = { ...currentCube };
      newCube.cards = Array.from(newCube.cards);
      for (const card of newCards) {
        newCube.cards[card.index] = card;
      }
      return newCube;
    });
  }, []);

  const cubeID = cube._id;

  const hasCustomImages = cube.cards.some(
    (card) => (card.imgUrl && card.imgUrl.length > 0) || (card.imgBackUrl && card.imgBackUrl.length > 0),
  );

  const value = { cube, canEdit, cubeID, hasCustomImages, setCube, updateCubeCard, updateCubeCards };

  return <CubeContext.Provider value={value} {...props} />;
};

CubeContextProvider.propTypes = {
  initialCube: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.object),
  }),
  canEdit: PropTypes.bool,
  cubeID: PropTypes.string.isRequired,
};

CubeContextProvider.defaultProps = {
  initialCube: {},
  canEdit: false,
};

export default CubeContext;
