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
import { Button, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import {
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
  LayoutContainer,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';

/**
  @typedef LinkModalProps
  @property {string} link
  @property {boolean} isOpen
  @property {() => void} toggle
*/

/**
 * @type {React.FC<LinkModalProps>}
 */
const LinkModal = ({ link, isOpen, toggle }) => (
  <Modal open={isOpen} onClose={toggle}>
    <LayoutContainer>
      <ContainerHeader title="This link could be dangerous" />
      <ContainerBody>
        <Typography variant="subtitle1">
          This link leads to: <code>{link}</code>
        </Typography>
        <Typography variant="body1">
          Following unknown links can be dangerous, are you sure you wish to proceed?
        </Typography>
      </ContainerBody>
      <ContainerFooter>
        <Button href={link} color="warning" variant="outlined" target="_blank" rel="noopener noreferrer">
          Yes, I know what I'm doing
        </Button>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ContainerFooter>
    </LayoutContainer>
  </Modal>
);
LinkModal.propTypes = {
  link: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
export default LinkModal;
