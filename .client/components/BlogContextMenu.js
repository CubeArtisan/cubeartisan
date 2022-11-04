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
import { Component } from 'react';

import StyledButtonMenu from '@cubeartisan/client/components/inputs/StyledButtonMenu.js';
import BlogDeleteModal from '@cubeartisan/client/components/modals/BlogDeleteModal.js';

class BlogContextMenu extends Component {
  constructor(props) {
    super(props);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.state = {
      deleteModalOpen: false,
    };
  }

  toggleDeleteModal() {
    this.setState((prevState) => ({
      deleteModalOpen: !prevState.deleteModalOpen,
    }));
  }

  openDeleteModal() {
    this.setState({
      deleteModalOpen: true,
    });
  }

  render() {
    const { deleteModalOpen } = this.state;
    const { post, value, onEdit } = this.props;
    const MENU = [
      { onClick: () => onEdit(post._id), text: 'Edit' },
      { onClick: this.openDeleteModal, text: 'Delete' },
    ];
    return (
      <>
        <StyledButtonMenu menuItems={MENU} color="primary">
          {value}
        </StyledButtonMenu>
        <BlogDeleteModal
          toggle={this.toggleDeleteModal}
          isOpen={deleteModalOpen}
          postID={post._id}
          cubeID={post.cube}
        />
      </>
    );
  }
}

BlogContextMenu.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cube: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BlogContextMenu;
