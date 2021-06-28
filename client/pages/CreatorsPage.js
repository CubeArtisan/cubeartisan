import PropTypes from 'prop-types';

import { Nav, CardHeader, Card, TabContent, TabPane } from 'reactstrap';

import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import Tab from '@hypercube/client/components/Tab';
import CreatorArticles from '@hypercube/client/components/CreatorArticles';
import CreatorVideos from '@hypercube/client/components/CreatorVideos';
import CreatorPodcasts from '@hypercube/client/components/CreatorPodcasts';
import useQueryParam from '@hypercube/client/hooks/useQueryParam';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const CreatorsPage = ({ loginCallback }) => {
  const [tab, setTab] = useQueryParam('tab', '0');

  return (
    <MainLayout loginCallback={loginCallback}>
      <Card className="pb-3">
        <CardHeader>
          <h5>Content Creator Dashboard</h5>
        </CardHeader>
        <Nav className="mt-3" tabs justified>
          <Tab tab={tab} setTab={setTab} index="0">
            Articles
          </Tab>
          <Tab tab={tab} setTab={setTab} index="1">
            Podcasts
          </Tab>
          <Tab tab={tab} setTab={setTab} index="2">
            Videos
          </Tab>
        </Nav>
        <DynamicFlash />
        <TabContent activeTab={tab}>
          <TabPane tabId="0">
            <CreatorArticles />
          </TabPane>
          <TabPane tabId="1">
            <CreatorPodcasts />
          </TabPane>
          <TabPane tabId="2">
            <CreatorVideos />
          </TabPane>
        </TabContent>
      </Card>
    </MainLayout>
  );
};

CreatorsPage.propTypes = {
  loginCallback: PropTypes.string,
};

CreatorsPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CreatorsPage);
