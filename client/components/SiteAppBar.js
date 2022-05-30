import { Brightness4, Brightness7 } from '@mui/icons-material';
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import React, { lazy, useCallback, useContext, useMemo } from 'react';

import CollapsingNavbar from '@cubeartisan/client/components/containers/CollapsingNavbar.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
// TODO: Add back in
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import NotificationsNav from '@cubeartisan/client/components/NotificationsNav.js';
import StyledButtonMenu from '@cubeartisan/client/components/StyledButtonMenu.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import { getCubeId } from '@cubeartisan/client/utils/Util.js';

const LoginModal = lazy(() => import('@cubeartisan/client/components/modals/LoginModal.js'));
const CreateCubeModal = lazy(() => import('@cubeartisan/client/components/modals/CreateCubeModal.js'));

const LoginModalLink = withModal(Button, LoginModal);
const CreateCubeModalLink = withModal(Button, CreateCubeModal);

const CONTENT_DASHBOARD_ITEM = { text: 'Content Creator Dashboard', link: '/creators/dashboard' };

const CONTENT_MENU = [
  { text: 'Browse All Content', link: '/creators/browse' },
  { text: 'Browse Articles', link: '/creators/articles' },
  { text: 'Browse Podcasts', link: '/creators/podcasts' },
  { text: 'Browse Videos', link: '/creators/videos' },
  CONTENT_DASHBOARD_ITEM,
];

const CUBES_MENU = [
  { text: 'Explore Cubes', link: '/cubes/explore' },
  { text: 'Search Cubes', link: '/cubes/search' },
  { text: 'Random Cube', link: '/cubes/random' },
];

const CARDS_MENU = [
  { text: 'Search Cards', link: '/cards/search' },
  { text: 'Packages', link: '/packages' },
  { text: 'Random Card', link: '/cards/random' },
];

const ABOUT_MENU = [
  { text: 'Contact', link: '/contact' },
  { text: 'Filter Syntax', link: '/filters' },
  { text: 'FAQ', link: '/faq' },
  { text: 'Our Story', link: '/ourstory' },
];

const SiteAppBar = ({ loginCallback }) => {
  const user = useContext(UserContext);
  const { siteName, sourceRepo } = useContext(SiteCustomizationContext);
  const { updateTheme, theme } = useContext(DisplayContext);
  const toggleTheme = useCallback(() => updateTheme(), [updateTheme]);
  const aboutMenuItems = useMemo(
    () => [...ABOUT_MENU, { link: sourceRepo, text: 'GitHub Source Repository' }],
    [sourceRepo],
  );
  const userCubesMenuItems = useMemo(
    () =>
      user?.cubes ? Array.from(user.cubes.map((item) => ({ link: `/cube/${getCubeId(item)}`, text: item.name }))) : [],
    [user],
  );
  const userProfileMenuItems = useMemo(
    () =>
      user?._id
        ? [
            { link: `/user/${user._id}`, text: 'Your Profile' },
            { link: `/user/${user._id}/social`, text: 'Your Social Feed' },
            { link: `/user/${user._id}/account`, text: 'Account Information and Setting' },
            CONTENT_DASHBOARD_ITEM,
            { link: '/logout', text: 'Logout' },
          ]
        : [],
    [user],
  );
  return (
    <AppBar color="appbar" enableColorOnDark position="static" sx={{ flex: '0 1 auto', width: '100%' }}>
      <Toolbar>
        <Container maxWidth="xl" sx={{ display: 'flex', maxHeight: 48 }}>
          <Box
            key="left"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexGrow: 1,
              alignItems: 'center',
              marginRight: 'auto',
            }}
          >
            <Link href="/">
              <Box
                component="img"
                src="/content/banner.png"
                alt={`${siteName}: a site for cubing Magic: the Gathering.`}
                sx={{ maxHeight: 48 }}
              />
            </Link>
            <IconButton onClick={toggleTheme} color="info">
              {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          <CollapsingNavbar sx={{ marginLeft: 'auto' }} breakpoint={1000}>
            <StyledButtonMenu menuItems={CONTENT_MENU} tooltip="Content posted by content creators.">
              Content
            </StyledButtonMenu>
            <StyledButtonMenu menuItems={CUBES_MENU} tooltip="Explore, search, and create cubes.">
              Cubes
            </StyledButtonMenu>
            <StyledButtonMenu menuItems={CARDS_MENU} tooltip="Search cards and card packages.">
              Cards
            </StyledButtonMenu>
            <StyledButtonMenu menuItems={aboutMenuItems} tooltip="About the site and other helpful information.">
              About
            </StyledButtonMenu>
            {user?._id ? (
              <>
                <StyledButtonMenu tooltip="Access your cubes." menuItems={userCubesMenuItems}>
                  Your Cubes
                </StyledButtonMenu>
                <CreateCubeModalLink modalProps={{}} color="inherit">
                  Create a new Cube
                </CreateCubeModalLink>
                <NotificationsNav />
                <StyledButtonMenu
                  tooltip="Access your profile, the content creator dashboard, or logout."
                  menuItems={userProfileMenuItems}
                >
                  {user.username}
                </StyledButtonMenu>
              </>
            ) : (
              <>
                <Button color="inherit" href="/user">
                  Register
                </Button>
                <Suspense>
                  <LoginModalLink color="inherit" modalProps={{ loginCallback }}>
                    Login
                  </LoginModalLink>
                </Suspense>
              </>
            )}
          </CollapsingNavbar>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
SiteAppBar.propTypes = {
  loginCallback: PropTypes.string,
};
SiteAppBar.defaultProps = {
  loginCallback: '/',
};
export default SiteAppBar;
