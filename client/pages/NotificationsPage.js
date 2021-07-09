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

import Notification from '@cubeartisan/client/components/Notification.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const NotificationsPage = ({ notifications, loginCallback, siteCustomizations: { discordUrl, siteName } }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="mx-auto">
      <CardHeader>
        <h5>Notifications</h5>
      </CardHeader>
      <CardBody className="p-0">
        {notifications.length > 0 ? (
          notifications
            .slice()
            .reverse()
            .map((notification) => <Notification key={notification._id} notification={notification} />)
        ) : (
          <p className="m-2">
            You don't have any notifications! Why don't you try sharing your cube on the{' '}
            <a href={discordUrl}>{siteName} Discord</a>?
          </p>
        )}
      </CardBody>
    </Card>
  </MainLayout>
);

NotificationsPage.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  loginCallback: PropTypes.string,
  siteCustomizations: PropTypes.shape({
    discordUrl: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
  }).isRequired,
};

NotificationsPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(NotificationsPage);
