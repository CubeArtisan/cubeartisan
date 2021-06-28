import { useContext } from 'react';
import PropTypes from 'prop-types';
import CubePropType from '@hypercube/client/proptypes/CubePropType';
import DeckPropType from '@hypercube/client/proptypes/DeckPropType';
import BlogPostPropType from '@hypercube/client/proptypes/BlogPostPropType';

import UserContext from '@hypercube/client/contexts/UserContext';
import CubePreview from '@hypercube/client/components/CubePreview';
import ArticlePreview from '@hypercube/client/components/ArticlePreview';
import DeckPreview from '@hypercube/client/components/DeckPreview';
import VideoPreview from '@hypercube/client/components/VideoPreview';
import PodcastEpisodePreview from '@hypercube/client/components/PodcastEpisodePreview';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';
import withModal from '@hypercube/client/components/WithModal';
import CreateCubeModal from '@hypercube/client/components/CreateCubeModal';
import Feed from '@hypercube/client/components/Feed';

import { Button, Card, Col, Row, CardHeader, CardBody, CardFooter } from 'reactstrap';
import CubesCard from '@hypercube/client/components/CubesCard';

const CreateCubeModalButton = withModal(Button, CreateCubeModal);

const DashboardPage = ({ posts, cubes, decks, loginCallback, content, featured }) => {
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
            </CardBody>
            {featuredPosition !== 'left' && (
              <CardFooter>{cubes.length > 2 && <a href={`/user/view/${cubes[0].owner}`}>View All</a>}</CardFooter>
            )}
          </Card>
          {featuredPosition === 'left' && (
            <CubesCard
              title="Featured Cubes"
              cubes={featured}
              lean
              header={{ hLevel: 5, sideLink: '/donate', sideText: 'Learn more...' }}
            />
          )}
        </Col>
        <Col xs="12" md="6">
          {featuredPosition === 'right' && (
            <CubesCard
              className="mb-4"
              title="Featured Cubes"
              cubes={featured}
              lean
              header={{ hLevel: 5, sideLink: '/donate', sideText: 'Learn more...' }}
            />
          )}
          <Card>
            <CardHeader>
              <h5>Recent Drafts of Your Cubes</h5>
            </CardHeader>
            <CardBody className="p-0">
              {decks.length > 0 ? (
                filteredDecks.map((deck) => <DeckPreview key={deck._id} deck={deck} nextURL="/dashboard" canEdit />)
              ) : (
                <p className="m-2">
                  Nobody has drafted your cubes! Perhaps try reaching out on the{' '}
                  <a href="https://discord.gg/Hn39bCU">Discord draft exchange?</a>
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
          <Feed items={posts} />
        </Col>
        <Col className="d-none d-md-block mt-3" md="4">
          <Row>
            <Col xs="12">
              <Row>
                <Col xs="6">
                  <h5>Latest Content</h5>
                </Col>
                <Col xs="6">
                  <a className="float-right" href="/content/browse">
                    View more...
                  </a>
                </Col>
              </Row>
            </Col>
            {content.map((item) => (
              <Col className="mb-3" xs="12">
                {item.type === 'article' && <ArticlePreview article={item.content} />}
                {item.type === 'video' && <VideoPreview video={item.content} />}
                {item.type === 'episode' && <PodcastEpisodePreview episode={item.content} />}
              </Col>
            ))}
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
