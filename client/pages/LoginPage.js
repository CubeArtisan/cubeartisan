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

export const LoginPage = ({ loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Login</h5>
      </CardHeader>
      <CardBody>
        <CSRFForm method="POST" action="/user/login">
          <FormGroup>
            <Row>
              <Col sm="3">
                <Label>Username or Email Address:</Label>
              </Col>
              <Col sm="9">
                <Input maxLength="1000" name="username" id="email" type="text" />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm="3">
                <Label>Password:</Label>
              </Col>
              <Col sm="9">
                <Input maxLength="1000" name="password" id="password" type="password" />
              </Col>
            </Row>
            <Row>
              <Col sm="3" />
              <Col sm="9">
                <a href="/user/lostpassword">Forgot password?</a>
              </Col>
            </Row>
          </FormGroup>
          <Button type="submit" color="success" block outline>
            Login
          </Button>
        </CSRFForm>
      </CardBody>
    </Card>
  </MainLayout>
);

LoginPage.propTypes = {
  loginCallback: PropTypes.string,
};

LoginPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(LoginPage);
