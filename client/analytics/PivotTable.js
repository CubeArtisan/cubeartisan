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
import { useState } from 'react';
import PropTypes from 'prop-types';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import { fromEntries } from '@cubeartisan/client/utils/Util';

const PivotTable = ({ cards, characteristics }) => {
  const data = cards.map((card) =>
    fromEntries(
      [['Color', (card.colors || []).join()]].concat(
        Object.entries(characteristics).map(([key, value]) => [key, value.get(card)]),
      ),
    ),
  );
  const [state, updateState] = useState(data);

  return (
    <>
      <h4>Pivot Table</h4>
      <PivotTableUI data={data} onChange={updateState} {...state} />
    </>
  );
};

PivotTable.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  characteristics: PropTypes.shape({
    'Cube Elo': PropTypes.func.isRequired,
    'Mainboard Rate': PropTypes.func.isRequired,
    'Mainboard Count': PropTypes.func.isRequired,
    'Pick Rate': PropTypes.func.isRequired,
    'Pick Count': PropTypes.func.isRequired,
  }).isRequired,
};

export default PivotTable;
