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

import { Card, CardHeader, CardBody } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const ErrorPage = ({
  title,
  error,
  requestId,
  loginCallback,
  details,
  siteCustomizations: { discordUrl, siteName },
}) => {
  console.log(details);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="my-3">
        <CardHeader>
          <h4>{title}</h4>
        </CardHeader>
        <CardBody>
          <p>
            If you think this was a mistake, please report this on the <a href={discordUrl}>{siteName} Discord</a>
          </p>
          {error && (
            <p>
              {' '}
              <code>{error}</code>
            </p>
          )}
          {requestId && (
            <p>
              Request ID: <code>{requestId}</code>
            </p>
          )}
        </CardBody>
      </Card>
    </MainLayout>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  requestId: PropTypes.string,
  error: PropTypes.string,
  details: PropTypes.shape({}),
  loginCallback: PropTypes.string,
  siteCustomizations: PropTypes.shape({
    discordUrl: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
  }).isRequired,
};

ErrorPage.defaultProps = {
  loginCallback: '/',
  requestId: null,
  error: null,
  details: {},
};

export default RenderToRoot(ErrorPage);
