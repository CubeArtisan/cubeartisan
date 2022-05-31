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
 */
import PropTypes from 'prop-types';

/**
 * @typedef Notification
 * @property {string?} [text]
 * @property {string?} [user_from_name]
 * @property {string?} [url]
 * @property {string?} [user_from]
 * @property {string?} [date]
 */

const NotificationPropType = PropTypes.shape({
  text: PropTypes.string,
  user_from_name: PropTypes.string,
  url: PropTypes.string,
  user_from: PropTypes.string,
  date: PropTypes.string,
});
export default NotificationPropType;
