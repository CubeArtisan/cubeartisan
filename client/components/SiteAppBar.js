import React, { lazy, useCallback, useContext } from 'react';
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
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import NotificationsNav from '@cubeartisan/client/components/NotificationsNav.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';

const LoginModal = lazy(() => import('@cubeartisan/client/components/modals/LoginModal.js'));
const CreateCubeModal = lazy(() => import('@cubeartisan/client/components/modals/CreateCubeModal.js'));

const LoginModalLink = withModal(NavLink, LoginModal);
const CreateCubeModalLink = withModal(DropdownItem, CreateCubeModal);

const SiteAppBar = ({ loginCallback }) => {
  const user = useContext(UserContext);
  const { siteName, sourceRepo } = useContext(SiteCustomizationContext);
  const [expanded, toggle] = useToggle(false);
  const { updateTheme, theme } = useContext(DisplayContext);
  const toggleTheme = useCallback(() => updateTheme(), [updateTheme]);
  return (
    <Navbar color="dark" expand="md" dark style={{ width: '100%', height: 'fit-content' }}>
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
            <IconButton onClick={toggleTheme} color="info">
              {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {user?._id ? (
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
                      <Suspense>
                        <CreateCubeModalLink>Create A New Cube</CreateCubeModalLink>
                      </Suspense>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {user.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href={`/user/${user._id}`}>Your Profile</DropdownItem>
                    {user.roles && user.roles.includes('Admin') && (
                      <DropdownItem href="/admin/dashboard">Admin Page</DropdownItem>
                    )}
                    <DropdownItem href="/creators/dashboard">Content Creator Dashboard</DropdownItem>
                    <Suspense>
                      <CreateCubeModalLink>Create A New Cube</CreateCubeModalLink>
                    </Suspense>
                    <DropdownItem href={`/user/${user._id}/social`}>Social</DropdownItem>
                    <DropdownItem href={`/user/${user._id}/account`}>Account Information</DropdownItem>
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
                  <Suspense>
                    <LoginModalLink modalProps={{ loginCallback }}>Login</LoginModalLink>
                  </Suspense>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
SiteAppBar.propTypes = {
  loginCallback: PropTypes.string,
};
SiteAppBar.defaultProps = {
  loginCallback: '/',
};
export default SiteAppBar;
