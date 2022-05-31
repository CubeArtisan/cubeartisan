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
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import ButtonLink from '@cubeartisan/client/components/inputs/ButtonLink.js';

const LinkModal = ({ link, isOpen, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle} size="xs">
    <ModalHeader toggle={toggle}>This link could be dangerous</ModalHeader>
    <ModalBody>
      <p>
        This link leads to: <code>{link}</code>
      </p>
      <p>Following unknown links can be dangerous, are you sure you wish to proceed?</p>
      <ButtonLink href={link} block color="warning" outline target="_blank" rel="noopener noreferrer">
        Yes, I know what I'm doing
      </ButtonLink>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle}>
        Close
      </Button>
    </ModalFooter>
  </Modal>
);

LinkModal.propTypes = {
  link: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default LinkModal;
