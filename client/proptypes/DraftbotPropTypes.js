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
import PropTypes from 'prop-types';

import CardPropType from '@hypercube/client/proptypes/CardPropType';
import { COLORS } from '@hypercube/client/drafting/draftbots';

export const StepPropType = PropTypes.shape({
  action: PropTypes.oneOf(['pass', 'pick', 'pickrandom', 'trash', 'trashrandom']).isRequired,
  amount: PropTypes.number,
});

const drafterStateSchema = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
  picked: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  trashed: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  seen: PropTypes.arrayOf(PropTypes.number.isRequired),
  cardsInPack: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  packNum: PropTypes.number.isRequired,
  pickNum: PropTypes.number.isRequired,
  numPacks: PropTypes.number.isRequired,
  packSize: PropTypes.number.isRequired,
  pickedNum: PropTypes.number.isRequired,
  trashedNum: PropTypes.number.isRequired,
  stepNumber: PropTypes.number.isRequired,
  pickNumber: PropTypes.number.isRequired,
  step: StepPropType,
};

export const ColorPropType = PropTypes.oneOf(COLORS);
export const DrafterStatePropType = PropTypes.shape(drafterStateSchema);
export const BotStatePropType = PropTypes.shape({
  ...drafterStateSchema,
  cardIndex: PropTypes.number.isRequired,
  probabilities: PropTypes.shape({}),
});
export const OraclePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  perConsideredCard: PropTypes.bool,
  weights: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired,
  // computeWeight : DrafterState -> number,
  computeWeight: PropTypes.func.isRequired,
  // computeValue: BotState -> number,
  computeValue: PropTypes.func.isRequired,
});
export const OracleResultPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
});
export const BotEvaluationPropType = PropTypes.shape({
  score: PropTypes.number.isRequired,
  oracleResults: PropTypes.arrayOf(OracleResultPropType.isRequired).isRequired,
  totalProbability: PropTypes.number,
});
export const PackPropType = PropTypes.shape({
  cards: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  steps: PropTypes.arrayOf(StepPropType.isRequired),
});
export const SeatPropType = PropTypes.shape({
  bot: PropTypes.bool,
  name: PropTypes.string.isRequired,
  userid: PropTypes.string,
  drafted: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired)
    .isRequired,
  sideboard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired)
    .isRequired,
  pickorder: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  trashorder: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  // packbacklog: PropTypes.arrayOf(PackPropType.isRequired).isRequired,
});
export const DraftPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  basics: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  cards: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  cube: PropTypes.string.isRequired,
  initial_state: PropTypes.arrayOf(PropTypes.arrayOf(PackPropType.isRequired).isRequired).isRequired,
  seats: PropTypes.arrayOf(SeatPropType.isRequired).isRequired,
  // unopenedPacks: PropTypes.arrayOf(PropTypes.arrayOf(PackPropType.isRequired).isRequired).isRequired,
});
