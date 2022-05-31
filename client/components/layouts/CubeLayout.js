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
import { useContext } from 'react';

import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import { CubeContextProvider } from '@cubeartisan/client/components/contexts/CubeContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import CubeNavbar from '@cubeartisan/client/components/navbars/CubeNavbar.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';

const CubeLayout = ({ cube, activeLink, children }) => {
  const user = useContext(UserContext);
  return (
    <CubeContextProvider cubeID={cube._id} initialCube={cube} canEdit={user && cube.owner === user._id}>
      <CubeNavbar activeLink={activeLink} />
      <ErrorBoundary>{children}</ErrorBoundary>
    </CubeContextProvider>
  );
};
CubeLayout.propTypes = {
  cube: CubePropType.isRequired,
  activeLink: PropTypes.string.isRequired,
  children: PropTypes.node,
};
CubeLayout.defaultProps = {
  children: false,
};
export default CubeLayout;
