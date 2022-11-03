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

import CardLegalitiesPropType from '@cubeartisan/client/proptypes/CardLegalitiesPropType.js';
import CardPricesPropType from '@cubeartisan/client/proptypes/CardPricePropType.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPricePropType.js').CardPrices} CardPrices
 * @typedef {import('@cubeartisan/client/proptypes/CardLegalitiesPropType.js').CardLegalities} CardLegalities
 * @typedef {'W'|'U'|'B'|'R'|'G'} Color
 */

/**
 * @typedef CardDetails
 * @property {Color[]} color_identity
 * @property {string} set
 * @property {string} set_name
 * @property {boolean} foil
 * @property {boolean} nonfoil
 * @property {string} collector_number
 * @property {string} released_at
 * @property {boolean} reprint
 * @property {boolean} promo
 * @property {CardPrices} prices
 * @property {number} elo
 * @property {boolean} digital
 * @property {boolean} isToken
 * @property {string} border_color
 * @property {string} name
 * @property {string} name_lower
 * @property {string} full_name
 * @property {string?} artist
 * @property {string} scryfall_uri
 * @property {string} rarity
 * @property {string?} oracle_text
 * @property {string} _id
 * @property {string} oracle_id
 * @property {number} cmc
 * @property {CardLegalities} legalities
 * @property {string[]} parsed_cost
 * @property {Color[]?} colors
 * @property {string} type
 * @property {boolean} full_art
 * @property {string} language
 * @property {number?} mtgo_id
 * @property {string} layout
 * @property {number?} tcgplayer_id
 * @property {string?} loyalty
 * @property {string?} power
 * @property {string?} toughness
 * @property {string?} image_small
 * @property {string?} image_normal
 * @property {string?} art_crop
 * @property {string?} image_flip
 * @property {string} color_category
 * @property {string[]?} tokens
 * @property {number} popularity
 * @property {number} cubeCount
 * @property {number} pickCount
 */

const CardDetailsPropType = PropTypes.shape({
  color_identity: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  set: PropTypes.string.isRequired,
  set_name: PropTypes.string.isRequired,
  foil: PropTypes.bool.isRequired,
  nonfoil: PropTypes.bool.isRequired,
  collector_number: PropTypes.string.isRequired,
  released_at: PropTypes.string.isRequired,
  reprint: PropTypes.bool.isRequired,
  promo: PropTypes.bool.isRequired,
  prices: CardPricesPropType.isRequired,
  elo: PropTypes.number.isRequired,
  digital: PropTypes.bool.isRequired,
  isToken: PropTypes.bool.isRequired,
  border_color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  name_lower: PropTypes.string.isRequired,
  full_name: PropTypes.string.isRequired,
  artist: PropTypes.string,
  scryfall_uri: PropTypes.string.isRequired,
  rarity: PropTypes.string.isRequired,
  oracle_text: PropTypes.string,
  _id: PropTypes.string.isRequired,
  oracle_id: PropTypes.string.isRequired,
  cmc: PropTypes.number.isRequired,
  legalities: CardLegalitiesPropType.isRequired,
  parsed_cost: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  colors: PropTypes.arrayOf(PropTypes.oneOf(Array.from('WUBRG')).isRequired),
  type: PropTypes.string,
  full_art: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  mtgo_id: PropTypes.number,
  layout: PropTypes.string.isRequired,
  tcgplayer_id: PropTypes.number,
  loyalty: PropTypes.string,
  power: PropTypes.string,
  toughness: PropTypes.string,
  image_small: PropTypes.string,
  image_normal: PropTypes.string,
  art_crop: PropTypes.string,
  image_flip: PropTypes.string,
  color_category: PropTypes.string.isRequired,
  tokens: PropTypes.arrayOf(PropTypes.string.isRequired),
  popularity: PropTypes.number.isRequired,
  cubeCount: PropTypes.number.isRequired,
  pickCount: PropTypes.number.isRequired,
});
export default CardDetailsPropType;
