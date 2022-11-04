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
import { lazy, useContext, useEffect, useState } from 'react';
import { Card, CardBody, Col, FormGroup, Input, Label, Nav, Row, Spinner, TabContent, TabPane } from 'reactstrap';

import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import { AutocompleteCardField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import CSRFForm from '@cubeartisan/client/components/inputs/CSRFForm.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Tab from '@cubeartisan/client/components/Tab.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import VideoPropType from '@cubeartisan/client/proptypes/VideoPropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const Video = lazy(() => import('@cubeartisan/client/components/Video.js'));
const VideoPreview = lazy(() => import('@cubeartisan/client/components/VideoPreview.js'));

export const EditVideoPage = ({ loginCallback, video }) => {
  const user = useContext(UserContext);
  const { siteName } = useContext(SiteCustomizationContext);

  const [tab, setTab] = useQueryParam('tab', '0');
  const [body, setBody] = useState(video.body);
  const [short, setShort] = useState(video.short);
  const [url, setUrl] = useState(video.url);
  const [title, setTitle] = useState(video.title);
  const [imageName, setImageName] = useState(video.imagename);
  const [imageArtist, setImageArtist] = useState(video.artist);
  const [imageUri, setImageUri] = useState(video.image);
  const [imageDict, setImageDict] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch('/cards/images/dict');
      const json = await response.json();
      setLoading(false);
      setImageDict(json.dict);
    })();
  }, []);

  useEffect(() => {
    if (imageDict) {
      const result = imageDict[imageName.toLowerCase()];
      if (result) {
        setImageArtist(result.artist);
        setImageUri(result.uri);
      }
    }
  }, [imageName, imageDict]);

  const hasChanges = video.body !== body || video.url !== url || video.title !== title || video.imagename !== imageName;

  return (
    <MainLayout loginCallback={loginCallback}>
      <Card>
        <CardBody>
          <Row>
            <Col xs="12" sm="6">
              <h4>Edit Video</h4>
            </Col>
            <Col xs="12" sm="6">
              <a href="/creators" className="float-right">
                Back to Dashboard
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <CSRFForm method="POST" action={`/video/${video._id}`} autoComplete="off">
                <Input type="hidden" name="videoid" value={video._id} />
                <Input type="hidden" name="title" value={title} />
                <Input type="hidden" name="short" value={short} />
                <Input type="hidden" name="image" value={imageUri} />
                <Input type="hidden" name="imagename" value={imageName} />
                <Input type="hidden" name="artist" value={imageArtist} />
                <Input type="hidden" name="body" value={body} />
                <Input type="hidden" name="url" value={url} />
                <Button type="submit" color="success" fullWidth disabled={!hasChanges}>
                  Save
                </Button>
              </CSRFForm>
            </Col>
            <Col xs="6">
              <CSRFForm method="POST" action={`/video/${video._id}/submit`} autoComplete="off">
                <Input type="hidden" name="videoid" value={video._id} />
                <Input type="hidden" name="title" value={title} />
                <Input type="hidden" name="short" value={short} />
                <Input type="hidden" name="image" value={imageUri} />
                <Input type="hidden" name="imagename" value={imageName} />
                <Input type="hidden" name="artist" value={imageArtist} />
                <Input type="hidden" name="body" value={body} />
                <Input type="hidden" name="url" value={url} />
                <Button type="submit" variant="outlined" color="success" fullWidth>
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
                    <Input disabled value={video.status} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Title:</Label>
                  </Col>
                  <Col sm="10">
                    <Input maxLength="1000" value={title} onChange={(event) => setTitle(event.target.value)} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Video URL:</Label>
                  </Col>
                  <Col sm="10">
                    <Input maxLength="1000" value={url} onChange={(event) => setUrl(event.target.value)} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Short Description:</Label>
                  </Col>
                  <Col sm="10">
                    <Input maxLength="1000" value={short} onChange={(event) => setShort(event.target.value)} />
                    <p>Plaintext only. This short description will be used for the video preview.</p>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Thumbnail:</Label>
                  </Col>
                  <Col sm="5">
                    <AutocompleteCardField
                      fullNames
                      InputProps={{ name: 'remove', placeholder: 'Cardname for Image', 'data-lpignore': true }}
                      onInputChange={(_, value) => setImageName(value)}
                      noButton
                    />
                  </Col>
                  <Col sm="5">
                    <Card>
                      {loading ? (
                        <div className="centered py-3">
                          <Spinner className="position-absolute" />
                        </div>
                      ) : (
                        <div className="position-relative">
                          <img width="100%" src={imageUri} alt={imageName} />
                          <em className="cube-preview-artist">Art by {imageArtist}</em>
                        </div>
                      )}
                    </Card>
                  </Col>
                </Row>
              </FormGroup>
              <p>
                Write any supplmental text here. {siteName} videos use a variation of markdown you can read about{' '}
                <a href="/markdown" target="_blank">
                  here
                </a>
                .
              </p>
              <Input
                type="textarea"
                maxLength="1000000"
                className="w-100 video-area"
                value={body}
                onChange={(event) => setBody(event.target.value)}
              />
            </CardBody>
          </TabPane>
          <TabPane tabId="1">
            <CardBody>
              <Row className="px-3">
                <Suspense>
                  <Col xs="12" sm="6" md="4" className="mb-3">
                    <VideoPreview
                      video={{
                        username: user.username,
                        title,
                        body,
                        short,
                        artist: imageArtist,
                        imagename: imageName,
                        image: imageUri,
                        date: video.date,
                      }}
                    />
                  </Col>
                  <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
                    <VideoPreview
                      video={{
                        username: user.username,
                        title,
                        body,
                        short,
                        artist: imageArtist,
                        imagename: imageName,
                        image: imageUri,
                        date: video.date,
                      }}
                    />
                  </Col>
                </Suspense>
              </Row>
            </CardBody>
            <Suspense>
              <Video
                video={{
                  username: user.username,
                  title,
                  body,
                  short,
                  artist: imageArtist,
                  imagename: imageName,
                  image: imageUri,
                  date: video.date,
                  url,
                }}
              />
            </Suspense>
          </TabPane>
        </TabContent>
      </Card>
    </MainLayout>
  );
};

EditVideoPage.propTypes = {
  loginCallback: PropTypes.string,
  video: VideoPropType.isRequired,
};

EditVideoPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(EditVideoPage);
