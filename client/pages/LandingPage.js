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
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import CardSearchBar from '@cubeartisan/client/components/inputs/CardSearchBar.js';
import Footer from '@cubeartisan/client/components/layouts/Footer.js';
import LoginModal from '@cubeartisan/client/components/modals/LoginModal.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const LoginModalButton = withModal(Button, LoginModal);

const BUTTON_SX = { maxWidth: '500', width: '33%', minWidth: 150, marginX: 'auto', marginY: 1 };

export const LandingPage = ({ numusers, numcubes, numdrafts }) => {
  const { siteName } = useContext(SiteCustomizationContext);
  return (
    <Grid container sx={{ width: '100hw', minHeight: '100vh' }}>
      <Grid
        item
        container
        xs={12}
        sm={6}
        sx={{ backgroundColor: 'background.darker', height: '100vh' }}
        justifyContent="center"
        alignItems="center"
      >
        <img src="/content/LandingLogo.png" alt={siteName} />
      </Grid>
      <Grid item container xs={12} sm={6} sx={{ backgroundColor: 'background.primary', flexFlow: 'column' }}>
        <Box sx={{ maxWidth: 800, width: '80%', minWidth: 160, flex: '0 1 auto', marginY: 5, marginX: 'auto' }}>
          <CardSearchBar />
        </Box>
        <Stack sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4" color="grey.800" align="center">
            Build, playtest, and share your Magic the Gathering cube!
          </Typography>
          <Typography variant="h5" align="center" color="grey.800" sx={{ marginBottom: 4 }}>
            <strong>{numusers}</strong>
            {' Users, '}
            <strong>{numcubes}</strong>
            {' Cubes, '}
            <strong>{numdrafts}</strong>
            {' Completed Drafts'}
          </Typography>
          <Button href="/user" color="primary" variant="contained" sx={BUTTON_SX}>
            Sign Up
          </Button>
          <LoginModalButton modalProps={{ loginCallback: '/' }} color="primary" variant="contained" sx={BUTTON_SX}>
            Login
          </LoginModalButton>
        </Stack>
        <Grid item sx={{ flex: '0 1 auto' }}>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
};

LandingPage.propTypes = {
  numusers: PropTypes.string.isRequired,
  numcubes: PropTypes.string.isRequired,
  numdrafts: PropTypes.string.isRequired,
};

export default RenderToRoot(LandingPage);
