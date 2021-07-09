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
import CommentPropType from '@cubeartisan/client/proptypes/CommentPropType.js';

import Comment from '@cubeartisan/client/components/Comment.js';
import PagedList from '@cubeartisan/client/components/PagedList.js';

const CommentList = ({ comments, startIndex, editComment }) => (
  <PagedList
    pageSize={10}
    rows={comments
      .slice(0)
      .reverse()
      .map((comment, index) => (
        <Comment
          key={`comment-${comment._id}`}
          comment={comment}
          index={startIndex + comments.length - index}
          editComment={editComment}
        />
      ))}
  />
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(CommentPropType).isRequired,
  startIndex: PropTypes.number,
  editComment: PropTypes.func.isRequired,
};

CommentList.defaultProps = {
  startIndex: 0,
};

export default CommentList;
