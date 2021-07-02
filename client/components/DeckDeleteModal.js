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

import { csrfFetch } from '@cubeartisan/client/utils/CSRF';

import ConfirmDeleteModal from '@cubeartisan/client/components/ConfirmDeleteModal';

const DeckDeleteModal = ({ deckID, cubeID, nextURL, isOpen, toggle }) => {
  const confirm = async () => {
    const response = await csrfFetch(`/cube/deck/deletedeck/${deckID}`, {
      method: 'DELETE',
      headers: {},
    });

    if (!response.ok) {
      console.log(response);
    } else if (nextURL) {
      window.location.href = nextURL;
    } else {
      window.location.href = `/cube/playtest/${cubeID}`;
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
  cubeID: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  nextURL: PropTypes.string,
};

DeckDeleteModal.defaultProps = {
  nextURL: null,
};

export default DeckDeleteModal;
