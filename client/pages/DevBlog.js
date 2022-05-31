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
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { lazy, useContext } from 'react';
import { Card, CardBody, FormGroup, Input, Label } from 'reactstrap';

import Paginate from '@cubeartisan/client/components/containers/Paginate.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import CSRFForm from '@cubeartisan/client/components/utils/CSRFForm.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const BlogPost = lazy(() => import('@cubeartisan/client/components/BlogPost.js'));

const DevBlog = ({ blogs, pages, activePage, loginCallback }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <div className="mt-3">
        <h3 className="centered">Developer Blog</h3>
        {user?.roles?.includes?.('Admin') && (
          <Card>
            <CardBody>
              <h5>Create New Blog Post</h5>
              <CSRFForm method="POST" action="/dev/blog">
                <FormGroup>
                  <Label>Title:</Label>
                  <Input maxLength="200" name="title" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label>HTML:</Label>
                  <Input name="html" type="textarea" />
                </FormGroup>
                <Button type="submit" color="success" variant="outline" fullWidth>
                  Submit
                </Button>
              </CSRFForm>
            </CardBody>
          </Card>
        )}
        {pages > 1 && (
          <Paginate count={parseInt(pages, 10)} active={parseInt(activePage, 10)} urlF={(i) => `/dev/blog/${i}`} />
        )}
        <Suspense>
          {blogs.length > 0 ? (
            blogs.map((post) => <BlogPost key={post._id} post={post} />)
          ) : (
            <h5>No developer blogs have been posted.</h5>
          )}
        </Suspense>
        {pages > 1 && (
          <Paginate count={parseInt(pages, 10)} active={parseInt(activePage, 10)} urlF={(i) => `/dev/blog/${i}`} />
        )}
      </div>
    </MainLayout>
  );
};

DevBlog.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  loginCallback: PropTypes.string,
};

DevBlog.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(DevBlog);
