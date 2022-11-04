/*
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
function expectOperator(test, operator, number) {
  switch (operator) {
    case '=':
      return expect(test).toEqual(number);
    case '<':
      return expect(test).toBeLessThan(number);
    case '<=':
      return expect(test).toBeLessThanOrEqual(number);
    case '>':
      return expect(test).toBeGreaterThan(number);
    case '>=':
      return expect(test).toBeGreaterThanOrEqual(number);
    case '!=':
      return expect(test).not.toEqual(number);
    default:
      return expect(false).toEqual(true);
  }
}

export default { expectOperator };
