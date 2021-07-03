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
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF';
import withAutocard from '@cubeartisan/client/components/WithAutocard';
import { getCardColorClass } from '@cubeartisan/client/contexts/TagContext';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CustomInput,
  UncontrolledAlert,
  Spinner,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

const AutocardItem = withAutocard(ListGroupItem);

const AddGroupToCubeModal = ({ cards, isOpen, toggle, cubes, packid }) => {
  const [selectedCube, setSelectedCube] = useState(cubes && cubes.length > 0 ? cubes[0]._id : null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await csrfFetch(`/cards/details`, {
        method: 'POST',
        body: JSON.stringify({
          cards,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success === 'true') {
          setDetails(json.details);
          setLoading(false);
        }
      }
      return [];
    };
    fetchData();
  }, [cards, setDetails, setLoading]);

  const add = async () => {
    try {
      const response = await csrfFetch(`/cube/${selectedCube}/cards`, {
        method: 'POST',
        body: JSON.stringify({
          cards,
          packid,
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
          add: details.map((detail) => ({ details: detail })),
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

  if (loading) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="xs">
        <ModalHeader toggle={toggle}>Add Package to Cube</ModalHeader>
        <div className="centered py-3 my-4">
          <Spinner className="position-absolute" />
        </div>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  if (!cubes || cubes.length === 0) {
    return (
      <Modal isOpen={isOpen} toggle={toggle} size="xs">
        <ModalHeader toggle={toggle}>Add Package to Cube</ModalHeader>
        <ModalBody>
          <ListGroup className="list-outline">
            {details.map((card) => (
              <AutocardItem
                key={card.index}
                card={{ details: card }}
                className={`card-list-item d-flex flex-row ${getCardColorClass({ details: card })}`}
                data-in-modal
                index={card.index}
              >
                <>{card.name}</>
              </AutocardItem>
            ))}
          </ListGroup>
          <p>You don't appear to have any cubes to add this card to. Are you logged in?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xs">
      <ModalHeader toggle={toggle}>Add Package to Cube</ModalHeader>
      <ModalBody>
        {' '}
        {alerts.map(({ color, message }) => (
          <UncontrolledAlert key={message} color={color} className="mt-2">
            {message}
          </UncontrolledAlert>
        ))}
        <ListGroup className="list-outline">
          {details.map((card) => (
            <AutocardItem
              key={card.index}
              card={{ details: card }}
              className={`card-list-item d-flex flex-row ${getCardColorClass({ details: card })}`}
              data-in-modal
              index={card.index}
            >
              <>{card.name}</>
            </AutocardItem>
          ))}
        </ListGroup>
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
        <Button color="success" onClick={add}>
          Add
        </Button>
        <Button color="secondary" onClick={maybe}>
          Maybeboard
        </Button>
        <Button color="danger" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

AddGroupToCubeModal.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  cubes: PropTypes.arrayOf(CubePropType).isRequired,
  packid: PropTypes.string,
};

AddGroupToCubeModal.defaultProps = {
  packid: null,
};

export default AddGroupToCubeModal;
