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
import PropTypes from 'prop-types';

/**
 * @typedef {import('@cubeartisan/client/proptypes/NotificationPropType.js').Notification} Notification
 * @typedef User
 * @property {string?} _id
 * @property {string?} [email]
 * @property {string?} [username]
 * @property {string?} [about]
 * @property {Notification[]} notifications
 * @property {string?} [image_name]
 * @property {string?} [image]
 * @property {string?} [artist]
 * @property {string[]} users_following
 * @property {string[]} roles
 * @property {boolean} hide_featured
 * @property {('default' | 'dark')?} theme
 */

const UserPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  email: PropTypes.string,
  username: PropTypes.string,
  about: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.shape({})),
  image_name: PropTypes.string,
  image: PropTypes.string,
  artist: PropTypes.string,
  theme: PropTypes.string,
  users_following: PropTypes.arrayOf(PropTypes.string.isRequired),
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  hide_featured: PropTypes.bool,
});
export default UserPropType;
