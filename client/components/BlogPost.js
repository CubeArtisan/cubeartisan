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
import { Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { lazy, useContext } from 'react';

import BlogContextMenu from '@cubeartisan/client/components/BlogContextMenu.js';
import CardHeader from '@cubeartisan/client/components/CardHeader.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';
import TimeAgo from '@cubeartisan/client/components/utils/TimeAgo.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import BlogPostPropType from '@cubeartisan/client/proptypes/BlogPostPropType.js';

const CommentsSection = lazy(() => import('@cubeartisan/client/components/CommentsSection.js'));

const BlogPost = ({ post, onEdit }) => {
  const user = useContext(UserContext);
  const canEdit = user && user._id === post.owner;

  return (
    <Paper elevation={3} sx={{ borderRadius: '2em', marginY: 2 }}>
      <CardHeader>
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <Link variant="h4" underline="hover" color="inherit" href={`/cube/${post.cube}/blog/post/${post._id}`}>
              {post.title}
            </Link>
          </Grid>
          <Grid item xs={1}>
            {canEdit && <BlogContextMenu post={post} value="..." onEdit={onEdit} />}
          </Grid>
        </Grid>
        <Typography variant="subtitle1">
          <Link href={`/user/${post.owner}`}>{post.username}</Link>
          {' posted to '}
          {post.dev === 'true' ? (
            <Link href="/dev/blog/0">Developer Blog</Link>
          ) : (
            <Link href={`/cube/${post.cube}`}>{post.cubename}</Link>
          )}
          {' — '}
          <TimeAgo date={post.date} />
        </Typography>
      </CardHeader>
      <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={1} sx={{ marginY: 1, marginX: 2 }}>
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
