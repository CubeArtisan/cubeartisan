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

import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import UserPreview from '@cubeartisan/client/components/UserPreview';

const FollowersModal = ({ followers, isOpen, toggle }) => (
  <Modal size="lg" isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Followers</ModalHeader>
    <ModalBody>
      <Row className="justify-content-center">
        {followers.map((follower) => (
          <Col key={follower._id} xs={6} sm={4} lg={3}>
            <UserPreview user={follower} />
          </Col>
        ))}
      </Row>
    </ModalBody>
  </Modal>
);

FollowersModal.propTypes = {
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default FollowersModal;
