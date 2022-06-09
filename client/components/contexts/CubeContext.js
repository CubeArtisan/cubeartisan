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

import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { getCubeId } from '@cubeartisan/client/utils/Util.js';

/**
 @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').Cube} Cube
 @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
*/

/**
 * @typedef CubeContextValue
 * @property {Cube} cube
 * @property {boolean} canEdit
 * @property {string} cubeID
 * @property {boolean} hasCustomImages
 * @property {((cube: Cube) => void) | ((replacer: (cube: Cube) => Cube) => void)} setCube
 * @property {(index: number, card: Card) => void} updateCubeCard
 * @property {(cards: Card[]) => void} updateCubeCards
 */

/** @returns {Cube} */
export const makeDefaultCube = () => ({
  _id: '',
  name: 'Unknown Cube',
  shortID: '404',
  owner: '',
  isListed: false,
  privatePrices: true,
  isFeatured: false,
  overrideCategory: false,
  categoryOverride: 'Vintage',
  categoryPrefixes: [],
  cards: [],
  maybe: [],
  tag_colors: [],
  defaultDraftFormat: -1,
  numDecks: 0,
  description: 'Cube was not found',
  image_uri: null,
  image_artist: null,
  image_name: null,
  owner_name: 'Anonymous',
  date_updated: null,
  updated_string: null,
  default_sorts: null,
  default_show_unsorted: true,
  card_count: 0,
  draft_formats: [],
  users_following: [],
  defaultStatus: 'Not Owned',
  defaultPrinting: 'recent',
  disableNotifications: true,
  schemaVersion: -1,
  basics: [],
  tags: [],
  cardOracles: [],
  keywords: [],
  categories: [],
});

/** @type {CubeContextValue} */
const DEFAULT_VALUE = {
  cube: makeDefaultCube(),
  canEdit: false,
  cubeID: '404',
  hasCustomImages: false,
  setCube: () => {},
  updateCubeCard: () => {},
  updateCubeCards: () => {},
};

const CubeContext = createContext(DEFAULT_VALUE);

/**
 * @typedef CubeContextProviderProps
 * @property {Cube} initialCube
 * @property {boolean} [canEdit]
 * @property {React.ReactNode} children
 */

/** @type {React.FC<CubeContextProviderProps>} */
export const CubeContextProvider = ({ initialCube, canEdit, children }) => {
  const [cube, setCube] = useState(
    /** @returns {Omit<Cube, 'cards'> & { cards: Card & { index: number } }} */
    () => ({
      ...initialCube,
      cards: initialCube.cards ? initialCube.cards.map((card, index) => ({ ...card, index })) : [],
    }),
  );

  const updateCubeCard = useCallback(
    /**
     * @param {number} index
     * @param {Card} newCard
     */
    (index, newCard) => {
      setCube((currentCube) => {
        const newCube = { ...currentCube };
        newCube.cards = Array.from(newCube.cards);
        newCube.cards[index] = newCard;
        return newCube;
      });
    },
    [],
  );

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

  const cubeID = getCubeId(cube);

  const hasCustomImages = cube.cards.some(
    /** @param {Card} card */
    (card) => (card.imgUrl && card.imgUrl.length > 0) || (card.imgBackUrl && card.imgBackUrl.length > 0),
  );

  const value = useMemo(
    () => ({ cube, canEdit: canEdit ?? false, cubeID, hasCustomImages, setCube, updateCubeCard, updateCubeCards }),
    [cube, canEdit, cubeID, hasCustomImages, setCube, updateCubeCard, updateCubeCards],
  );

  return <CubeContext.Provider value={value}>{children}</CubeContext.Provider>;
};
CubeContextProvider.propTypes = {
  initialCube: CubePropType.isRequired,
  canEdit: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
CubeContextProvider.defaultProps = {
  canEdit: false,
};
export default CubeContext;
