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
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const ContactPage = ({ loginCallback }) => {
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
            <a href="/application">here</a>.
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
