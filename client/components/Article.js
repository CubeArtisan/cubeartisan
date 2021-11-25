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
import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';

import ArticlePropType from '@cubeartisan/client/proptypes/ArticlePropType.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';
import CommentsSection from '@cubeartisan/client/components/CommentsSection.js';
import TimeAgo from '@cubeartisan/client/components/TimeAgo.js';

const Article = ({ article }) => (
  <Stack divider={<Divider />}>
    <Box sx={{ backgroundColor: 'vars(--bg-darker)' }}>
      <Typography variant="h1">{article.title}</Typography>
      <Typography variant="h6">
        By <a href={`/user/${article.owner}`}>{article.username}</a>
        {' | '}
        <TimeAgo date={article.date} />
      </Typography>
    </Box>
    <Markdown markdown={article.body} />
    <CommentsSection parentType="article" parent={article._id} collapse={false} />
  </Stack>
);
Article.propTypes = {
  article: ArticlePropType.isRequired,
};

export default Article;
