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

import { Card, CardBody, FormGroup, Label, Input, Button, Col, Row, CardHeader } from 'reactstrap';

import CSRFForm from '@cubeartisan/client/components/CSRFForm.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const LostPassword = ({ loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Reset Password</h5>
      </CardHeader>
      <CardBody>
        <CSRFForm method="POST" action="/lostpassword/reset">
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label>Email Address:</Label>
              </Col>
              <Col sm="8">
                <Input maxLength="1000" name="email" id="email" type="text" />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label>Recovery Code:</Label>
              </Col>
              <Col sm="8">
                <Input maxLength="1000" name="code" id="code" type="text" />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label>New Password:</Label>
              </Col>
              <Col sm="8">
                <Input maxLength="1000" name="password" id="password" type="password" />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label>Confirm New Password:</Label>
              </Col>
              <Col sm="8">
                <Input maxLength="1000" name="password2" id="confirmPassword" type="password" />
              </Col>
            </Row>
          </FormGroup>
          <Button type="submit" color="success" block outline>
            Change Password
          </Button>
        </CSRFForm>
      </CardBody>
    </Card>
  </MainLayout>
);

LostPassword.propTypes = {
  loginCallback: PropTypes.string,
};

LostPassword.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(LostPassword);
