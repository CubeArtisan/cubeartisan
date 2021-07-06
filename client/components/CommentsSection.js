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
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { Collapse, Spinner } from 'reactstrap';

import UserContext from '@cubeartisan/client/components/contexts/UserContext';
import CommentList from '@cubeartisan/client/components/PagedCommentList';
import LinkButton from '@cubeartisan/client/components/LinkButton';
import CommentEntry from '@cubeartisan/client/components/CommentEntry';
import useToggle from '@cubeartisan/client/hooks/UseToggle';
import useComments from '@cubeartisan/client/hooks/UseComments';

const CommentsSection = ({ parent, parentType, collapse }) => {
  const user = useContext(UserContext);
  const userid = user && user.id;

  const [expanded, toggle] = useToggle(!collapse);
  const [replyExpanded, toggleReply] = useToggle(false);
  const [comments, addComment, loading, editComment] = useComments(parentType, parent);

  if (loading) {
    return (
      <div className="centered py-3">
        <Spinner className="position-absolute" />
      </div>
    );
  }

  return (
    <>
      {userid && (
        <div className="p-2 border-bottom">
          <Collapse isOpen={!replyExpanded}>
            <h6>
              <LinkButton className="ml-1" onClick={toggleReply}>
                Add a Comment
              </LinkButton>
            </h6>
          </Collapse>
          <CommentEntry submit={addComment} expanded={replyExpanded} toggle={toggleReply} />
        </div>
      )}
      {comments.length > 0 && (
        <>
          {collapse && (
            <div className="p-2 border-bottom">
              <h6>
                <LinkButton className="ml-1" onClick={toggle}>
                  {`${expanded ? 'Hide' : 'View'} Comments (${comments.length})`}
                </LinkButton>
              </h6>
            </div>
          )}
          <Collapse isOpen={expanded}>
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
