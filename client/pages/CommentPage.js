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
import { useState } from 'react';
import PropTypes from 'prop-types';
import CommentPropType from '@cubeartisan/client/proptypes/CommentPropType.js';

import { Card, CardHeader } from 'reactstrap';

import Comment from '@cubeartisan/client/components/Comment.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import CommentsSection from '@cubeartisan/client/components/CommentsSection.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const translateType = {
  comment: 'Comment',
  blog: 'Blog Post',
  deck: 'Drafted Deck',
  card: 'Card Page',
  article: 'Article',
  podcast: 'Podcast',
  video: 'Video',
  episode: 'Podcast Epsiode',
  package: 'Card Package',
};

const translateLink = {
  comment: (id) => `/comment/${id}`,
  blog: (id) => `/cube/blog/blogpost/${id}`,
  deck: (id) => `/cube/deck/${id}`,
  card: (id) => `/tool/card/${id}`,
  article: (id) => `/content/article/${id}`,
  video: (id) => `/content/video/${id}`,
  podcast: (id) => `/content/podcast/${id}`,
  episode: (id) => `/content/episode/${id}`,
  package: (id) => `/packages/${id}`,
};

export const CommentPage = ({ comment, loginCallback }) => {
  const [content, setContent] = useState(comment);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="my-3">
        <CardHeader>
          <a href={translateLink[content.parentType](content.parent)}>
            {`Responding to this ${translateType[content.parentType]}`}
          </a>
        </CardHeader>
        <Comment comment={content} index={0} noReplies editComment={setContent} />
        <div className="border-top">
          <CommentsSection parentType="comment" parent={content._id} />
        </div>
      </Card>
    </MainLayout>
  );
};

CommentPage.propTypes = {
  comment: CommentPropType.isRequired,
  loginCallback: PropTypes.string,
};

CommentPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CommentPage);
