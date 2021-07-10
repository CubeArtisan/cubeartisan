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
import { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import CreateCubeModal from '@cubeartisan/client/components/modals/CreateCubeModal.js';
import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary.js';
import LoginModal from '@cubeartisan/client/components/modals/LoginModal.js';
import NotificationsNav from '@cubeartisan/client/components/NotificationsNav.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import ThemeContext from '@cubeartisan/client/components/contexts/ThemeContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import Footer from '@cubeartisan/client/layouts/Footer.js';

const LoginModalLink = withModal(NavLink, LoginModal);
const CreateCubeModalLink = withModal(DropdownItem, CreateCubeModal);

const MainLayout = ({ children, loginCallback }) => {
  const user = useContext(UserContext);
  const { siteName, sourceRepo } = useContext(SiteCustomizationContext);
  const [expanded, toggle] = useToggle(false);

  return (
    <div className="flex-container flex-vertical viewport">
      <Navbar color="dark" expand="md" dark>
        <Container fluid="xl">
          <div className="d-flex flex-nowrap w-100 header-banner">
            <div className="overflow-hidden mr-auto">
              <a href="/">
                <img
                  className="banner-image"
                  src="/content/banner.png"
                  alt={`${siteName}: a site for cubing Magic: the Gathering.`}
                />
              </a>
            </div>
            <button className="navbar-toggler" type="button" onClick={toggle}>
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <Collapse className="banner-collapse" isOpen={expanded} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Content
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/content">Browse</DropdownItem>
                  <DropdownItem href="/articles">Articles</DropdownItem>
                  <DropdownItem href="/podcasts">Podcasts</DropdownItem>
                  <DropdownItem href="/videos">Videos</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Cube
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/cubes/explore">Explore Cubes</DropdownItem>
                  <DropdownItem href="/cubes/search">Search Cubes</DropdownItem>
                  <DropdownItem href="/cubes/random">Random Cube</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Cards
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/cards/search">Search Cards</DropdownItem>
                  <DropdownItem href="/packages">Packages</DropdownItem>
                  <DropdownItem href="/cards/random">Random Card</DropdownItem>
                  <DropdownItem href="/filters">Filter Syntax</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  About
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/dev/blog">Dev Blog</DropdownItem>
                  <DropdownItem href="/contact">Contact</DropdownItem>
                  <DropdownItem href="/ourstory">Our Story</DropdownItem>
                  <DropdownItem href="/faq">FAQ</DropdownItem>
                  <DropdownItem href={sourceRepo}>Github</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {user ? (
                <>
                  <NotificationsNav />
                  {user.cubes && user.cubes.length > 0 && (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Your Cubes
                      </DropdownToggle>
                      <DropdownMenu right>
                        {user.cubes.map((item) => (
                          <DropdownItem key={`dropdown_cube_${item.name}`} href={`/cube/${item._id}`}>
                            {item.name}
                          </DropdownItem>
                        ))}
                        <DropdownItem divider />
                        <CreateCubeModalLink>Create A New Cube</CreateCubeModalLink>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href={`/user/${user.id}`}>Your Profile</DropdownItem>
                      {user.roles && user.roles.includes('Admin') && (
                        <DropdownItem href="/admin/dashboard">Admin Page</DropdownItem>
                      )}
                      {user.roles && user.roles.includes('ContentCreator') && (
                        <DropdownItem href="/creators">Content Creator Dashboard</DropdownItem>
                      )}
                      <CreateCubeModalLink>Create A New Cube</CreateCubeModalLink>
                      <DropdownItem href={`/user/${user.id}/social`}>Social</DropdownItem>
                      <DropdownItem href={`/user/${user.id}/account`}>Account Information</DropdownItem>
                      <DropdownItem href="/logout">Logout</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink href="/user">Register</NavLink>
                  </NavItem>
                  <NavItem>
                    <LoginModalLink modalProps={{ loginCallback }}>Login</LoginModalLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Container fluid="xl" className="flex-grow main-content">
        <ThemeContext.Provider value={user?.theme ?? 'default'}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeContext.Provider>
      </Container>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  loginCallback: PropTypes.string,
};

MainLayout.defaultProps = {
  loginCallback: '/',
};

export default MainLayout;
