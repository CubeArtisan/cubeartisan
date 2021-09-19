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
import { Button, Card, Col, Row, CardHeader, CardBody, CardFooter } from 'reactstrap';

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
      <Row className="mt-3">
        <Col xs="12" md="6">
          <Card>
            <CardHeader>
              <h5>Your Cubes</h5>
            </CardHeader>
            <CardBody className="p-0">
              <Suspense>
                <Row className="no-gutters">
                  {cubes.length > 0 ? (
                    cubes.slice(0, 4).map((cube) => (
                      <Col key={cube._id} xs="12" sm="12" md="12" lg="6">
                        <CubePreview cube={cube} />
                      </Col>
                    ))
                  ) : (
                    <p className="m-2">
                      You don't have any cubes.{' '}
                      <CreateCubeModalButton color="success">Add a new cube?</CreateCubeModalButton>
                    </p>
                  )}
                </Row>
              </Suspense>
            </CardBody>
            {featuredPosition !== 'left' && (
              <CardFooter>{cubes.length > 2 && <a href={`/user/${cubes[0].owner}`}>View All</a>}</CardFooter>
            )}
          </Card>
          {featuredPosition === 'left' && (
            <Suspense>
              <CubesCard title="Featured Cubes" cubes={featured} lean />
            </Suspense>
          )}
        </Col>
        <Col xs="12" md="6">
          {featuredPosition === 'right' && (
            <Suspense>
              <CubesCard className="mb-4" title="Featured Cubes" cubes={featured} lean />
            </Suspense>
          )}
          <Card>
            <CardHeader>
              <h5>Recent Drafts of Your Cubes</h5>
            </CardHeader>
            <CardBody className="p-0">
              {decks.length > 0 ? (
                filteredDecks.map((deck) => (
                  <Suspense>
                    <DeckPreview key={deck._id} deck={deck} nextURL="/dashboard" canEdit />
                  </Suspense>
                ))
              ) : (
                <p className="m-2">
                  Nobody has drafted your cubes! Perhaps try reaching out on the{' '}
                  <a href={discordUrl}>Discord draft exchange?</a>
                </p>
              )}
            </CardBody>
            <CardFooter>
              <a href="/dashboard/decks/0">View All</a>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="8">
          <h5 className="mt-3">Feed</h5>
          <Suspense>
            <Feed items={posts} />
          </Suspense>
        </Col>
        <Col className="d-none d-md-block mt-3" md="4">
          <Row>
            <Col xs="12">
              <Row>
                <Col xs="6">
                  <h5>Latest Content</h5>
                </Col>
                <Col xs="6">
                  <a className="float-right" href="/content">
                    View more...
                  </a>
                </Col>
              </Row>
            </Col>
            <Suspense>
              {content.map((item) => (
                <Col className="mb-3" xs="12">
                  {item.type === 'article' && <ArticlePreview article={item.content} />}
                  {item.type === 'video' && <VideoPreview video={item.content} />}
                  {item.type === 'episode' && <PodcastEpisodePreview episode={item.content} />}
                </Col>
              ))}
            </Suspense>
          </Row>
        </Col>
      </Row>
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
