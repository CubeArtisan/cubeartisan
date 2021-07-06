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

import { Col, Modal, ModalBody, ModalHeader, Row, FormGroup, Label, Input, Button, ModalFooter } from 'reactstrap';

import CSRFForm from '@cubeartisan/client/components/CSRFForm';

const LoginModal = ({ isOpen, toggle, loginCallback }) => (
  <Modal size="lg" isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Login</ModalHeader>
    <CSRFForm method="POST" action="/login">
      <ModalBody>
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
              <a href="/lostpassword">Forgot password?</a>
            </Col>
          </Row>
        </FormGroup>
        <Input type="hidden" name="loginCallback" value={loginCallback} />
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="success" block outline>
          Login
        </Button>
      </ModalFooter>
    </CSRFForm>
  </Modal>
);

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  loginCallback: PropTypes.string.isRequired,
};

export default LoginModal;
