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
import { Button, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useContext, useMemo, useState } from 'react';
import {
  Col,
  CustomInput,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  ListGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledAlert,
} from 'reactstrap';

import AutocardListItem from '@cubeartisan/client/components/AutocardListItem.js';
import ChangelistContext from '@cubeartisan/client/components/contexts/ChangelistContext.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import GroupModalContext from '@cubeartisan/client/components/contexts/GroupModalContext.js';
import { AutocompleteTagField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import ColorChecksControl from '@cubeartisan/client/components/inputs/ColorCheck.js';
import MassBuyButton from '@cubeartisan/client/components/inputs/MassBuyButton.js';
import TextBadge from '@cubeartisan/client/components/TextBadge.js';
import { cardFoilPrice, cardPrice, cardPriceEur, cardTix } from '@cubeartisan/client/utils/Card.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const DEFAULT_FORM_VALUES = {
  status: '',
  finish: '',
  cmc: '',
  type_line: '',
  ...Object.fromEntries(Array.from('WUBRGC', (c) => [`color${c}`, false])),
  addTags: true,
  deleteTags: false,
  tags: [],
  tagInput: '',
};

const GroupModal = ({ cubeID, canEdit, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [cardIndices, setCardIndices] = useState([]);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const { cube, updateCubeCards } = useContext(CubeContext);
  const { addChanges } = useContext(ChangelistContext);

  const open = useCallback(() => {
    setFormValues(DEFAULT_FORM_VALUES);
    setIsOpen(true);
  }, [setFormValues, setIsOpen]);

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  const error = useCallback(
    (message) => {
      setAlerts((oldAlerts) => [
        ...oldAlerts,
        {
          color: 'danger',
          message,
        },
      ]);
    },
    [setAlerts],
  );

  const handleChange = useCallback(
    (event) => {
      const { target } = event;
      const value = ['checkbox', 'radio'].includes(target.type) ? target.checked : target.value;
      const { name } = target;
      const extra = {};
      if (name === 'addTags') {
        extra.deleteTags = false;
      }
      if (name === 'deleteTags') {
        extra.addTags = false;
      }
      setFormValues((oldFormValues) => ({
        ...oldFormValues,
        [name]: value,
        ...extra,
      }));
    },
    [setFormValues],
  );

  const cards = useMemo(() => cardIndices.map((index) => cube.cards[index]), [cube.cards, cardIndices]);

  const handleRemoveCard = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.currentTarget;
      const index = target.getAttribute('data-index');

      if (cards.length === 1) {
        close();
      } else {
        setCardIndices((oldIndices) => oldIndices.filter((c) => c !== parseInt(index, 10)));
      }
    },
    [cards, close, setCardIndices],
  );

  const handleApply = useCallback(
    async (event) => {
      event.preventDefault();

      const selected = cardIndices;
      const colors = Array.from('WUBRG').filter((color) => formValues[`color${color}`]);
      const updated = {
        ...formValues,
        tags: formValues.tags.map((tag) => tag.text),
      };
      updated.cmc = parseInt(updated.cmc, 10);
      if (Number.isNaN(updated.cmc)) {
        delete updated.cmc;
      }
      updated.colors = colors;
      if (updated.colors.length === 0) {
        delete updated.colors;
      }
      Array.from('WUBRG').forEach((color) => delete updated[`color${color}`]);

      try {
        const response = await csrfFetch(`/cube/${cubeID}/cards`, {
          method: 'PUT',
          body: JSON.stringify({ selected, updated }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        if (json.success === 'true') {
          // Make shallow copy of each card.
          const updatedCards = cardIndices.map((index) => ({ ...cube.cards[index] }));
          for (const card of updatedCards) {
            if (updated.status) {
              card.status = updated.status;
            }
            if (updated.finish) {
              card.finish = updated.finish;
            }
            if (!Number.isNaN(updated.cmc)) {
              card.cmc = updated.cmc;
            }
            if (updated.type_line) {
              card.type_line = updated.type_line;
            }
            if (updated.addTags) {
              card.tags = [...card.tags, ...updated.tags.filter((tag) => !card.tags.includes(tag))];
            }
            if (updated.deleteTags) {
              card.tags = card.tags.filter((tag) => !updated.tags.includes(tag));
            }
            if (colors.length > 0) {
              card.colors = Array.from(colors);
            }
            if (updated.colorC) {
              card.colors = [];
            }
          }
          updateCubeCards(updatedCards);

          close();
        }
      } catch (e) {
        console.error(e);
        error(e);
      }
    },
    [cube.cards, cubeID, cardIndices, formValues, updateCubeCards, close, error],
  );

  const setTags = useCallback(
    (tagF) => {
      setFormValues(({ tags, ...oldFormValues }) => ({ ...oldFormValues, tags: tagF(tags) }));
    },
    [setFormValues],
  );

  const handleRemoveAll = useCallback(
    (event) => {
      event.preventDefault();
      addChanges(
        cardIndices.map((index) => ({
          remove: cube.cards[index],
        })),
      );
      close();
    },
    [addChanges, cardIndices, cube, close],
  );

  const setCards = useCallback((oldCards) => setCardIndices(oldCards.map((card) => card.index)), []);
  const contextValue = useMemo(
    () => ({ groupModalCards: cards, openGroupModal: open, setGroupModalCards: setCards }),
    [cards, open, setCards],
  );
  const contextChildren = <GroupModalContext.Provider value={contextValue}>{children}</GroupModalContext.Provider>;

  if (!canEdit) {
    return contextChildren;
  }

  const totalPriceUsd = cards.length ? cards.reduce((total, card) => total + (cardPrice(card) ?? 0), 0) : 0;
  const totalPriceUsdFoil = cards.length ? cards.reduce((total, card) => total + (cardFoilPrice(card) ?? 0), 0) : 0;
  const totalPriceEur = cards.length ? cards.reduce((total, card) => total + (cardPriceEur(card) ?? 0), 0) : 0;
  const totalPriceTix = cards.length ? cards.reduce((total, card) => total + (cardTix(card) ?? 0), 0) : 0;

  return (
    <>
      {contextChildren}
      <Modal size="lg" isOpen={isOpen} toggle={close} {...props}>
        <ModalHeader toggle={close}>Edit Selected</ModalHeader>
        <ModalBody>
          {alerts.map(({ color, message }) => (
            <UncontrolledAlert color={color}>{message}</UncontrolledAlert>
          ))}
          <Row>
            <Col xs="4" className="d-flex flex-column" sx={{ maxHeight: '35rem' }}>
              <Row noGutters className="w-100" sx={{ overflow: 'scroll', flexShrink: 1 }}>
                <ListGroup className="list-outline w-100">
                  {cards.map((card) => (
                    <AutocardListItem key={card.index} card={card} noCardModal>
                      <Button data-index={card.index} onClick={handleRemoveCard}>
                        X
                      </Button>
                    </AutocardListItem>
                  ))}
                </ListGroup>
              </Row>
              <Row noGutters>
                {Number.isFinite(totalPriceUsd) && (
                  <TextBadge name="Price USD">
                    <Tooltip title="TCGPlayer Market Price">
                      <Typography variant="body1">${Math.round(totalPriceUsd).toLocaleString()}</Typography>
                    </Tooltip>
                  </TextBadge>
                )}
                {Number.isFinite(totalPriceUsdFoil) && (
                  <TextBadge name="Foil USD">
                    <Tooltip title="TCGPlayer Market Foil Price">
                      <Typography variant="body1">${Math.round(totalPriceUsdFoil).toLocaleString()}</Typography>
                    </Tooltip>
                  </TextBadge>
                )}
                {Number.isFinite(totalPriceEur) && (
                  <TextBadge name="EUR">
                    <Tooltip title="Cardmarket Price">
                      <Typography variant="body1">${Math.round(totalPriceEur).toLocaleString()}</Typography>
                    </Tooltip>
                  </TextBadge>
                )}
                {Number.isFinite(totalPriceTix) && (
                  <TextBadge name="TIX">
                    <Tooltip title="MTGO TIX">
                      <Typography variant="body1">${Math.round(totalPriceTix).toLocaleString()}</Typography>
                    </Tooltip>
                  </TextBadge>
                )}
              </Row>
            </Col>
            <Col xs="8">
              <Form>
                <Label for="groupStatus">
                  <h5>Set Status of All</h5>
                </Label>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Status</InputGroupText>
                  </InputGroupAddon>
                  <CustomInput
                    type="select"
                    id="groupStatus"
                    name="status"
                    value={formValues.status}
                    onChange={handleChange}
                  >
                    {['', 'Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied'].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </CustomInput>
                </InputGroup>

                <Label for="groupStatus">
                  <h5>Set Finish of All</h5>
                </Label>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Finish</InputGroupText>
                  </InputGroupAddon>
                  <CustomInput
                    type="select"
                    id="groupFinish"
                    name="finish"
                    value={formValues.finish}
                    onChange={handleChange}
                  >
                    {['', 'Non-foil', 'Foil'].map((finish) => (
                      <option key={finish}>{finish}</option>
                    ))}
                  </CustomInput>
                </InputGroup>

                <h5>Override Attribute on All</h5>
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Mana Value</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" name="cmc" value={formValues.cmc} onChange={handleChange} />
                </InputGroup>
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Type</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" name="type_line" value={formValues.type_line} onChange={handleChange} />
                </InputGroup>

                <InputGroup>
                  <InputGroupText className="square-right">Color Identity</InputGroupText>
                  <ColorChecksControl colorless prefix="color" values={formValues} onChange={handleChange} />
                </InputGroup>
                <FormText>
                  Selecting no mana symbols will cause the selected cards' color identity to remain unchanged. Selecting
                  only colorless will cause the selected cards' color identity to be set to colorless.
                </FormText>

                <h5 className="mt-3">Edit Tags</h5>
                <FormGroup tag="fieldset">
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="addTags" checked={formValues.addTags} onChange={handleChange} /> Add
                      tags to all
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="deleteTags" checked={formValues.deleteTags} onChange={handleChange} />{' '}
                      Delete tags from all
                    </Label>
                  </FormGroup>
                </FormGroup>
                <AutocompleteTagField
                  updateTags={setTags}
                  tags={formValues.tags}
                  InputProps={{ name: 'tagInput', fullWidth: true, placeholder: 'Tags to remove from all selected.' }}
                  freeSolo
                  multiple
                />
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleRemoveAll}>
            Remove all from cube
          </Button>
          <MassBuyButton cards={cards}>Buy all</MassBuyButton>
          <LoadingButton color="success" onClick={handleApply}>
            Apply to all
          </LoadingButton>
        </ModalFooter>
      </Modal>
    </>
  );
};
GroupModal.propTypes = {
  cubeID: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
GroupModal.defaultProps = {
  canEdit: false,
};
export default GroupModal;
