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
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { lazy, useState } from 'react';
import { Card, CardBody, Col, FormGroup, Input, Label, Nav, Row, TabContent, TabPane } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import CSRFForm from '@cubeartisan/client/components/inputs/CSRFForm.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Tab from '@cubeartisan/client/components/Tab.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import PodcastPropType from '@cubeartisan/client/proptypes/PodcastPropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const PodcastPreview = lazy(() => import('@cubeartisan/client/components/PodcastPreview.js'));
const Podcast = lazy(() => import('@cubeartisan/client/components/Podcast.js'));

export const EditPodcastPage = ({ loginCallback, podcast }) => {
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
              <a href="/creators" className="float-right">
                Back to Dashboard
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <CSRFForm method="POST" action={`/podcast/${podcast._id}`} autoComplete="off">
                <Input type="hidden" name="podcastid" value={podcast._id} />
                <Input type="hidden" name="rss" value={rss} />
                <Button type="submit" color="success" fullWidth disabled={!hasChanges}>
                  Update
                </Button>
              </CSRFForm>
            </Col>
            <Col xs="6">
              <CSRFForm method="POST" action={`/podcast/${podcast._id}/submit`} autoComplete="off">
                <Input type="hidden" name="podcastid" value={podcast._id} />
                <Input type="hidden" name="rss" value={rss} />
                <Button type="submit" outline color="success" fullWidth>
                  Publish
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
                  <Suspense>
                    <PodcastPreview podcast={podcast} />
                  </Suspense>
                </Col>
              </Row>
            </CardBody>
            <Suspense>
              <Podcast podcast={podcast} />
            </Suspense>
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
