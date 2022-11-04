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
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  UncontrolledDropdown,
} from 'reactstrap';

import useToggle from '@cubeartisan/client/hooks/UseToggle.js';

const DEFAULT_STEP = Object.freeze([
  { action: 'pick', amount: 1 },
  { action: 'pass', amount: null },
]);

const ACTION_LABELS = Object.freeze({
  pick: 'Pick',
  pass: 'Pass',
  trash: 'Trash',
  pickrandom: 'Randomly Pick',
  trashrandom: 'Randomly Trash',
});

const CollapsibleCardTitle = ({ children, isOpen, ...props }) => (
  <CardTitle {...props}>
    {children}
    <IconButton size="lg" sx={{ float: 'right' }}>
      {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
    </IconButton>
  </CardTitle>
);

const CustomPackCard = ({ packIndex, pack, canRemove, mutations }) => {
  const [slotsOpen, toggleSlotsOpen] = useToggle(true);
  const [stepsOpen, toggleStepsOpen] = useToggle(false);
  const steps = useMemo(
    () =>
      pack.steps ??
      new Array(pack.slots.length)
        .fill(DEFAULT_STEP)
        .flat()
        .slice(0, pack.slots.length * 2 - 1),
    [pack],
  );
  return (
    <Card key={packIndex} className="mb-4 pack-outline">
      <CardHeader>
        <CardTitle className="mb-0">
          Pack {packIndex + 1} - {pack.slots.length} Cards
          {canRemove && (
            <Button onClick={mutations.removePack} data-pack-index={packIndex}>
              X
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardBody className="p-1">
        <Card key="slots" className="mb-3 m-2">
          <CardHeader onClick={toggleSlotsOpen}>
            <CollapsibleCardTitle isOpen={slotsOpen} className="mb-0">
              Card Slots
            </CollapsibleCardTitle>
          </CardHeader>
          <Collapse isOpen={slotsOpen}>
            <CardBody>
              {pack.slots.map((filter, slotIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <InputGroup key={slotIndex} className={slotIndex !== 0 ? 'mt-3' : undefined}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{slotIndex + 1}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    value={filter}
                    onChange={mutations.changeSlot}
                    data-pack-index={packIndex}
                    data-slot-index={slotIndex}
                  />
                  {pack.slots.length > 1 && (
                    <InputGroupAddon addonType="append">
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={mutations.removeSlot}
                        data-pack-index={packIndex}
                        data-slot-index={slotIndex}
                      >
                        Remove
                      </Button>
                    </InputGroupAddon>
                  )}
                </InputGroup>
              ))}
            </CardBody>
            <CardFooter>
              <Button size="medium" color="success" onClick={mutations.addSlot} data-pack-index={packIndex}>
                Add Card Slot
              </Button>
            </CardFooter>
          </Collapse>
        </Card>
        <Card key="steps" className="m-2">
          <CardHeader onClick={toggleStepsOpen}>
            <CollapsibleCardTitle isOpen={stepsOpen} className="mb-0">
              Steps for Drafting
            </CollapsibleCardTitle>
          </CardHeader>
          <Collapse isOpen={stepsOpen}>
            <CardBody>
              {steps.map((step, stepIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <InputGroup key={stepIndex} className="pb-1">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{stepIndex + 1}</InputGroupText>
                  </InputGroupAddon>
                  <UncontrolledDropdown className="pr-2">
                    <DropdownToggle caret>{ACTION_LABELS[step.action]}</DropdownToggle>
                    <DropdownMenu>
                      {Object.entries(ACTION_LABELS).map(([actionKey, actionLabel]) => (
                        <DropdownItem
                          key={actionKey}
                          value={actionKey}
                          onClick={mutations.changeStepAction}
                          data-pack-index={packIndex}
                          data-step-index={stepIndex}
                        >
                          {actionLabel}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {step.action !== 'pass' && (
                    <>
                      <Input
                        type="number"
                        value={step.amount ?? ''}
                        onChange={mutations.changeStepAmount}
                        data-pack-index={packIndex}
                        data-step-index={stepIndex}
                      />
                      <Label className="px-2"> Card{step.amount !== 1 && 's'} </Label>
                    </>
                  )}
                  <InputGroupAddon addonType="append">
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={mutations.removeStep}
                      data-pack-index={packIndex}
                      data-step-index={stepIndex}
                    >
                      Remove
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              ))}
            </CardBody>
            <CardFooter>
              <Button size="medium" color="success" onClick={mutations.addStep} data-pack-index={packIndex}>
                Add Step
              </Button>
            </CardFooter>
          </Collapse>
        </Card>
      </CardBody>
      <CardFooter>
        <Button color="success" onClick={mutations.duplicatePack} data-pack-index={packIndex}>
          Duplicate Pack
        </Button>
      </CardFooter>
    </Card>
  );
};

CollapsibleCardTitle.propTypes = {
  children: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

CustomPackCard.propTypes = {
  packIndex: PropTypes.number.isRequired,
  pack: PropTypes.shape({
    slots: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        action: PropTypes.oneOf(['pick', 'pass', 'trash']).isRequired,
        amount: PropTypes.number,
      }).isRequired,
    ),
  }).isRequired,
  canRemove: PropTypes.bool,
  mutations: PropTypes.shape({
    removePack: PropTypes.func.isRequired,
    changeSlot: PropTypes.func.isRequired,
    removeSlot: PropTypes.func.isRequired,
    addSlot: PropTypes.func.isRequired,
    duplicatePack: PropTypes.func.isRequired,
    addStep: PropTypes.func.isRequired,
    changeStepAction: PropTypes.func.isRequired,
    changeStepAmount: PropTypes.func.isRequired,
    removeStep: PropTypes.func.isRequired,
  }).isRequired,
};
CustomPackCard.defaultProps = {
  canRemove: false,
};

export default CustomPackCard;
