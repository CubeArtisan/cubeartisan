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
export function add(data, field, value) {
  if (data[field]) data[field].push(value);
  else data[field] = [value];
}

export function shallowEqual(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;

  for (const prop in a) {
    if (a[prop] !== b[prop]) return false;
  }
  return true;
}

export default {
  add,
  shallowEqual,
};
