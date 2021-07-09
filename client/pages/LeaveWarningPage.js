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

import { Card, CardHeader, CardBody, Button, CardFooter } from 'reactstrap';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import ButtonLink from '@cubeartisan/client/components/ButtonLink.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const back = () => (window.history.length > 1 ? window.history.back() : window.close());

const LeaveWarningPage = ({ url, loginCallback, siteCustomizations: { siteName } }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h4>You are about to leave {siteName}</h4>
      </CardHeader>
      <CardBody>
        <p>
          This link leads to: <code>{url}</code>
        </p>
        <p>Are you sure you want to proceed?</p>
      </CardBody>
      <CardFooter>
        <ButtonLink href={url} color="danger">
          Yes, continue
        </ButtonLink>
        <Button className="ml-2" color="secondary" onClick={back}>
          Go back
        </Button>
      </CardFooter>
    </Card>
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
