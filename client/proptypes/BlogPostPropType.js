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

const BlogPostPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  cube: PropTypes.string.isRequired,
  html: PropTypes.string,
  markdown: PropTypes.string,
  dev: PropTypes.string.isRequired,
  date_formatted: PropTypes.string.isRequired,
  changelist: PropTypes.string,
  username: PropTypes.string.isRequired,
  cubename: PropTypes.string.isRequired,
});

export default BlogPostPropType;
