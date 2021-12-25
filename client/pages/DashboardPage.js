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
import React, { lazy, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, CardHeader, Grid, Link, Paper, Typography } from '@mui/material';

import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';
import BlogPostPropType from '@cubeartisan/client/proptypes/BlogPostPropType.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';

const CreateCubeModal = lazy(() => import('@cubeartisan/client/components/modals/CreateCubeModal.js'));
const CubesCard = lazy(() => import('@cubeartisan/client/components/CubesCard.js'));
const Feed = lazy(() => import('@cubeartisan/client/components/Feed.js'));
const CubePreview = lazy(() => import('@cubeartisan/client/components/CubePreview.js'));
const ArticlePreview = lazy(() => import('@cubeartisan/client/components/ArticlePreview.js'));
const DeckPreview = lazy(() => import('@cubeartisan/client/components/DeckPreview.js'));
const VideoPreview = lazy(() => import('@cubeartisan/client/components/VideoPreview.js'));
const PodcastEpisodePreview = lazy(() => import('@cubeartisan/client/components/PodcastEpisodePreview.js'));

const CreateCubeModalButton = withModal(Button, CreateCubeModal);

export const DashboardPage = ({ posts, cubes, decks, loginCallback, content, featured }) => {
  const { discordUrl } = useContext(SiteCustomizationContext);
  const user = useContext(UserContext);
  // where featured cubes are positioned on the screen
  let featuredPosition;
  if (!user.hide_featured) {
    featuredPosition = cubes.length > 2 ? 'right' : 'left';
  }

  // the number of drafted decks shown, based on where cubes are located
  let filteredDecks = decks;
  if (featuredPosition === 'right') {
    filteredDecks = decks.slice(0, 4);
  }
  if (!featuredPosition && cubes.length <= 2) {
    filteredDecks = decks.slice(0, 6);
  }

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Grid container spacing={1} sx={{ marginBottom: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={4}>
            <Typography variant="h5" sx={{ backgroundColor: 'background.darker' }}>
              Your Cubes
            </Typography>
            <Box>
              <Suspense>
                <Grid container sx={{ padding: 0 }}>
                  {cubes.length > 0 ? (
                    cubes.slice(0, 4).map((cube) => (
                      <Grid item key={cube._id} xs={12} md={6} sx={{ padding: 1 }}>
                        <CubePreview cube={cube} />
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1">
                      You don't have any cubes.{' '}
                      <CreateCubeModalButton color="success">Add a new cube?</CreateCubeModalButton>
                    </Typography>
                  )}
                </Grid>
              </Suspense>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} spacing={1}>
          <Paper elevation={4}>
            <Typography variant="h5" sx={{ backgroundColor: 'background.darker' }}>
              Recent Drafts of Your Cubes
            </Typography>
            <Box>
              {decks.length > 0 ? (
                filteredDecks.map((deck) => (
                  <Suspense>
                    <DeckPreview key={deck._id} deck={deck} nextURL="/dashboard" />
                  </Suspense>
                ))
              ) : (
                <p className="m-2">
                  Nobody has drafted your cubes! Perhaps try reaching out on the{' '}
                  <a href={discordUrl}>Discord draft exchange?</a>
                </p>
              )}
            </Box>
            <Link variant="body1" href="/dashboard/decks/0" sx={{ marginLeft: 1 }}>
              View All
            </Link>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Paper elevation={4}>
            <Typography variant="h5" color="text.primary" sx={{ backgroundColor: 'background.darker', width: '100%' }}>
              Feed
            </Typography>
            <Suspense>
              <Feed items={posts} />
            </Suspense>
          </Paper>
        </Grid>
        <Grid item md={4} sx={{ padding: 0 }}>
          <Paper elevation={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container spacing={1} sx={{ backgroundColor: 'background.darker' }}>
                  <Grid item xs={6}>
                    <Typography variant="h5" color="text.primary">
                      Latest Content
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Link sx={{ float: 'right' }} href="/content">
                      View more...
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Suspense>
                {content.map((item) => (
                  <Grid item xs={12} key={item.content._id} sx={{ padding: 1, marginLeft: 1 }}>
                    {item.type === 'article' && <ArticlePreview article={item.content} />}
                    {item.type === 'video' && <VideoPreview video={item.content} />}
                    {item.type === 'episode' && <PodcastEpisodePreview episode={item.content} />}
                  </Grid>
                ))}
              </Suspense>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

DashboardPage.propTypes = {
  posts: PropTypes.arrayOf(BlogPostPropType).isRequired,
  cubes: PropTypes.arrayOf(CubePropType).isRequired,
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loginCallback: PropTypes.string,
  featured: PropTypes.arrayOf(CubePropType),
};

DashboardPage.defaultProps = {
  loginCallback: '/',
  featured: [],
};
export default RenderToRoot(DashboardPage);
