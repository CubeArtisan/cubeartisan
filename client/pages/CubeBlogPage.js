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
import { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';

import {
  Button,
  Collapse,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap';

import BlogPost from '@cubeartisan/client/components/BlogPost.js';
import CSRFForm from '@cubeartisan/client/components/CSRFForm.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import Paginate from '@cubeartisan/client/components/Paginate.js';
import TextEntry from '@cubeartisan/client/components/TextEntry.js';
import CubeLayout from '@cubeartisan/client/layouts/CubeLayout.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import { findUserLinks } from '@cubeartisan/client/markdown/parser.js';

const EditBlogModal = ({ isOpen, toggle, markdown, setMarkdown, post }) => {
  const { cubeID } = useContext(CubeContext);
  const [mentions, setMentions] = useState('');
  const handleChangeMarkdown = useCallback((event) => setMarkdown(event.target.value), [setMarkdown]);
  const handleMentions = useCallback(() => {
    setMentions(findUserLinks(markdown).join(';'));
  }, [markdown]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} labelledBy="#blogEditTitle" size="lg">
      <CSRFForm method="POST" action={`/cube/blog/post/${cubeID}`} onSubmit={handleMentions}>
        <ModalHeader toggle={toggle} id="blogEditTitle">
          Edit Blog Post
        </ModalHeader>
        <ModalBody>
          <Label>Title:</Label>
          <Input maxLength="200" name="title" type="text" defaultValue={post ? post.title : ''} />
          <Label>Body:</Label>
          {post && <Input type="hidden" name="id" value={post._id} />}
          <TextEntry name="markdown" value={markdown} onChange={handleChangeMarkdown} maxLength={10000} />
          <Input name="mentions" type="hidden" value={mentions} />
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit">
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </CSRFForm>
    </Modal>
  );
};

EditBlogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  markdown: PropTypes.string.isRequired,
  setMarkdown: PropTypes.func.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

EditBlogModal.defaultProps = {
  post: null,
};

export const CubeBlogPage = ({ cube, pages, activePage, posts, loginCallback }) => {
  const [editPostIndex, setEditPostIndex] = useState(-1);
  const [editOpen, setEditOpen] = useState(false);
  const [editMarkdown, setEditMarkdown] = useState('');
  const toggleEdit = useCallback(() => setEditOpen((open) => !open), []);

  const handleEdit = useCallback(
    (id) => {
      const postIndex = posts.findIndex((post) => post._id === id);
      setEditPostIndex(postIndex);
      setEditOpen(true);
      if (postIndex > -1) {
        setEditMarkdown(posts[postIndex].markdown);
      }
    },
    [posts],
  );

  const handleNew = useCallback(() => handleEdit(-1), [handleEdit]);

  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cube} activeLink="blog">
        <Navbar expand light className="usercontrols mb-3">
          <Collapse navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="#" onClick={handleNew}>
                  Create new blog post
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <DynamicFlash />
        {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/cube/blog/${cube._id}/${i}`} />}
        {posts.length > 0 ? (
          posts.map((post) => <BlogPost key={post._id} post={post} onEdit={handleEdit} />)
        ) : (
          <h5>No blog posts for this cube.</h5>
        )}
        {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/cube/blog/${cube._id}/${i}`} />}
        <EditBlogModal
          isOpen={editOpen}
          toggle={toggleEdit}
          post={posts[editPostIndex]}
          markdown={editMarkdown}
          setMarkdown={setEditMarkdown}
        />
      </CubeLayout>
    </MainLayout>
  );
};

CubeBlogPage.propTypes = {
  cube: CubePropType.isRequired,
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      markdown: PropTypes.string,
    }),
  ).isRequired,
  loginCallback: PropTypes.string,
};

CubeBlogPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CubeBlogPage);
