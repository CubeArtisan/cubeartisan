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
import { useCallback, useContext, useMemo } from 'react';
import {
  Alert,
  Col,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import CustomPackCard from '@cubeartisan/client/components/CustomPackCard.js';
import CSRFForm from '@cubeartisan/client/components/inputs/CSRFForm.js';
import TextEntry from '@cubeartisan/client/components/inputs/TextEntry.js';
import { toNullableInt } from '@cubeartisan/client/utils/Util.js';

export const DEFAULT_PACK = Object.freeze({ slots: [''], steps: null });

const DEFAULT_STEP = Object.freeze([
  { action: 'pick', amount: 1 },
  { action: 'pass', amount: null },
]);

const cloneSteps = ({ packIndex, newFormat }) =>
  Array.from(
    newFormat.packs[packIndex].steps ??
      new Array(newFormat.packs[packIndex].slots.length)
        .fill(DEFAULT_STEP)
        .flat()
        .slice(0, newFormat.packs[packIndex].slots.length * 2 - 1)
        .map((action) => ({ ...action })),
  );
const MUTATIONS = Object.freeze({
  changeTitle: ({ newFormat, value }) => {
    newFormat.title = value;
  },

  changeMultiples: ({ newFormat, value }) => {
    newFormat.multiples = value === 'true';
  },

  changeDescription: ({ newFormat, value }) => {
    newFormat.markdown = value;
  },

  removePack: ({ newFormat, packIndex }) => {
    if (newFormat.packs.length > 1) newFormat.packs.splice(packIndex, 1);
  },

  changeSlot: ({ newFormat, packIndex, slotIndex, value }) => {
    newFormat.packs[packIndex].slots[slotIndex] = value;
  },

  removeSlot: ({ newFormat, packIndex, slotIndex }) => {
    if (newFormat.packs[packIndex].slots.length > 1) {
      newFormat.packs[packIndex].slots.splice(slotIndex, 1);
    }
  },

  addSlot: ({ newFormat, packIndex }) => newFormat.packs[packIndex].slots.push(''),

  duplicatePack: ({ newFormat, packIndex }) => {
    newFormat.packs.splice(packIndex, 0, newFormat.packs[packIndex]);
  },

  addPack: ({ newFormat }) => newFormat.packs.push({ ...DEFAULT_PACK }),

  addStep: ({ newFormat, packIndex }) => {
    newFormat.packs[packIndex].steps = cloneSteps({ newFormat, packIndex });
    newFormat.packs[packIndex].steps.push({ action: 'pass', amount: null });
  },

  changeStepAction: ({ newFormat, packIndex, stepIndex, value }) => {
    newFormat.packs[packIndex].steps = cloneSteps({ newFormat, packIndex });
    newFormat.packs[packIndex].steps[stepIndex] = { ...newFormat.packs[packIndex].steps[stepIndex], action: value };

    // undefined amount value is automatically set to 1 for initial change
    if (value !== 'pass' && newFormat.packs[packIndex].steps[stepIndex].amount === null) {
      newFormat.packs[packIndex].steps[stepIndex].amount = 1;
    }
  },

  changeStepAmount: ({ newFormat, packIndex, stepIndex, value }) => {
    newFormat.packs[packIndex].steps = cloneSteps({ newFormat, packIndex });
    newFormat.packs[packIndex].steps[stepIndex] = {
      ...newFormat.packs[packIndex].steps[stepIndex],
      amount: toNullableInt(value),
    };
  },

  removeStep: ({ newFormat, packIndex, stepIndex }) => {
    newFormat.packs[packIndex].steps = cloneSteps({ newFormat, packIndex });
    newFormat.packs[packIndex].steps.splice(stepIndex, 1);
    if (newFormat.packs[packIndex].steps.length === 0) newFormat.packs[packIndex].steps = null;
  },

  changeDefaultSeatCount: ({ newFormat, value }) => {
    newFormat.defaultSeats = Number.parseInt(value, 10);
  },
});

const serializeFormat = (rawFormat) => {
  const format = { ...rawFormat };
  format.title = format.title.trim();
  return JSON.stringify(format);
};

const getErrorsInFormat = (format) => {
  const errors = [];
  if (!format?.packs) return ['Internal error in the format.'];
  if (!format.title.trim()) errors.push('Title must not be empty.');
  if (format.packs.length === 0) errors.push('Format must have at least 1 pack.');
  if (format.defaultSeats !== undefined) {
    if (!Number.isFinite(format.defaultSeats)) errors.push('Default seat count must be a number.');
    if (format.defaultSeats < 2 || format.defaultSeats > 16)
      errors.push('Default seat count must be between 2 and 16.');
  }
  for (let i = 0; i < format.packs.length; i++) {
    const pack = format.packs[i];
    if (
      pack.steps &&
      pack.slots.length !== pack.steps.reduce((acc, { action, amount }) => acc + (action !== 'pass' ? amount : 0), 0)
    ) {
      errors.push(
        `The number of cards picked and trashed in the steps of Pack ${
          i + 1
        } is not equal to the number of card slots in the pack.`,
      );
    }
  }
  return errors.length === 0 ? null : errors;
};

const CustomDraftFormatModal = ({ isOpen, toggle, formatIndex, format, setFormat }) => {
  const useMutateFormat = (mutation) =>
    useCallback(
      (event) => {
        const target = event.currentTarget;
        if (target) {
          const { value } = target;
          const packIndex = toNullableInt(target.getAttribute('data-pack-index'));
          const slotIndex = toNullableInt(target.getAttribute('data-slot-index'));
          const stepIndex = toNullableInt(target.getAttribute('data-step-index'));
          setFormat((oldFormat) => {
            const newFormat = { ...oldFormat, packs: Array.from(oldFormat.packs ?? [{ ...DEFAULT_PACK }]) };
            if (packIndex || packIndex === 0) {
              if (
                oldFormat.packs.length <= packIndex ||
                ((slotIndex || slotIndex === 0) && oldFormat.packs[packIndex].slots.length <= slotIndex)
              ) {
                return oldFormat;
              }
              newFormat.packs[packIndex] = {
                ...newFormat.packs[packIndex],
                slots: Array.from(newFormat.packs[packIndex].slots ?? DEFAULT_PACK.slots),
              };
            }
            mutation({ newFormat, value, packIndex, slotIndex, stepIndex });
            return newFormat;
          });
        }
      },
      // eslint-disable-next-line
      [setFormat, mutation],
    );
  // eslint-disable-next-line
  const mutations = Object.fromEntries(Object.entries(MUTATIONS).map(([name, mutation]) => [name, useMutateFormat(mutation)]));
  const { cubeID } = useContext(CubeContext);

  const errorsInFormat = useMemo(() => getErrorsInFormat(format), [format]);
  const packsJson = useMemo(() => !errorsInFormat && serializeFormat(format), [errorsInFormat, format]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} labelledBy="customDraftFormatTitle" size="lg">
      <ModalHeader id="customDraftFormatTitle" toggle={toggle}>
        Create Custom Draft Format
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col className="mt-2">
            <Input
              type="text"
              maxLength="200"
              name="title"
              placeholder="Title"
              value={format.title}
              onChange={mutations.changeTitle}
            />
            <FormGroup className="mt-3">
              <Label>
                Default seat count
                <Input
                  type="number"
                  min={2}
                  max={16}
                  defaultValue={format.defaultSeats ?? 8}
                  onChange={mutations.changeDefaultSeatCount}
                />
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="multiples"
                    value="false"
                    checked={!format.multiples}
                    onChange={mutations.changeMultiples}
                  />{' '}
                  Only allow the number of copies of each card that are in the cube in the draft.
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="multiples"
                    value="true"
                    checked={format.multiples}
                    onChange={mutations.changeMultiples}
                  />{' '}
                  Allow any number of copies of each card in the draft (e.g. set draft)
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
        </Row>
        <h6>Description</h6>
        <TextEntry
          name="markdown"
          value={format.markdown ?? format.html ?? ''}
          onChange={mutations.changeDescription}
          maxLength={5000}
        />
        <FormText>
          Having trouble formatting your posts? Check out the{' '}
          <a href="/markdown" target="_blank">
            markdown guide
          </a>
          .
        </FormText>
        <FormText className="mt-3 mb-1">
          Card values can either be single tags or filter parameters or a comma separated list to create a ratio (e.g.
          3:1 rare to mythic could be <code>rarity:rare, rarity:rare, rarity:rare, rarity:mythic</code>). Tags can be
          specified <code>tag:yourtagname</code> or simply <code>yourtagname</code>. <code>*</code> can be used to match
          any card.
        </FormText>
        {(format.packs ?? []).map((pack, packIndex) => (
          <CustomPackCard
            key={/* eslint-disable-line react/no-array-index-key */ packIndex}
            packIndex={packIndex}
            mutations={mutations}
            canRemove={format.packs.length > 1}
            pack={pack}
          />
        ))}
        <Button color="success" onClick={mutations.addPack}>
          Add Pack
        </Button>
      </ModalBody>
      <ModalFooter>
        {errorsInFormat &&
          errorsInFormat.map((error, errorIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Alert key={errorIndex} color="error">
              {error}
            </Alert>
          ))}
        <CSRFForm method="POST" action={`/cube/${cubeID}/format`}>
          <Input type="hidden" name="serializedFormat" value={packsJson} />
          <Input type="hidden" name="id" value={formatIndex} />
          <Button color={errorsInFormat ? 'error' : 'success'} type="submit" disabled={!!errorsInFormat}>
            Save
          </Button>
        </CSRFForm>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

CustomDraftFormatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  formatIndex: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  format: PropTypes.object.isRequired,
  setFormat: PropTypes.func.isRequired,
};

export default CustomDraftFormatModal;
