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
import { Button, CircularProgress, Collapse } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';

import CommentEntry from '@cubeartisan/client/components/CommentEntry.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import CommentList from '@cubeartisan/client/components/PagedCommentList.js';
import useComments from '@cubeartisan/client/hooks/UseComments.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';

/**
 * @typedef CommentSectionProps
 * @property {string} parent
 * @property {string} parentType
 * @property {boolean} [collapse]
 */

/** @type {React.FC<CommentSectionProps>} */
const CommentsSection = ({ parent, parentType, collapse }) => {
  const user = useContext(UserContext);
  const userid = user && user._id;

  const [expanded, toggle] = useToggle(!collapse);
  const [replyExpanded, toggleReply] = useToggle(false);
  const [comments, addComment, loading, editComment] = useComments(parentType, parent);

  if (loading) {
    return (
      <div className="centered py-3">
        <CircularProgress sx={{ position: 'absolute' }} />
      </div>
    );
  }
  return (
    <>
      {userid && (
        <div className="p-2 border-bottom">
          <Collapse in={!replyExpanded}>
            <Button color="primary" sx={{ marginLeft: 1 }} onClick={toggleReply}>
              Add a Comment
            </Button>
          </Collapse>
          <CommentEntry submit={addComment} expanded={replyExpanded} toggle={toggleReply} />
        </div>
      )}
      {comments.length > 0 && (
        <>
          {collapse && (
            <div className="p-2 border-bottom">
              <Button color="secondary" sx={{ marginLeft: 1 }} onClick={toggle}>
                {`${expanded ? 'Hide' : 'View'} Comments (${comments.length})`}
              </Button>
            </div>
          )}
          <Collapse in={expanded}>
            <CommentList comments={comments} editComment={editComment} />
          </Collapse>
        </>
      )}
    </>
  );
};
CommentsSection.propTypes = {
  parent: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  collapse: PropTypes.bool,
};
CommentsSection.defaultProps = {
  collapse: true,
};
export default CommentsSection;
