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

import { Button, Form, Input } from 'reactstrap';

import { tcgMassEntryUrl } from '@hypercube/client/utils/Affiliate';

const exclude = ['Copy'];

const specialCases = {
  "City's Blessing": "City's Blessing Token (006)",
  'Energy Reserve': 'Energy Reserve Token',
  'Poison Counter': 'Poison Counter Token',
  'The Monarch': 'The Monarch Token',
  'Wrenn and Six Emblem': 'Goblin (010) // Emblem - Wrenn and Six (021) Double-sided Token',
  'Serra the Benevolent Emblem': 'Goblin (010) // Emblem - Serra the Benevolent (020) Double-sided Token',
};

const getEntry = ({ details }) => {
  if (exclude.includes(details.name)) {
    return null;
  }
  if (specialCases[details.name]) {
    return `1 ${specialCases[details.name]}`;
  }
  if (details.isToken) {
    return `1 ${details.name} Token`;
  }
  if (details.name.endsWith('Emblem')) {
    return `1 Emblem - ${details.name.replace(' Emblem', '')}`;
  }
  return `1 ${details.name}`;
};

const MassBuyButton = ({ cards, ...props }) => (
  <Form method="POST" action={tcgMassEntryUrl} inline>
    <Input
      type="hidden"
      name="c"
      value={cards
        .map(getEntry)
        .filter((x) => x)
        .join('||')}
    />
    <Button type="submit" color="secondary" {...props} />
  </Form>
);

MassBuyButton.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
};

export default MassBuyButton;
