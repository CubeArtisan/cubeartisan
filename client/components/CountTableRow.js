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

const CountTableRow = ({ label, value }) => (
  <tr>
    <td>{label}:</td>
    <td>
      {Math.round(value[1] * 1000.0) / 10}%<span className="percent">{value[0]}</span>
    </td>
  </tr>
);
CountTableRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
export default CountTableRow;
