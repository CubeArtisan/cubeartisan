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
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const DownTimePage = ({ siteCustomizations: { discordUrl, siteName, supportEmail } }) => (
  <Col xs="12" md="8" xl="5" style={{ margin: 'auto' }}>
    <Row className="mb-5 mt-4">
      <img src="/content/logo.png" alt={`${siteName} logo`} width="50%" style={{ margin: 'auto' }} />
    </Row>
    <Card>
      <CardHeader>
        <h5>{siteName} is currently down for scheduled maintenance.</h5>
      </CardHeader>
      <CardBody>
        <p>
          The {siteName} developers are working hard on improving the service! This downtime is necessary to improve the
          long-term performance of {siteName}. Sorry for any temporary inconvenience!
        </p>
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
      </CardBody>
    </Card>
  </Col>
);
DownTimePage.propTypes = {
  siteCustomizations: PropTypes.shape({
    discordUrl: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    supportEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default RenderToRoot(DownTimePage);
