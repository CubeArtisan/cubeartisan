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
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';

import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary.js';
import Footer from '@cubeartisan/client/components/layouts/Footer.js';
import SiteAppBar from '@cubeartisan/client/components/SiteAppBar.js';

/**
 * @typedef { import("react").ReactNode } ReactNode
 * @typedef { import("react").FunctionComponent<{ children: ReactNode, loginCallback?: string }> } ComponentType
 * @type ComponentType
 */
const MainLayout = ({ children, loginCallback }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <SiteAppBar loginCallback={loginCallback} />
      <Container maxWidth="xl">
        <ErrorBoundary>{children}</ErrorBoundary>
      </Container>
      <Footer />
    </Box>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  loginCallback: PropTypes.string,
};
MainLayout.defaultProps = {
  loginCallback: '/',
};
export default MainLayout;
