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
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import { AutocompleteCardField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const CustomizeBasicsModal = ({ isOpen, toggle, cube, updateBasics, onError }) => {
  const [basics, setBasics] = useState(cube.basics.slice());
  const [imageDict, setImageDict] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch('/cards/images/dict');
      const json = await response.json();
      setImageDict(json.dict);
    })();
  }, []);

  const submitCard = (cardName) => {
    if (imageDict) {
      const result = imageDict[cardName.toLowerCase()];
      if (result) {
        setBasics([...basics, result.id]);
      }
    }
  };

  const save = async () => {
    const response = await csrfFetch(`/cube/${cube._id}/basics`, {
      method: 'PUT',
      body: JSON.stringify(basics),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      updateBasics(basics);
      toggle();
    } else {
      onError('Error updating basics');
    }
  };

  return (
    <Modal size="xl" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Customize Basics</ModalHeader>
      <ModalBody>
        <p>
          This set of cards will have an unlimited quantity available when constructing decks. You can use this to
          select which art your cube's basics will use, provide multiple art options for your drafters, and also provide
          snow-covered basics. These don't necessarily have to be basic lands, but using an unconventional setup here
          may result in confusing our draft bots' deckbuilding.
        </p>
        <AutocompleteCardField
          fullNames
          InputProps={{ name: 'remove', placeholder: 'Card name and version.' }}
          submitButtonText="Add Card"
          submitButtonProps={{ color: 'success', fullWidth: true }}
          onSubmit={submitCard}
        />
        <Row>
          {basics.map((cardId, index) => (
            <Col key={cardId} className="col-6 col-md-2-4 col-lg-2-4 col-xl-2-4">
              <Card className="mb-3">
                <img className="w-100" src={`/card/${cardId}/image/redirect`} alt={cardId} />
                <Button
                  className="mt-1"
                  color="warning"
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    const temp = basics.slice();
                    temp.splice(index, 1);
                    setBasics(temp);
                  }}
                >
                  Remove
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </ModalBody>
      <ModalFooter>
        <LoadingButton color="success" variant="outlined" onClick={save}>
          Save Changes
        </LoadingButton>
        <Button onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

CustomizeBasicsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  cube: CubePropType.isRequired,
  updateBasics: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default CustomizeBasicsModal;
