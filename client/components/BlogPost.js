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
import React, { lazy, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';

import BlogPostPropType from '@cubeartisan/client/proptypes/BlogPostPropType.js';
import TimeAgo from '@cubeartisan/client/components/TimeAgo.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import BlogContextMenu from '@cubeartisan/client/components/BlogContextMenu.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';

const CommentsSection = lazy(() => import('@cubeartisan/client/components/CommentsSection.js'));

const BlogPost = ({ post, onEdit }) => {
  const user = useContext(UserContext);
  const canEdit = user && user._id === post.owner;

  return (
    <Paper elevation={3}>
      <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={1}>
        <Box sx={{ backgroundColor: 'var(--bg-darker)' }}>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <Link variant="h5" href={`/cube/${post.cube}/blog/post/${post._id}`}>
                {post.title}
              </Link>
            </Grid>
            <Grid item xs={1}>
              {canEdit && <BlogContextMenu className="float-sm-right" post={post} value="..." onEdit={onEdit} />}
            </Grid>
          </Grid>
          <Typography variant="h6">
            <Link href={`/user/${post.owner}`}>{post.username}</Link>
            {' posted to '}
            {post.dev === 'true' ? (
              <Link href="/dev/blog/0">Developer Blog</Link>
            ) : (
              <Link href={`/cube/${post.cube}`}>{post.cubename}</Link>
            )}
            {' - '}
            <TimeAgo date={post.date} />
          </Typography>
        </Box>
        <Markdown markdown={post.markdown} limited />
        <Suspense>
          <CommentsSection parentType="blog" parent={post._id} collapse={false} />
        </Suspense>
      </Stack>
    </Paper>
  );
};
BlogPost.propTypes = {
  post: BlogPostPropType.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BlogPost;
