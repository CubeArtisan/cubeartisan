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
import { HelpOutline } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Link, Toolbar, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { lazy, useContext, useState } from 'react';

import {
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
  LayoutContainer,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import CubeLayout from '@cubeartisan/client/components/layouts/CubeLayout.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';
import TextBadge from '@cubeartisan/client/components/TextBadge.js';
import Alert from '@cubeartisan/client/components/wrappers/Alert.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import { getCubeDescription, getCubeId } from '@cubeartisan/client/utils/Util.js';

const BlogPost = lazy(() => import('@cubeartisan/client/components/BlogPost.js'));
const CubeIdModal = lazy(() => import('@cubeartisan/client/components/modals/CubeIdModal.js'));
const CubeOverviewModal = lazy(() => import('@cubeartisan/client/components/modals/CubeOverviewModal.js'));
const CubeSettingsModal = lazy(() => import('@cubeartisan/client/components/modals/CubeSettingsModal.js'));
const CustomizeBasicsModal = lazy(() => import('@cubeartisan/client/components/modals/CustomizeBasicsModal.js'));
const DeleteCubeModal = lazy(() => import('@cubeartisan/client/components/modals/DeleteCubeModal.js'));
const FollowersModal = lazy(() => import('@cubeartisan/client/components/modals/FollowersModal.js'));

const CubeOverviewModalLink = withModal(Button, CubeOverviewModal);
const FollowersModalLink = withModal(Button, FollowersModal);
const CubeSettingsModalLink = withModal(Button, CubeSettingsModal);
const DeleteCubeModalLink = withModal(Button, DeleteCubeModal);
const CustomizeBasicsModalLink = withModal(Button, CustomizeBasicsModal);
const CubeIdModalLink = withModal(Box, CubeIdModal);

const CubeOverview = ({ post, priceOwned, pricePurchase, cube, followed, followers, loginCallback }) => {
  const user = useContext(UserContext);

  const [alerts, setAlerts] = useState([]);
  const [cubeState, setCubeState] = useState(cube);
  const [followedState, setFollowedState] = useState(followed);

  const addAlert = (color, message) => {
    setAlerts([...alerts, { color, message }]);
  };

  const onCubeUpdate = (updated) => {
    addAlert('success', 'Update Successful');
    setCubeState(updated);
  };

  const follow = async () => {
    setFollowedState(true);

    const response = await csrfFetch(`/cube/${cube._id}/follow`, {
      method: 'POST',
      headers: {},
    });
    if (!response.ok) console.error(response);
  };

  const unfollow = async () => {
    setFollowedState(false);

    const response = await csrfFetch(`/cube/${cube._id}/follow`, {
      method: 'DELETE',
      headers: {},
    });
    if (!response.ok) {
      console.error(response);
    }
  };

  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cubeState} activeLink="overview">
        {user && cubeState.owner === user._id ? (
          <Toolbar sx={{ backgroundColor: 'background.paper', marginBotton: 1, borderRadius: '0 0 2rem 2rem' }}>
            <Suspense>
              <CubeOverviewModalLink
                modalProps={{
                  cube: cubeState,
                  cubeID: cubeState._id,
                  onError: (message) => addAlert('danger', message),
                  onCubeUpdate,
                }}
              >
                Edit Overview
              </CubeOverviewModalLink>
            </Suspense>
            <Suspense>
              <CubeSettingsModalLink cube={cubeState} modalProps={{ addAlert, onCubeUpdate }}>
                Edit Settings
              </CubeSettingsModalLink>
            </Suspense>
            <Suspense>
              <CustomizeBasicsModalLink
                modalProps={{
                  cube: cubeState,
                  onError: (message) => {
                    addAlert('danger', message);
                  },
                  updateBasics: (basics) => {
                    const deepClone = JSON.parse(JSON.stringify(cubeState));
                    deepClone.basics = basics;
                    onCubeUpdate(deepClone);
                  },
                }}
              >
                Customize Basics
              </CustomizeBasicsModalLink>
            </Suspense>
            <Suspense>
              <DeleteCubeModalLink modalProps={{ cubeid: cubeState._id }}>Delete Cube</DeleteCubeModalLink>
            </Suspense>
          </Toolbar>
        ) : (
          <Box sx={{ marginBotton: 1 }} />
        )}
        <DynamicFlash />
        {alerts.map(({ color, message }, index) => (
          <Alert
            color={color}
            key={/* eslint-disable-line react/no-array-index-key */ index}
            onClose={() => setAlerts((old) => old.filter((_, idx) => idx !== index))}
          >
            {message}
          </Alert>
        ))}
        <Grid container sx={{ marginY: 2 }}>
          <Grid item xs={12} md={4} sx={{ paddingX: 1 }}>
            <LayoutContainer sx={{}}>
              <ContainerHeader title={cubeState.name} variant="h3" />
              <ContainerBody>
                <Box display="flex">
                  <Typography variant="h6" sx={{ marginBottom: 0, width: 'fit-content' }}>
                    <Suspense>
                      <FollowersModalLink modalProps={{ followers }}>
                        {cubeState.users_following.length}{' '}
                        {cubeState.users_following.length === 1 ? 'follower' : 'followers'}
                      </FollowersModalLink>
                    </Suspense>
                  </Typography>
                  <Box sx={{ marginLeft: 'auto', border: '1px solid', lineHeight: 1, display: 'flex' }}>
                    <TextBadge name="Cube ID">
                      <Tooltip title="Click to copy to clipboard">
                        <Button
                          onClick={(e) => {
                            navigator.clipboard.writeText(getCubeId(cubeState));
                            e.target.blur();
                            addAlert('success', 'Cube ID copied to clipboard.');
                          }}
                          sx={{ borderLeft: '1px solid', borderRadius: 0, width: 'min-content', padding: 1 }}
                        >
                          {getCubeId(cubeState)}
                        </Button>
                      </Tooltip>
                    </TextBadge>
                  </Box>
                  <Suspense>
                    <CubeIdModalLink
                      modalProps={{ fullID: cube._id, shortID: getCubeId(cubeState), alert: addAlert }}
                      aria-label="Show Cube IDs"
                      className="mr-2"
                    >
                      <IconButton>
                        <HelpOutline />
                      </IconButton>
                    </CubeIdModalLink>
                  </Suspense>
                </Box>
                <Box
                  alt={cubeState.image_name}
                  src={cubeState.image_uri}
                  component="img"
                  sx={{ marginX: '-16px', width: 'calc(100% + 32px)', marginTop: 0.5 }}
                />
                <Typography component="em" variant="caption" sx={{ marginLeft: 1 }}>
                  Art by {cubeState.image_artist}
                </Typography>
                {cube.type && (
                  <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {getCubeDescription(cubeState)}
                  </Typography>
                )}
                <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                  <Typography variant="subtitle2">
                    Designed by
                    <Link href={`/user/${cubeState.owner}`}> {cubeState.owner_name}</Link>
                  </Typography>{' '}
                  • <Link href={`/cube/${cubeState._id}/rss`}>RSS</Link>
                </Typography>
                {!cubeState.privatePrices && (
                  <Box sx={{ marginBottom: 1, marginX: 2, display: 'flex' }}>
                    {Number.isFinite(priceOwned) && (
                      <TextBadge name="Owned" sx={{ border: '1px solid', marginRight: 1 }}>
                        <Tooltip title="TCGPlayer Market Price as owned (excluding cards marked Not Owned)">
                          <Button disabled sx={{ borderLeft: '1px solid', borderRadius: 0 }}>
                            ${Math.round(priceOwned).toLocaleString()}
                          </Button>
                        </Tooltip>
                      </TextBadge>
                    )}
                    {Number.isFinite(pricePurchase) && (
                      <TextBadge name="Buy" sx={{ border: '1px solid' }}>
                        <Tooltip title="TCGPlayer Market Price for cheapest version of each card">
                          <Button disabled sx={{ borderLeft: '1px solid', borderRadius: 0 }}>
                            ${Math.round(pricePurchase).toLocaleString()}
                          </Button>
                        </Tooltip>
                      </TextBadge>
                    )}
                  </Box>
                )}
                {user &&
                  cubeState.owner !== user._id &&
                  (followedState ? (
                    <Button variant="contained" disabled color="warning" onClick={unfollow}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button color="success" disabled variant="contained" onClick={follow}>
                      Follow
                    </Button>
                  ))}
              </ContainerBody>
            </LayoutContainer>
          </Grid>
          <Grid item xs={12} md={8} sx={{ paddingX: 1 }}>
            <LayoutContainer sx={{ height: '100%' }}>
              <ContainerHeader title="Description" variant="h3" />
              <ContainerBody>
                <Markdown markdown={cubeState.description ?? ''} />
              </ContainerBody>
              <ContainerFooter sx={{ display: 'flex' }}>
                {cubeState.tags.map((tag) => (
                  <Link
                    href={`/cubes/search/tag:"${tag}"/0`}
                    key={tag}
                    sx={{
                      backgroundColor: 'background.darker',
                      margin: 0.5,
                      paddingX: 1,
                      paddingY: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    {tag}
                  </Link>
                ))}
              </ContainerFooter>
            </LayoutContainer>
          </Grid>
        </Grid>
        {post && (
          <Suspense>
            <BlogPost key={post._id} post={post} loggedIn={user !== null} />
          </Suspense>
        )}
      </CubeLayout>
    </MainLayout>
  );
};
CubeOverview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  priceOwned: PropTypes.number,
  pricePurchase: PropTypes.number,
  cube: CubePropType.isRequired,
  followed: PropTypes.bool.isRequired,
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ),
  loginCallback: PropTypes.string,
};
CubeOverview.defaultProps = {
  post: null,
  priceOwned: null,
  pricePurchase: null,
  followers: [],
  loginCallback: '/',
};
export default RenderToRoot(CubeOverview);
