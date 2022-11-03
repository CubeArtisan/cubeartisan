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

import ConfirmDeleteModal from '@cubeartisan/client/components/modals/ConfirmDeleteModal.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/DeckPropType.js').Deck} Deck
 */

/**
 * @typedef DeckDeleteModalProps
 * @property {string} deckID
 * @property {string?} [cubeID]
 * @property {string?} [nextURL]
 * @property {boolean} isOpen
 * @property {() => void} toggle
 */

/** @type {React.FC<DeckDeleteModalProps>} */
const DeckDeleteModal = ({ deckID, cubeID, nextURL, isOpen, toggle }) => {
  const confirm = async () => {
    const response = await csrfFetch(`/deck/${deckID}`, {
      method: 'DELETE',
      headers: {},
    });

    if (!response.ok) {
      console.error(response);
    } else if (nextURL) {
      window.location.href = nextURL;
    } else if (cubeID) {
      window.location.href = `/cube/${cubeID}/playtest`;
    } else {
      window.location.href = '/';
    }
  };

  return (
    <ConfirmDeleteModal
      toggle={toggle}
      submitDelete={confirm}
      isOpen={isOpen}
      text="Are you sure you wish to delete this deck? This action cannot be undone."
    />
  );
};
DeckDeleteModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  deckID: PropTypes.string.isRequired,
  cubeID: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  nextURL: PropTypes.string,
};
DeckDeleteModal.defaultProps = {
  nextURL: null,
  cubeID: null,
};
export default DeckDeleteModal;
