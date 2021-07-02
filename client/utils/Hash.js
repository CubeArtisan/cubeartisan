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

function hash() {
  return typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
}

function changeHash(newHash) {
  if (typeof window === 'undefined') {
    return;
  }
  const url = window.location.pathname + window.location.search + (newHash ? `#${newHash}` : '');
  window.history.replaceState({}, document.title, url);
}

function get(key, def) {
  const params = new URLSearchParams(hash());
  const result = params.get(key);
  return result === null ? def : result;
}

function set(key, value) {
  const params = new URLSearchParams(hash());
  params.set(key, value);
  changeHash(params.toString());
}

function del(key) {
  const params = new URLSearchParams(hash());
  params.delete(key);
  changeHash(params.toString());
}

export default { get, set, del };
