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
import { ContentCopy } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const CubeIdModal = ({ toggle, isOpen, shortID, fullID, alert }) => {
  const onCopyClick = async (id, label) => {
    await navigator.clipboard.writeText(id);
    alert('success', `${label} copied to clipboard`);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Cube ID</ModalHeader>
      <ModalBody>
        <h6>Short ID</h6>
        <InputGroup>
          <Input className="bg-white monospaced" value={shortID} readonly />
          <InputGroupAddon addonType="append">
            <IconButton size="small" onClick={() => onCopyClick(shortID, 'Short ID')} aria-label="Copy Short ID">
              <ContentCopy />
            </IconButton>
          </InputGroupAddon>
        </InputGroup>
        <Label for="short-id-input">A custom, memorable ID that owners are allowed to modify.</Label>

        <h6 className="mt-3">Full ID</h6>
        <InputGroup>
          <Input className="bg-white monospaced" value={fullID} readonly />
          <InputGroupAddon addonType="append">
            <IconButton size="small" onClick={() => onCopyClick(fullID, 'Full ID')} aria-label="Copy Full ID">
              <ContentCopy />
            </IconButton>
          </InputGroupAddon>
        </InputGroup>
        <Label for="full-id-input">The canonical unique ID for this cube, guaranteed not to change.</Label>
        <br />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

CubeIdModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  shortID: PropTypes.string.isRequired,
  fullID: PropTypes.string.isRequired,
  alert: PropTypes.func.isRequired,
};

export default CubeIdModal;
