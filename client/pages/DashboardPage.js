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
import { Button, Grid, Link, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { lazy, useContext } from 'react';

import {
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
  LayoutContainer,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import BlogPostPropType from '@cubeartisan/client/proptypes/BlogPostPropType.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const CreateCubeModal = lazy(() => import('@cubeartisan/client/components/modals/CreateCubeModal.js'));
const Feed = lazy(() => import('@cubeartisan/client/components/Feed.js'));
const CubePreview = lazy(() => import('@cubeartisan/client/components/CubePreview.js'));
const ArticlePreview = lazy(() => import('@cubeartisan/client/components/ArticlePreview.js'));
const DeckPreview = lazy(() => import('@cubeartisan/client/components/DeckPreview.js'));
const VideoPreview = lazy(() => import('@cubeartisan/client/components/VideoPreview.js'));
const PodcastEpisodePreview = lazy(() => import('@cubeartisan/client/components/PodcastEpisodePreview.js'));

const CreateCubeModalButton = withModal(Button, CreateCubeModal);

export const DashboardPage = ({ posts, cubes, decks, loginCallback, content }) => {
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
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} lg={6}>
          <LayoutContainer elevation={4} sx={{}}>
            <ContainerHeader title="Your Cubes" />
            <ContainerBody>
              <Suspense>
                {cubes.length > 0 ? (
                  <Grid container sx={{ padding: 1 }}>
                    {cubes.slice(0, 4).map((cube) => (
                      <Grid item key={cube._id} xs={12} lg={6} sx={{ padding: 1 }}>
                        <CubePreview cube={cube} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1">
                    You don't have any cubes.{' '}
                    <CreateCubeModalButton modalProps={{}} color="success">
                      Add a new cube?
                    </CreateCubeModalButton>
                  </Typography>
                )}
              </Suspense>
            </ContainerBody>
          </LayoutContainer>
        </Grid>
        <Grid item xs={12} lg={6}>
          <LayoutContainer elevation={4} sx={{}}>
            <ContainerHeader title="Recent Drafts of Your Cube" />
            <ContainerBody>
              {decks.length > 0 ? (
                <Stack spacing={1} sx={{ paddingX: 1 }}>
                  {filteredDecks.map((deck) => (
                    <Suspense>
                      <DeckPreview key={deck._id} deck={deck} nextURL="/dashboard" />
                    </Suspense>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body1">
                  Nobody has drafted your cubes! Perhaps try reaching out on the{' '}
                  <Link href={discordUrl}>Discord draft exchange?</Link>
                </Typography>
              )}
            </ContainerBody>
            <ContainerFooter>
              <Link variant="body1" href="/dashboard/decks/0" sx={{ marginLeft: 2, marginBottom: 1 }}>
                View All
              </Link>
            </ContainerFooter>
          </LayoutContainer>
        </Grid>
        <Grid item xs={12} lg={8}>
          <LayoutContainer elevation={4} sx={{}}>
            <ContainerHeader title="Your Feed" />
            <ContainerBody>
              <Suspense>
                <Feed items={posts} />
              </Suspense>
            </ContainerBody>
          </LayoutContainer>
        </Grid>
        <Grid item xs={12} lg={4} sx={{ padding: 2 }}>
          <LayoutContainer elevation={4} sx={{}}>
            <ContainerHeader title="Latest Content" sx={{ display: 'flex', alignItems: 'center' }}>
              <Link sx={{ marginLeft: 'auto' }} href="/content">
                View more...
              </Link>
            </ContainerHeader>
            <ContainerBody>
              <Suspense>
                {content.map((item) => {
                  if (item.type === 'article') {
                    return <ArticlePreview key={item.content._id} article={item.content} />;
                  }
                  if (item.type === 'video') {
                    return <VideoPreview key={item.content._id} video={item.content} />;
                  }
                  if (item.type === 'episode') {
                    return <PodcastEpisodePreview key={item.content._id} episode={item.content} />;
                  }
                  return null;
                })}
              </Suspense>
            </ContainerBody>
          </LayoutContainer>
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
};
DashboardPage.defaultProps = {
  loginCallback: '/',
};
export default RenderToRoot(DashboardPage);
