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
import { useContext, useState } from 'react';
import {
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledAlert,
} from 'reactstrap';

import CardImage from '@cubeartisan/client/components/CardImage.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const AddToCubeModal = ({ card, isOpen, toggle, hideAnalytics, cubeContext }) => {
  const user = useContext(UserContext);
  const cubes = user?.cubes ?? [];

  let def = cubeContext;
  if (cubes.length > 0) {
    def = cubes.map((cube) => cube._id).includes(cubeContext) ? cubeContext : cubes[0]._id;
  }
  const [selectedCube, setSelectedCube] = useState(cubes && cubes.length > 0 ? def : '');
  const [alerts, setAlerts] = useState([]);

  const add = async () => {
    try {
      const response = await csrfFetch(`/cube/${selectedCube}/cards`, {
        method: 'POST',
        body: JSON.stringify({
          cards: [card._id],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success === 'true') {
          toggle();
        }
      } else {
        setAlerts([...alerts, { color: 'danger', message: 'Error, could not add card' }]);
      }
    } catch (err) {
      setAlerts([...alerts, { color: 'danger', message: 'Error, could not add card' }]);
    }
  };

  const maybe = async () => {
    try {
      const response = await csrfFetch(`/cube/${selectedCube}/maybe`, {
        method: 'PUT',
        body: JSON.stringify({
          add: [{ details: card }],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success === 'true') {
          toggle();
        }
      } else {
        setAlerts([...alerts, { color: 'danger', message: 'Error, could not maybeboard card' }]);
      }
    } catch (err) {
      setAlerts([...alerts, { color: 'danger', message: 'Error, could not maybeboard card' }]);
    }
  };

  if (!cubes || cubes.length === 0) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="xs">
        <ModalHeader toggle={toggle}>{card.name}</ModalHeader>
        <ModalBody>
          <CardImage card={card} sx={{ marginBottom: 3 }} />
          <p>You don't appear to have any cubes to add this card to. Are you logged in?</p>
        </ModalBody>
        <ModalFooter>
          {!hideAnalytics && (
            <Button color="primary" href={`/card/${card._id}`} target="_blank">
              Analytics
            </Button>
          )}
          <Button color="warning" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xs">
      <ModalHeader toggle={toggle}>{`Add ${card.name} to Cube`}</ModalHeader>
      <ModalBody>
        {' '}
        {alerts.map(({ color, message }) => (
          <UncontrolledAlert key={message} color={color} className="mt-2">
            {message}
          </UncontrolledAlert>
        ))}
        <CardImage card={card} />
        <InputGroup className="my-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Cube: </InputGroupText>
          </InputGroupAddon>
          <CustomInput type="select" value={selectedCube} onChange={(event) => setSelectedCube(event.target.value)}>
            {cubes.map((cube) => (
              <option value={cube._id}>{cube.name}</option>
            ))}
          </CustomInput>
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        {!hideAnalytics && (
          <Button color="primary" href={`/card/${card._id}`} target="_blank">
            Analytics
          </Button>
        )}
        <Button color="success" onClick={add}>
          Add
        </Button>
        <Button color="secondary" onClick={maybe}>
          Maybeboard
        </Button>
        <Button color="warning" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
AddToCubeModal.propTypes = {
  card: CardPropType.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hideAnalytics: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  cubeContext: PropTypes.string,
};
AddToCubeModal.defaultProps = {
  hideAnalytics: false,
  cubeContext: null,
};
export default AddToCubeModal;
