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
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import CSRFForm from '@cubeartisan/client/components/utils/CSRFForm.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const LostPassword = ({ loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Recover Password</h5>
      </CardHeader>
      <CardBody>
        <p>
          To recover your password, provide the email associated with the account. A password reset link will be emailed
          to you.
        </p>
        <CSRFForm method="POST" action="/lostpassword">
          <FormGroup>
            <Row>
              <Col sm="3">
                <Label>Email Address:</Label>
              </Col>
              <Col sm="9">
                <Input maxLength="1000" name="email" id="email" type="text" />
              </Col>
            </Row>
          </FormGroup>
          <Button type="submit" color="success" fullWidth variant="outlined">
            Continue
          </Button>
        </CSRFForm>
      </CardBody>
    </Card>
  </MainLayout>
);

LostPassword.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  loginCallback: PropTypes.string,
};

LostPassword.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(LostPassword);
