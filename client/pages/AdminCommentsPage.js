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
import CommentPropType from '@hypercube/client/proptypes/CommentPropType';

import { Card, CardHeader } from 'reactstrap';

import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import Paginate from '@hypercube/client/components/Paginate';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';
import Comment from '@hypercube/client/components/Comment';

const PAGE_SIZE = 24;

const AdminCommentsPage = ({ loginCallback, comments, count, page }) => {
  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="my-3">
        <CardHeader>
          <h5>Comment Reports</h5>
          {count > PAGE_SIZE ? (
            <>
              <h6>
                {`Displaying ${PAGE_SIZE * page + 1}-${Math.min(count, PAGE_SIZE * (page + 1))} of ${count} Comments`}
              </h6>
              <Paginate
                count={Math.ceil(count / PAGE_SIZE)}
                active={parseInt(page, 10)}
                urlF={(i) => `/admin/comments/${i}`}
              />
            </>
          ) : (
            <h6>{`Displaying all ${count} Comments`}</h6>
          )}
        </CardHeader>
        {comments.map((comment) => (
          <Comment comment={comment} index={0} noReplies editComment={() => {}} />
        ))}
      </Card>
    </MainLayout>
  );
};

AdminCommentsPage.propTypes = {
  loginCallback: PropTypes.string,
  comments: PropTypes.arrayOf(CommentPropType).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

AdminCommentsPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(AdminCommentsPage);
