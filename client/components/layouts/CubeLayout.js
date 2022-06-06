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
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import CubeNavbar from '@cubeartisan/client/components/navbars/CubeNavbar.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').Cube} Cube
 */

/**
 * @typedef CubeLayoutProps
 * @property {Cube} cube
 * @property {string} activeLink
 * @property {React.ReactNode} children
 * @property {string} loginCallback
 */

/** @type {React.FC<CubeLayoutProps>} */
const CubeLayout = ({ cube, activeLink, children, loginCallback }) => {
  const user = useContext(UserContext);
  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeContextProvider cubeID={cube._id} initialCube={cube} canEdit={user && cube.owner === user._id}>
        <CubeNavbar activeLink={activeLink} />
        <ErrorBoundary>{children}</ErrorBoundary>
      </CubeContextProvider>
    </MainLayout>
  );
};
CubeLayout.propTypes = {
  // @ts-ignore
  cube: CubePropType.isRequired,
  activeLink: PropTypes.string.isRequired,
  // @ts-ignore
  children: PropTypes.node.isRequired,
  loginCallback: PropTypes.string.isRequired,
};
export default CubeLayout;
