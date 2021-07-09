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
import ArticlePropType from '@cubeartisan/client/proptypes/ArticlePropType.js';

import { Row, Col } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import ArticlePreview from '@cubeartisan/client/components/ArticlePreview.js';
import Paginate from '@cubeartisan/client/components/Paginate.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const PAGE_SIZE = 24;

export const ArticlesPage = ({ loginCallback, articles, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <h4>Articles</h4>
    <Row>
      {articles.map((article) => (
        <Col className="mb-3" xs="12" sm="6" lg="4">
          <ArticlePreview article={article} />
        </Col>
      ))}
    </Row>
    {count > PAGE_SIZE && (
      <Paginate
        count={Math.ceil(count / PAGE_SIZE)}
        active={parseInt(page, 10)}
        urlF={(i) => `/content/articles/${i}`}
      />
    )}
  </MainLayout>
);

ArticlesPage.propTypes = {
  loginCallback: PropTypes.string,
  articles: PropTypes.arrayOf(ArticlePropType).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

ArticlesPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ArticlesPage);
