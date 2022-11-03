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
import { lazy } from 'react';
import { Card, CardHeader } from 'reactstrap';

import Paginate from '@cubeartisan/client/components/containers/Paginate.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import CommentPropType from '@cubeartisan/client/proptypes/CommentPropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const Comment = lazy(() => import('@cubeartisan/client/components/Comment.js'));

const PAGE_SIZE = 24;

export const AdminCommentsPage = ({ loginCallback, comments, count, page }) => (
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
      <Suspense>
        {comments.map((comment) => (
          <Comment comment={comment} index={0} noReplies editComment={() => {}} />
        ))}
      </Suspense>
    </Card>
  </MainLayout>
);

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
