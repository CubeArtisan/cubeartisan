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
import { useState, useCallback } from 'react';
import ArticlePropType from '@cubeartisan/client/proptypes/ArticlePropType.js';

import { Card } from 'reactstrap';
import AspectRatioBox from '@cubeartisan/client/components/AspectRatioBox.js';
import TimeAgo from 'react-timeago';

const ArticlePreview = ({ article }) => {
  const [hover, setHover] = useState(false);
  const handleMouseOver = useCallback((event) => setHover(!event.target.getAttribute('data-sublink')), []);
  const handleMouseOut = useCallback(() => setHover(false), []);
  const handleClick = useCallback(
    (event) => {
      if (!event.target.getAttribute('data-sublink')) {
        window.location.href = `/article/${article._id}`;
      }
    },
    [article],
  );
  return (
    <Card
      className={hover ? 'cube-preview-card hover' : 'cube-preview-card'}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      <AspectRatioBox ratio={2} className="text-ellipsis">
        <img className="content-preview-img" alt={article.title} src={article.image} />
        <h6 className="content-preview-banner article-preview-bg">
          <strong>Article</strong>
        </h6>
      </AspectRatioBox>
      <div className="w-100 pt-1 pb-1 px-2">
        <h6 className="text-muted text-ellipsis mt-0 mb-0 pb-1">{article.title}</h6>
        <small>
          <p className="mb-0">{article.short}</p>
        </small>
      </div>
      <div className={`w-100 pb-1 pt-0 px-2 m-0 ${hover ? 'preview-footer-bg-hover' : 'preview-footer-bg'}`}>
        <small className="float-left">
          Written by{' '}
          <a data-sublink href={`/user/${article.owner}`}>
            {article.username}
          </a>
        </small>
        <small className="float-right">
          <TimeAgo date={article.date} />
        </small>
      </div>
    </Card>
  );
};

ArticlePreview.propTypes = {
  article: ArticlePropType.isRequired,
};
export default ArticlePreview;
