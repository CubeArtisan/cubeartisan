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
import React, { useCallback } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import ArticlePropType from '@cubeartisan/client/proptypes/ArticlePropType.js';
import TimeAgo from '@cubeartisan/client/components/TimeAgo.js';

const ArticlePreview = ({ article }) => {
  const handleClick = useCallback(
    (event) => {
      if (!event.target.getAttribute('data-sublink')) {
        window.location.href = `/creators/article/${article._id}`;
      }
    },
    [article._id],
  );
  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" height="140" alt={article.title} img={article.image} />
        <CardContent>
          <Typography variant="h6">{article.title}</Typography>
          <Typography variant="subtitle2">{article.short}</Typography>
          <Typography variant="caption">
            Written by{' '}
            <a data-sublink href={`/user/${article.owner}`}>
              {article.username}
            </a>
          </Typography>
          <TimeAgo date={article.date} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ArticlePreview.propTypes = {
  article: ArticlePropType.isRequired,
};
export default ArticlePreview;
