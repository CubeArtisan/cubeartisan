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
import {
  Col,
  CustomInput,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

import FoilCardImage from '@cubeartisan/client/components/FoilCardImage.js';
import withLoading from '@cubeartisan/client/components/hoc/WithLoading.js';
import { AutocompleteTagField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import ColorChecksControl from '@cubeartisan/client/components/inputs/ColorCheck.js';
import TextBadge from '@cubeartisan/client/components/TextBadge.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { getTCGLink } from '@cubeartisan/client/utils/Affiliate.js';
import { cardElo, cardFoilPrice, cardName, cardPrice, cardPriceEur, cardTix } from '@cubeartisan/client/utils/Card.js';
import { cardGetLabels, getLabels } from '@cubeartisan/client/utils/Sort.js';

const LoadingCustomInput = withLoading(CustomInput, []);

const CardModal = ({
  card,
  maybe,
  versions,
  versionsLoading,
  toggle,
  disabled,
  values,
  onChange,
  saveChanges,
  queueRemoveCard,
  updateTags,
  ...props
}) => (
  <Modal size="lg" labelledby="cardModalHeader" toggle={toggle} {...props}>
    <ModalHeader id="cardModalHeader" toggle={toggle}>
      {cardName(card)}
    </ModalHeader>
    <ModalBody>
      <Row>
        <Col xs="12" sm="4">
          <FoilCardImage card={card} finish={values.finish} />
          <Row noGutters className="mb-2">
            {card.details.prices && Number.isFinite(cardPrice(card)) && (
              <TextBadge name="Price">
                <Tooltip title="TCGPlayer Market Price">
                  <Typography variant="body1">${cardPrice(card).toFixed(2)}</Typography>
                </Tooltip>
              </TextBadge>
            )}
            {card.details.prices && Number.isFinite(cardFoilPrice(card)) && (
              <TextBadge name="Foil">
                <Tooltip title="TCGPlayer Market Price">
                  <Typography variant="body1">${cardFoilPrice(card).toFixed(2)}</Typography>
                </Tooltip>
              </TextBadge>
            )}
            {card.details.prices && Number.isFinite(cardPriceEur(card)) && (
              <TextBadge name="EUR">
                <Tooltip title="Cardmarket Price">
                  <Typography variant="body1">€{cardPriceEur(card).toFixed(2)}</Typography>
                </Tooltip>
              </TextBadge>
            )}
            {card.details.prices && Number.isFinite(cardTix(card)) && (
              <TextBadge name="TIX">
                <Tooltip title="MTGO TIX">
                  <Typography variant="body1">{cardTix(card).toFixed(2)}</Typography>
                </Tooltip>
              </TextBadge>
            )}
            {Number.isFinite(cardElo(card)) && (
              <TextBadge name="Elo">
                <Tooltip title="ELO">
                  <Typography variant="body1">{cardElo(card).toFixed(0)}</Typography>
                </Tooltip>
              </TextBadge>
            )}
          </Row>
        </Col>
        <Col xs="12" sm="8">
          <h5>Card Attributes</h5>
          <fieldset disabled={disabled}>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Overriden Name</InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="name" value={values.name} onChange={onChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Version (Set and #)</InputGroupText>
              </InputGroupAddon>
              <LoadingCustomInput
                type="select"
                name="version"
                id="cardModalVersion"
                value={values.version}
                onChange={onChange}
                loading={versionsLoading}
                spinnerSize="sm"
              >
                {versions.map(({ _id, version }) => (
                  <option key={_id} value={_id}>
                    {version}
                  </option>
                ))}
              </LoadingCustomInput>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Status</InputGroupText>
              </InputGroupAddon>
              <CustomInput type="select" name="status" id="cardModalStatus" value={values.status} onChange={onChange}>
                {getLabels(null, 'Status').map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </CustomInput>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Finish</InputGroupText>
              </InputGroupAddon>
              <CustomInput type="select" name="finish" id="cardModalFinish" value={values.finish} onChange={onChange}>
                {getLabels(null, 'Finish').map((finish) => (
                  <option key={finish}>{finish}</option>
                ))}
              </CustomInput>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Mana Value</InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="cmc" value={values.cmc} onChange={onChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Type</InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="type_line" value={values.type_line} onChange={onChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Rarity</InputGroupText>
              </InputGroupAddon>
              <CustomInput type="select" name="rarity" id="cardModalRarity" value={values.rarity} onChange={onChange}>
                {getLabels(null, 'Rarity').map((rarity) => (
                  <option key={rarity}>{rarity}</option>
                ))}
              </CustomInput>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Image URL</InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="imgUrl" value={values.imgUrl} onChange={onChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Image Back URL</InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="imgBackUrl" value={values.imgBackUrl} onChange={onChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupText className="square-right">Color</InputGroupText>
              <ColorChecksControl prefix="color" values={values} onChange={onChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Color Category</InputGroupText>
              </InputGroupAddon>
              <CustomInput
                type="select"
                name="colorCategory"
                id="colorCat"
                value={values.colorCategory || cardGetLabels(card, 'Color Category')}
                onChange={onChange}
              >
                {getLabels(null, 'Color Category').map((colorCat) => (
                  <option key={colorCat}>{colorCat}</option>
                ))}
              </CustomInput>
            </InputGroup>

            <h5>Notes</h5>
            <InputGroup className="mb-3">
              <Input type="textarea" name="notes" value={values.notes} onChange={onChange} />
            </InputGroup>

            <h5>Tags</h5>
            <AutocompleteTagField
              tags={values.tags}
              disabled={disabled}
              InputProps={{ name: 'tagInput', fullWidth: true, placeholder: 'Tags to describe this card' }}
              freeSolo
              multiple
              updateTags={updateTags}
            />
          </fieldset>
        </Col>
      </Row>
    </ModalBody>
    <ModalFooter>
      {!disabled && !maybe && (
        <Button color="error" onClick={queueRemoveCard} variant="contained" sx={{ margin: 0.5 }}>
          <span className="d-none d-sm-inline">Remove from cube</span>
          <span className="d-sm-none">Remove</span>
        </Button>
      )}
      <Button
        color="secondary"
        href={card.details.scryfall_uri}
        target="_blank"
        variant="contained"
        sx={{ margin: 0.5 }}
      >
        <span className="d-none d-sm-inline">View on Scryfall</span>
        <span className="d-sm-none">Scryfall</span>
      </Button>
      <Button color="secondary" href={`/card/${card.cardID}`} target="_blank" variant="contained" sx={{ margin: 0.5 }}>
        <span className="d-none d-sm-inline">View card analytics</span>
        <span className="d-sm-none">Analytics</span>
      </Button>
      <Button color="secondary" href={getTCGLink(card)} target="_blank" variant="contained" sx={{ margin: 0.5 }}>
        Buy
      </Button>
      {!disabled && (
        <LoadingButton color="success" onClick={saveChanges} variant="contained" sx={{ margin: 0.5 }}>
          <span className="d-none d-sm-inline">Save changes</span>
          <span className="d-sm-none">Save</span>
        </LoadingButton>
      )}
    </ModalFooter>
  </Modal>
);
CardModal.propTypes = {
  card: CardPropType.isRequired,
  maybe: PropTypes.bool,
  versions: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  versionsLoading: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  values: CardPropType.isRequired,
  onChange: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
  queueRemoveCard: PropTypes.func.isRequired,
  updateTags: PropTypes.func.isRequired,
};
CardModal.defaultProps = {
  disabled: false,
  maybe: false,
  versionsLoading: false,
};
export default CardModal;
