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
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ArticlePropType from '@cubeartisan/client/proptypes/ArticlePropType';

import {
  Spinner,
  Nav,
  CardBody,
  Card,
  TabContent,
  TabPane,
  Input,
  FormGroup,
  Row,
  Col,
  Label,
  Button,
} from 'reactstrap';

import UserContext from '@cubeartisan/client/contexts/UserContext';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import ArticlePreview from '@cubeartisan/client/components/ArticlePreview';
import Tab from '@cubeartisan/client/components/Tab';
import Article from '@cubeartisan/client/components/Article';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';
import AutocompleteInput from '@cubeartisan/client/components/AutocompleteInput';
import CSRFForm from '@cubeartisan/client/components/CSRFForm';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam';

const EditArticlePage = ({ loginCallback, article, siteCustomizations }) => {
  const user = useContext(UserContext);

  const [tab, setTab] = useQueryParam('tab', '0');
  const [body, setBody] = useState(article.body);
  const [title, setTitle] = useState(article.title);
  const [short, setShort] = useState(article.short || '');
  const [imageName, setImageName] = useState(article.imagename);
  const [imageArtist, setImageArtist] = useState(article.artist);
  const [imageUri, setImageUri] = useState(article.image);
  const [imageDict, setImageDict] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/cube/api/imagedict')
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setImageDict(json.dict);
      });
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

  const hasChanges =
    article.body !== body || article.title !== title || article.imagename !== imageName || article.short !== short;

  return (
    <MainLayout loginCallback={loginCallback} siteCustomizations={siteCustomizations}>
      <Card>
        <CardBody>
          <Row>
            <Col xs="12" sm="6">
              <h4>Edit Article</h4>
            </Col>
            <Col xs="12" sm="6">
              <a href="/content/creators" className="float-right">
                Back to Dashboard
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <CSRFForm method="POST" action="/content/editarticle" autoComplete="off">
                <Input type="hidden" name="articleid" value={article._id} />
                <Input type="hidden" name="title" value={title} />
                <Input type="hidden" name="short" value={short} />
                <Input type="hidden" name="image" value={imageUri} />
                <Input type="hidden" name="imagename" value={imageName} />
                <Input type="hidden" name="artist" value={imageArtist} />
                <Input type="hidden" name="body" value={body} />
                <Button type="submit" color="success" block disabled={!hasChanges}>
                  Save
                </Button>
              </CSRFForm>
            </Col>
            <Col xs="6">
              <CSRFForm method="POST" action="/content/submitarticle" autoComplete="off">
                <Input type="hidden" name="articleid" value={article._id} />
                <Input type="hidden" name="title" value={title} />
                <Input type="hidden" name="short" value={short} />
                <Input type="hidden" name="image" value={imageUri} />
                <Input type="hidden" name="imagename" value={imageName} />
                <Input type="hidden" name="artist" value={imageArtist} />
                <Input type="hidden" name="body" value={body} />
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
                    <Input disabled value={article.status} />
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
                    <Label>Short Description:</Label>
                  </Col>
                  <Col sm="10">
                    <Input maxLength="1000" value={short} onChange={(event) => setShort(event.target.value)} />
                    <p>Plaintext only. This short description will be used for the article preview.</p>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm="2">
                    <Label>Thumbnail:</Label>
                  </Col>
                  <Col sm="5">
                    <AutocompleteInput
                      treeUrl="/cube/api/fullnames"
                      treePath="cardnames"
                      type="text"
                      className="mr-2"
                      name="remove"
                      value={imageName}
                      onChange={(event) => setImageName(event.target.value)}
                      onSubmit={(event) => event.preventDefault()}
                      placeholder="Cardname for Image"
                      autoComplete="off"
                      data-lpignore
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
                Write the article text here. {siteCustomizations.siteName} articles use a variation of markdown you can
                read about{' '}
                <a href="/markdown" target="_blank">
                  here
                </a>
                .
              </p>
              <Input
                type="textarea"
                maxLength="1000000"
                className="w-100 article-area"
                value={body}
                onChange={(event) => setBody(event.target.value)}
              />
            </CardBody>
          </TabPane>
          <TabPane tabId="1">
            <CardBody>
              <h5>Article Previews</h5>
              <Row>
                <Col xs="12" sm="6" md="4" className="mb-3">
                  <ArticlePreview
                    article={{
                      username: user.username,
                      title,
                      body,
                      short,
                      artist: imageArtist,
                      imagename: imageName,
                      image: imageUri,
                      date: article.date,
                    }}
                  />
                </Col>
                <Col xs="12" sm="6" md="4" lg="3" className="mb-3">
                  <ArticlePreview
                    article={{
                      username: user.username,
                      title,
                      body,
                      short,
                      artist: imageArtist,
                      imagename: imageName,
                      image: imageUri,
                      date: article.date,
                    }}
                  />
                </Col>
              </Row>
            </CardBody>
            <Article
              article={{
                username: user.username,
                title,
                body,
                artist: imageArtist,
                imagename: imageName,
                image: imageUri,
                date: article.date,
              }}
            />
          </TabPane>
        </TabContent>
      </Card>
    </MainLayout>
  );
};

EditArticlePage.propTypes = {
  loginCallback: PropTypes.string,
  article: ArticlePropType.isRequired,
  siteCustomizations: PropTypes.shape({
    discordUrl: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    sourceRepo: PropTypes.string.isRequired,
    supportEmail: PropTypes.string.isRequired,
  }).isRequired,
};

EditArticlePage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(EditArticlePage);
