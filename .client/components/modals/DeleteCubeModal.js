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
import { useState } from 'react';
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const deleteCube = async (cubeid) => {
  await csrfFetch(`/cube/${cubeid}`, { method: 'DELETE' });
  window.location.href = '/dashboard';
};

const DeleteCubeModal = ({ isOpen, toggle, cubeid }) => {
  const [deleteText, setDeleteText] = useState('');
  return (
    <Modal size="lg" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Cube Delete</ModalHeader>
      <ModalBody>
        <p>Are you sure you wish to delete this cube? This action cannot be undone.</p>
        <p>Please type 'Delete' in order to confirm</p>
        <Input value={deleteText} onChange={(e) => setDeleteText(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => deleteCube(cubeid)}
          color="warning"
          variant="outlined"
          disabled={deleteText !== 'Delete'}
        >
          Delete
        </Button>
        <Button onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};
DeleteCubeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  cubeid: PropTypes.string.isRequired,
};
export default DeleteCubeModal;
