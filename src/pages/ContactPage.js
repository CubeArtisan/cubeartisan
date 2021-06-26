import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import DynamicFlash from 'components/DynamicFlash';
import SiteCustomizationContext from 'contexts/SiteCustomizationContext';
import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

const ContactPage = ({ loginCallback }) => {
  const { discordUrl, siteName, supportEmail } = useContext(SiteCustomizationContext);
  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="my-3 mx-4">
        <CardHeader>
          <h5>Contact</h5>
        </CardHeader>
        <CardBody>
          <p>
            Feel free to contact us if you have any issues or concerns. Comments, ideas, and suggestions are always
            welcome. Here are the easiest ways to get in touch with us:
          </p>
          <Row>
            <Col xs="12" sm="4">
              <strong>Email</strong>
            </Col>
            <Col xs="12" sm="8" className="mb-3">
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            </Col>
            <Col xs="12" sm="4">
              <strong>Discord</strong>
            </Col>
            <Col xs="12" sm="8">
              <a href={discordUrl} target="_blank" rel="noopener noreferrer">
                {discordUrl}
              </a>
            </Col>
          </Row>
          <p className="mt-4">
            If you're looking to apply to be a {siteName} content creator partner, please fill out the application{' '}
            <a href="/content/application">here</a>.
          </p>
        </CardBody>
      </Card>
    </MainLayout>
  );
};

ContactPage.propTypes = {
  loginCallback: PropTypes.string,
};

ContactPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ContactPage);
