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
import PropTypes from 'prop-types';
import ArticlePropType from '@cubeartisan/client/proptypes/ArticlePropType';

import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import Paginate from '@cubeartisan/client/components/Paginate';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';
import ButtonLink from '@cubeartisan/client/components/ButtonLink';
import ArticlePreview from '@cubeartisan/client/components/ArticlePreview';

const PAGE_SIZE = 24;

const ReviewArticlesPage = ({ loginCallback, articles, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Articles in Review</h5>
        {count > PAGE_SIZE ? (
          <>
            <h6>
              {`Displaying ${PAGE_SIZE * page + 1}-${Math.min(count, PAGE_SIZE * (page + 1))} of ${count} Articles`}
            </h6>
            <Paginate
              count={Math.ceil(count / PAGE_SIZE)}
              active={parseInt(page, 10)}
              urlF={(i) => `/admin/reviewarticles/${i}`}
            />
          </>
        ) : (
          <h6>{`Displaying all ${count} Articles`}</h6>
        )}
      </CardHeader>
      {articles.map((article) => (
        <CardBody className="border-top">
          <Row>
            <Col xs="12" sm="4">
              <ArticlePreview article={article} />
            </Col>
            <Col xs="12" sm="4">
              <ButtonLink color="success" outline block href={`/admin/publisharticle/${article._id}`}>
                Publish
              </ButtonLink>
            </Col>
            <Col xs="12" sm="4">
              <ButtonLink color="danger" outline block href={`/admin/removearticlereview/${article._id}`}>
                Remove from Reviews
              </ButtonLink>
            </Col>
          </Row>
        </CardBody>
      ))}
    </Card>
  </MainLayout>
);

ReviewArticlesPage.propTypes = {
  loginCallback: PropTypes.string,
  articles: PropTypes.arrayOf(ArticlePropType).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

ReviewArticlesPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ReviewArticlesPage);
