import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardHeader, CardBody } from 'reactstrap';

import DynamicFlash from 'components/DynamicFlash';
import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

const ErrorPage = ({ title, error, requestId, loginCallback, details, siteCustomizations: { discordUrl, siteName } }) => {
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
            If you think this was a mistake, please report this on the{' '}
            <a href={discordUrl}>{siteName} Discord</a>
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
