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
import {
  Button,
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
import PropTypes from 'prop-types';

import Affiliate from '@cubeartisan/client/utils/Affiliate.js';
import { getLabels, cardGetLabels } from '@cubeartisan/client/utils/Sort.js';
import { cardPrice, cardFoilPrice, cardPriceEur, cardTix, cardElo } from '@cubeartisan/client/utils/Card.js';

import { ColorChecksAddon } from '@cubeartisan/client/components/ColorCheck.js';
import LoadingButton from '@cubeartisan/client/components/LoadingButton.js';
import FoilCardImage from '@cubeartisan/client/components/FoilCardImage.js';
import TagInput from '@cubeartisan/client/components/TagInput.js';
import TextBadge from '@cubeartisan/client/components/TextBadge.js';
import Tooltip from '@cubeartisan/client/components/Tooltip.js';
import withLoading from '@cubeartisan/client/components/hoc/WithLoading.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

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
  setTagInput,
  addTagText,
  tagActions,
  ...props
}) => {
  return (
    <Modal size="lg" labelledby="cardModalHeader" toggle={toggle} {...props}>
      <ModalHeader id="cardModalHeader" toggle={toggle}>
        {card.details.name}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="12" sm="4">
            <FoilCardImage card={card} finish={values.finish} />
            <Row noGutters className="mb-2">
              {card.details.prices && Number.isFinite(cardPrice(card)) && (
                <TextBadge name="Price" className="mt-2 mr-2">
                  <Tooltip text="TCGPlayer Market Price">${cardPrice(card).toFixed(2)}</Tooltip>
                </TextBadge>
              )}
              {card.details.prices && Number.isFinite(cardFoilPrice(card)) && (
                <TextBadge name="Foil" className="mt-2 mr-2">
                  <Tooltip text="TCGPlayer Market Price">${cardFoilPrice(card).toFixed(2)}</Tooltip>
                </TextBadge>
              )}
              {card.details.prices && Number.isFinite(cardPriceEur(card)) && (
                <TextBadge name="EUR" className="mt-2 mr-2">
                  <Tooltip text="Cardmarket Price">€{cardPriceEur(card).toFixed(2)}</Tooltip>
                </TextBadge>
              )}
              {card.details.prices && Number.isFinite(cardTix(card)) && (
                <TextBadge name="TIX" className="mt-2 mr-2">
                  <Tooltip text="MTGO TIX">{cardTix(card).toFixed(2)}</Tooltip>
                </TextBadge>
              )}
              {Number.isFinite(cardElo(card)) && (
                <TextBadge name="Elo" className="mt-2">
                  {cardElo(card).toFixed(0)}
                </TextBadge>
              )}
            </Row>
          </Col>
          <Col xs="12" sm="8">
            <h5>Card Attributes</h5>
            <fieldset disabled={disabled}>
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
                  {versions.map(({ _id, version }) => {
                    return (
                      <option key={_id} value={_id}>
                        {version}
                      </option>
                    );
                  })}
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
                <ColorChecksAddon addonType="append" prefix="color" values={values} onChange={onChange} />
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
              <TagInput
                tags={values.tags}
                readOnly={disabled}
                inputValue={values.tagInput}
                handleInputChange={setTagInput}
                handleInputBlur={addTagText}
                {...tagActions}
              />
            </fieldset>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        {!disabled && !maybe && (
          <Button color="danger" onClick={queueRemoveCard}>
            <span className="d-none d-sm-inline">Remove from cube</span>
            <span className="d-sm-none">Remove</span>
          </Button>
        )}
        <Button color="secondary" href={card.details.scryfall_uri} target="_blank">
          <span className="d-none d-sm-inline">View on Scryfall</span>
          <span className="d-sm-none">Scryfall</span>
        </Button>
        <Button color="secondary" href={`/card/${card.cardID}`} target="_blank">
          <span className="d-none d-sm-inline">View card analytics</span>
          <span className="d-sm-none">Analytics</span>
        </Button>
        <Button color="secondary" href={Affiliate.getTCGLink(card)} target="_blank">
          Buy
        </Button>
        {!disabled && (
          <LoadingButton color="success" onClick={saveChanges}>
            <span className="d-none d-sm-inline">Save changes</span>
            <span className="d-sm-none">Save</span>
          </LoadingButton>
        )}
      </ModalFooter>
    </Modal>
  );
};
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
  setTagInput: PropTypes.func.isRequired,
  addTagText: PropTypes.func.isRequired,
  tagActions: PropTypes.shape({ addTag: PropTypes.func.isRequired, deleteTag: PropTypes.func.isRequired }).isRequired,
};
CardModal.defaultProps = {
  disabled: false,
  maybe: false,
  versionsLoading: false,
};
export default CardModal;
