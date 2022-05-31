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
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  CustomInput,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import { AutocompleteCardField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import CSRFForm from '@cubeartisan/client/components/inputs/CSRFForm.js';
import TextEntry from '@cubeartisan/client/components/inputs/TextEntry.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import Query from '@cubeartisan/client/utils/Query.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const UserAccountPage = ({ defaultNav, loginCallback }) => {
  const user = useContext(UserContext);
  const [nav, setNav] = useQueryParam('nav', defaultNav);
  const [imageValue, setImageValue] = useState('');
  const [imageDict, setImageDict] = useState({});
  const [markdown, setMarkdown] = useState(user?.about ?? '');

  useEffect(() => {
    (async () => {
      const response = await fetch('/cards/images/dict');
      const json = await response.json();
      setImageDict(json.dict);
    })();
  }, []);

  const handleClickNav = useCallback(
    (event) => {
      event.preventDefault();
      setNav(event.target.getAttribute('data-nav'));
    },
    [setNav],
  );

  const handleChangeMarkdown = useCallback((event) => setMarkdown(event.target.value), [setMarkdown]);

  const result = imageDict[imageValue.toLowerCase()];
  let image;
  if (result) {
    image = {
      name: imageValue.replace(/ \[[^\]]*\]$/, ''),
      ...result,
    };
  } else {
    image = {
      name: user.image_name,
      uri: user.image,
      artist: user.artist,
    };
  }

  useEffect(() => {
    if (nav === 'profile') {
      Query.del('nav');
    } else {
      Query.set('nav', nav);
    }
  }, [nav]);

  return (
    <MainLayout loginCallback={loginCallback}>
      <h2 className="mt-3">My Account </h2>
      <DynamicFlash />
      <Row className="mb-3">
        <Col xs={3}>
          <Nav vertical pills>
            <NavItem>
              <NavLink href="#" active={nav === 'profile'} data-nav="profile" onClick={handleClickNav}>
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active={nav === 'password'} data-nav="password" onClick={handleClickNav}>
                Change Password
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active={nav === 'email'} data-nav="email" onClick={handleClickNav}>
                Update Email
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active={nav === 'display'} data-nav="display" onClick={handleClickNav}>
                Display Preferences
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" active={nav === 'patreon'} data-nav="patreon" onClick={handleClickNav}>
                Patreon Integration
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col xs={9}>
          <TabContent activeTab={nav}>
            <TabPane tabId="profile">
              <Card>
                <CardBody>
                  <CSRFForm method="POST" action={`/user/${user._id}`}>
                    <div className="form-group">
                      <dl className="row">
                        <dt className="col-sm-3">Username</dt>
                        <dd className="col-sm-9">
                          <Input name="username" defaultValue={user.username} />
                        </dd>
                        <dt className="col-sm-3">Email</dt>
                        <dd className="col-sm-9">{user.email}</dd>
                        <dt className="col-sm-3">Profile Pic</dt>
                        <dd className="col-sm-9">
                          <Row>
                            <Col xs={6}>
                              <div className="position-relative">
                                <img width="100%" src={image.uri} alt={image.name} />
                                <em className="cube-preview-artist">Art by {image.artist}</em>
                              </div>
                            </Col>
                            <Col xs={6}>
                              <AutocompleteCardField
                                fullNames
                                InputProps={{ name: 'remove', placeholder: 'Cardname for Image' }}
                                noButton
                                onInputChange={(_, value) => setImageValue(value)}
                              />
                              {result && <Input type="hidden" name="image" value={imageValue.toLowerCase()} />}
                            </Col>
                          </Row>
                        </dd>
                        <dt className="col-sm-3">About</dt>
                        <dd className="col-sm-9">
                          <TextEntry maxLength={2500} onChange={handleChangeMarkdown} name="body" value={markdown} />
                        </dd>
                      </dl>
                      <Row noGutters>
                        <Button variant="outlined" fullWidth color="success" type="submit">
                          Update
                        </Button>
                      </Row>
                    </div>
                  </CSRFForm>
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="password">
              <Card>
                <CardBody>
                  <CSRFForm method="POST" action={`/user/${user._id}/password`}>
                    <FormGroup row>
                      <Label for="password" className="col-sm-4 col-form-Label">
                        Old password:
                      </Label>
                      <Input className="col-sm-8" id="currentPassword" name="password" type="password" />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="newPassword" className="col-sm-4 col-form-Label">
                        New Password:
                      </Label>
                      <Input className="col-sm-8" id="newPassword" name="password2" type="password" />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="confirmPassword" className="col-sm-4 col-form-Label">
                        Confirm New Password:
                      </Label>
                      <Input className="col-sm-8" id="confirmPassword" name="password3" type="password" />
                    </FormGroup>
                    <Button variant="outlined" fullWidth color="success" type="submit">
                      Change Password
                    </Button>
                  </CSRFForm>
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="email">
              <Card>
                <CardBody>
                  <CSRFForm method="POST" action={`/user/${user._id}/email`}>
                    <FormGroup row>
                      <Label for="email" className="col-sm-4 col-form-Label">
                        New Email:
                      </Label>
                      <Input className="col-sm-8" id="email" name="email" type="email" defaultValue={user.email} />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="emailPassword" className="col-sm-4 col-form-Label">
                        Password:
                      </Label>
                      <Input className="col-sm-8" id="emailPassword" name="password" type="password" />
                    </FormGroup>
                    <Button fullWidth variant="outlined" color="success" type="submit">
                      Update
                    </Button>
                  </CSRFForm>
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="display">
              <Card>
                <CardBody>
                  <CSRFForm method="POST" action={`/user/${user._id}/display`}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Theme</InputGroupText>
                      </InputGroupAddon>
                      <CustomInput type="select" id="theme" name="theme" defaultValue={user.theme}>
                        <option value="default">Default</option>
                        <option value="dark">Dark Mode</option>
                      </CustomInput>
                    </InputGroup>
                    <FormGroup check className="mb-3">
                      <Input
                        id="hideFeatured"
                        name="hideFeatured"
                        type="checkbox"
                        defaultChecked={user.hide_featured || false}
                      />
                      <Label for="hideFeatured">Hide Featured Cubes</Label>
                    </FormGroup>
                    <Button fullWidth variant="outlined" color="success" type="submit">
                      Update
                    </Button>
                  </CSRFForm>
                </CardBody>
              </Card>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </MainLayout>
  );
};

UserAccountPage.propTypes = {
  defaultNav: PropTypes.string.isRequired,
  loginCallback: PropTypes.string,
};

UserAccountPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(UserAccountPage);
