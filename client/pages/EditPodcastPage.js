import { useState } from 'react';
import PropTypes from 'prop-types';
import PodcastPropType from '@hypercube/client/proptypes/PodcastPropType';

import { Nav, CardBody, Card, TabContent, TabPane, Input, FormGroup, Row, Col, Label, Button } from 'reactstrap';

import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import PodcastPreview from '@hypercube/client/components/PodcastPreview';
import Tab from '@hypercube/client/components/Tab';
import Podcast from '@hypercube/client/components/Podcast';
import useQueryParam from '@hypercube/client/hooks/useQueryParam';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';
import CSRFForm from '@hypercube/client/components/CSRFForm';

const EditPodcastPage = ({ loginCallback, podcast }) => {
  const [tab, setTab] = useQueryParam('tab', '0');
  const [rss, setRss] = useState(podcast.rss);

  const hasChanges = podcast.rss !== rss;

  return (
    <MainLayout loginCallback={loginCallback}>
      <Card>
        <CardBody>
          <Row>
            <Col xs="12" sm="6">
              <h4>Edit Podcast</h4>
            </Col>
            <Col xs="12" sm="6">
              <a href="/content/creators" className="float-right">
                Back to Dashboard
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <CSRFForm method="POST" action="/content/editpodcast" autoComplete="off">
                <Input type="hidden" name="podcastid" value={podcast._id} />
                <Input type="hidden" name="rss" value={rss} />
                <Button type="submit" color="success" block disabled={!hasChanges}>
                  Update
                </Button>
              </CSRFForm>
            </Col>
            <Col xs="6">
              <CSRFForm method="POST" action="/content/submitpodcast" autoComplete="off">
                <Input type="hidden" name="podcastid" value={podcast._id} />
                <Input type="hidden" name="rss" value={rss} />
                <Button type="submit" outline color="success" block>
                  Submit for Review
                </Button>
              </CSRFForm>
            </Col>
          </Row>
        </CardBody>
        <Nav className="mt-2" tabs justified>
          <Tab tab={tab} setTab={setTab} index="0">
            Source
          </Tab>
          <Tab tab={tab} setTab={setTab} index="1">
            Preview
          </Tab>
        </Nav>
        <DynamicFlash />
        <TabContent activeTab={tab}>
          <TabPane tabId="0">
            <CardBody>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Status:</Label>
                  </Col>
                  <Col sm="10">
                    <Input disabled value={podcast.status} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>RSS Link:</Label>
                  </Col>
                  <Col sm="10">
                    <Input maxLength="1000" value={rss} onChange={(event) => setRss(event.target.value)} />
                  </Col>
                </Row>
              </FormGroup>
            </CardBody>
          </TabPane>
          <TabPane tabId="1">
            <CardBody>
              <Row>
                <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
                  <PodcastPreview podcast={podcast} />
                </Col>
              </Row>
            </CardBody>
            <Podcast podcast={podcast} />
          </TabPane>
        </TabContent>
      </Card>
    </MainLayout>
  );
};

EditPodcastPage.propTypes = {
  loginCallback: PropTypes.string,
  podcast: PodcastPropType.isRequired,
};

EditPodcastPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(EditPodcastPage);
