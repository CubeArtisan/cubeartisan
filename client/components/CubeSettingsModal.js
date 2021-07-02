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
import { useCallback, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { Button, CustomInput, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { postJson } from '@hypercube/client/utils/CSRF';
import { formDataObject } from '@hypercube/client/utils/Form';

import CSRFForm from '@hypercube/client/components/CSRFForm';
import CubeContext from '@hypercube/client/contexts/CubeContext';
import LoadingButton from '@hypercube/client/components/LoadingButton';

const CubeSettingsModal = ({ addAlert, onCubeUpdate, isOpen, toggle }) => {
  const { cube, cubeID, setCube } = useContext(CubeContext);
  const formRef = useRef();

  const handleSave = useCallback(async () => {
    const formObject = formDataObject(formRef.current);
    const response = await postJson(`/cube/api/settings/${cubeID}`, formObject);
    const json = await response.json();
    // eslint-disable-next-line no-underscore-dangle
    delete formObject._csrf;
    if (response.ok) {
      onCubeUpdate({ ...cube, ...formObject });
      setCube((current) => ({ ...current, ...formObject }));
    } else {
      for (const error of json.errors) {
        addAlert('danger', error);
      }
      addAlert('danger', json.message);
    }
    toggle();
  }, [toggle, addAlert, onCubeUpdate, cube, cubeID, setCube, formRef]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Settings</ModalHeader>
      <ModalBody>
        <CSRFForm innerRef={formRef}>
          <FormGroup check>
            <Input id="isListed" name="isListed" type="checkbox" defaultChecked={cube.isListed || false} />
            <Label for="isListed">Is Listed</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              id="privatePrices"
              name="privatePrices"
              type="checkbox"
              defaultChecked={cube.privatePrices || false}
            />
            <Label for="privatePrices">Hide Total Prices</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              id="disableNotifications"
              name="disableNotifications"
              type="checkbox"
              defaultChecked={cube.disableNotifications || false}
            />
            <Label for="disableNotifications">Disable Draft Notifications</Label>
          </FormGroup>
          <FormGroup check>
            <Input id="useCubeElo" name="useCubeElo" type="checkbox" defaultChecked={cube.useCubeElo || false} />
            <Label for="useCubeElo">Use Cube Elo instead of Global Elo</Label>
          </FormGroup>
          <FormGroup>
            <Label for="defaultStatus">Default Status</Label>
            <CustomInput
              id="defaultStatus"
              name="defaultStatus"
              type="select"
              defaultValue={cube.defaultStatus || false}
            >
              {['Owned', 'Not Owned'].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="defaultPrinting">Default Printing</Label>
            <CustomInput
              id="defaultPrinting"
              name="defaultPrinting"
              type="select"
              defaultValue={cube.defaultPrinting || false}
            >
              <option value="recent">Most Recent</option>
              <option value="first">First</option>
            </CustomInput>
          </FormGroup>
        </CSRFForm>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>{' '}
        <LoadingButton color="success" onClick={handleSave}>
          Save Changes
        </LoadingButton>
      </ModalFooter>
    </Modal>
  );
};

CubeSettingsModal.propTypes = {
  addAlert: PropTypes.func.isRequired,
  onCubeUpdate: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default CubeSettingsModal;
