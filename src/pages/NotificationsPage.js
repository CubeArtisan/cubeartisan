import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardHeader, CardBody } from 'reactstrap';

import Notification from 'components/Notification';
import DynamicFlash from 'components/DynamicFlash';
import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

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
