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
import { redirect } from '@cubeartisan/server/serverjs/util.js';
import { ensureRole, handleRouteError, wrapAsyncApi } from '@cubeartisan/server/routes/middleware.js';
import { render } from '@cubeartisan/server/serverjs/render.js';

import Blog from '@cubeartisan/server/models/blog.js';

const PAGESIZE = 10;

export const browseDevBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({
      dev: 'true',
    })
      .sort({ date: -1 })
      .skip(PAGESIZE * req.params.id)
      .limit(PAGESIZE);

    const count = await Blog.countDocuments({ dev: 'true' });

    for (const item of blogs) {
      if (!item.date_formatted) {
        item.date_formatted = item.date.toLocaleString('en-US');
      }
    }

    return await render(req, res, 'DevBlog', {
      blogs,
      pages: Math.ceil(count / PAGESIZE),
      activePage: req.params.id,
    });
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const postToDevBlogHandler = async (req, res) => {
  const blogpost = new Blog();
  blogpost.title = req.body.title;
  blogpost.markdown = req.body.markdown;
  blogpost.owner = req.user._id;
  blogpost.date = Date.now();
  blogpost.dev = 'true';
  blogpost.date_formatted = blogpost.date.toLocaleString('en-US');

  await blogpost.save();

  req.flash('success', 'Blog post successful');
  res.redirect('/dev/blog');
};
export const postToDevBlog = [ensureRole('admin'), wrapAsyncApi(postToDevBlogHandler)];

export const redirectToFirstDevBlogPage = redirect('/dev/blog/0');
