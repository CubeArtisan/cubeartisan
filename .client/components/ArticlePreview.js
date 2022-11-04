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
import PreviewCard from '@cubeartisan/client/components/utils/PreviewCard.js';
import ArticlePropType from '@cubeartisan/client/proptypes/ArticlePropType.js';

const ArticlePreview = ({ article }) => (
  <PreviewCard
    href={`/creators/article/${article._id}`}
    date={article.date}
    image={article.image}
    title={article.title}
    subtitle={article.short}
    username={article.username}
  />
);
ArticlePreview.propTypes = {
  article: ArticlePropType.isRequired,
};
export default ArticlePreview;
