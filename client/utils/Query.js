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
import URLSearchParams from 'core-js-pure/features/url-search-params';

function query() {
  return typeof window !== 'undefined' ? window.location.search.slice(1) : '';
}

function changeQuery(params) {
  if (typeof window === 'undefined') {
    return;
  }
  const str = params.toString();
  if (str) {
    window.history.replaceState({}, document.title, `${window.location.pathname}?${str}${window.location.hash}`);
  } else {
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  }
}

function get(key, def) {
  const params = new URLSearchParams(query());
  const result = params.get(key);
  return result === null ? def : result;
}

function set(key, value) {
  const params = new URLSearchParams(query());
  params.set(key, value);
  changeQuery(params);
}

function del(key) {
  const params = new URLSearchParams(query());
  params.delete(key);
  changeQuery(params);
}

export default { get, set, del };
