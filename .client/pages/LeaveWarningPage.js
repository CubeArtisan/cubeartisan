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
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import {
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
  LayoutContainer,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const back = () => (window.history.length > 1 ? window.history.back() : window.close());

export const LeaveWarningPage = ({ url, loginCallback, siteCustomizations: { siteName } }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <LayoutContainer sx={{ marginY: 3 }}>
      <ContainerHeader title={`You are about to leave ${siteName}`} variant="h4" />
      <ContainerBody>
        <Typography variant="body1" component="p">
          This link leads to: <code>{url}</code>
        </Typography>
        <Typography variant="body1">Are you sure you want to proceed?</Typography>
      </ContainerBody>
      <ContainerFooter>
        <Button href={url} color="warning">
          Yes, continue
        </Button>
        <Button color="secondary" onClick={back}>
          Go back
        </Button>
      </ContainerFooter>
    </LayoutContainer>
  </MainLayout>
);
LeaveWarningPage.propTypes = {
  url: PropTypes.string.isRequired,
  loginCallback: PropTypes.string,
  siteCustomizations: PropTypes.shape({
    siteName: PropTypes.string.isRequired,
  }).isRequired,
};
LeaveWarningPage.defaultProps = {
  loginCallback: '/',
};
export default RenderToRoot(LeaveWarningPage);
