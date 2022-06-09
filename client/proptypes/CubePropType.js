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

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').CardStatus} CardStatus
 * @typedef {import('@cubeartisan/client/components/contexts/TagContext.js').Tag} Tag
 */

/**
 * @typedef Step
 * @property {'pass'|'pick'|'trash'|'pickrandom'|'trashrandom'} action
 * @property {number?} amount
 */

/**
 * @typedef PackSpec
 * @property {string[]} slots
 * @property {Step[]?} steps
 */

/**
 * @typedef DraftFormat
 * @property {string} title
 * @property {string} markdown
 * @property {PackSpec[]} packs
 * @property {number} defaultSeats
 * @property {boolean} multiples
 */

/**
 * @typedef Cube
 * @property {string} _id
 * @property {string} name
 * @property {string} shortID
 * @property {string} owner
 * @property {boolean} isListed
 * @property {boolean} privatePrices
 * @property {boolean} isFeatured
 * @property {boolean} overrideCategory
 * @property {string} categoryOverride
 * @property {string[]} categoryPrefixes
 * @property {Card[]} cards
 * @property {Card[]} maybe
 * @property {Tag[]} tag_colors
 * @property {number} defaultDraftFormat
 * @property {number} numDecks
 * @property {string?} description
 * @property {string?} image_uri
 * @property {string?} image_artist
 * @property {string?} image_name
 * @property {string?} owner_name
 * @property {string?} date_updated
 * @property {string?} updated_string
 * @property {string[]?} default_sorts
 * @property {boolean?} default_show_unsorted
 * @property {number} card_count
 * @property {DraftFormat[]} draft_formats
 * @property {string[]} users_following
 * @property {CardStatus} defaultStatus
 * @property {'first'|'recent'} defaultPrinting
 * @property {boolean} disableNotifications
 * @property {number} schemaVersion
 * @property {string[]} basics
 * @property {string[]} tags
 * @property {string[]} cardOracles
 * @property {string[]} keywords
 * @property {string[]} categories
 */

const CubePropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shortID: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  isListed: PropTypes.bool.isRequired,
  privatePrices: PropTypes.bool.isRequired,
  isFeatured: PropTypes.bool.isRequired,
  overrideCategory: PropTypes.bool.isRequired,
  categoryOverride: PropTypes.string.isRequired,
  categoryPrefixes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  cards: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  maybe: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  // tag_colors
  defaultDraftFormat: PropTypes.number.isRequired,
  numDecks: PropTypes.number.isRequired,
  description: PropTypes.string,
  image_uri: PropTypes.string,
  image_artist: PropTypes.string,
  image_name: PropTypes.string,
  owner_name: PropTypes.string,
  date_updated: PropTypes.string,
  updated_string: PropTypes.string,
  defaultSorts: PropTypes.arrayOf(PropTypes.string.isRequired),
  default_show_unsorted: PropTypes.bool.isRequired,
  card_count: PropTypes.number.isRequired,
  // draft_formats
  users_following: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  // defaultStatus
  defaultPrinting: PropTypes.oneOf(['first', 'recent']),
  disableNotifications: PropTypes.bool.isRequired,
  schemaVersion: PropTypes.number.isRequired,
  basics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  cardOracles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
});
export default CubePropType;
