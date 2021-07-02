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

const BlogDeleteModal = ({ isOpen, toggle, postID }) => {
  const confirm = async () => {
    const response = await csrfFetch(`/cube/blog/remove/${postID}`, {
      method: 'DELETE',
      headers: {},
    });

    if (!response.ok) {
      console.log(response);
    } else {
      window.location.href = '';
    }
  };

  return (
    <ConfirmDeleteModal
      toggle={toggle}
      submitDelete={confirm}
      isOpen={isOpen}
      text="Are you sure you wish to delete this post? This action cannot be undone."
    />
  );
};

BlogDeleteModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default BlogDeleteModal;
