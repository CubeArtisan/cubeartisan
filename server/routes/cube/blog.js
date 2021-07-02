import express from 'express';

import { ensureAuth } from '@hypercube/server/routes/middleware';
import carddb from '@hypercube/server/serverjs/cards';
import { addMultipleNotifications, handleRouteError } from '@hypercube/server/serverjs/util';
import { render } from '@hypercube/server/serverjs/render';
import generateMeta from '@hypercube/server/serverjs/meta';
import miscutil from '@hypercube/client/utils/Util';
import { setCubeType, buildIdQuery, abbreviate } from '@hypercube/server/serverjs/cubefn';
import Cube from '@hypercube/server/models/cube';
import Blog from '@hypercube/server/models/blog';
import User from '@hypercube/server/models/user';

const router = express.Router();

const updateBlogPost = async (req, res) => {
  // update an existing blog post
  const blog = await Blog.findById(req.parms.postid);
  const { user } = req;

  if (req.body.title.length < 5 || req.body.title.length > 100) {
    req.flash('danger', 'Blog title length must be between 5 and 100 characters.');
    return res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}/blog`);
  }
  if (!user._id.equals(blog.owner)) {
    req.flash('danger', 'Unable to update this blog post: Unauthorized.');
    return res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}/blog`);
  }

  blog.markdown = req.body.markdown.substring(0, 10000);
  blog.title = req.body.title;

  await blog.save();

  req.flash('success', 'Blog update successful');
  return res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}/blog`);
};

const postToBlog = async (req, res) => {
  try {
    if (req.body.title.length < 5 || req.body.title.length > 100) {
      req.flash('danger', 'Blog title length must be between 5 and 100 characters.');
      return res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}/blog`);
    }

    const { user } = req;

    let cube = await Cube.findOne(buildIdQuery(req.params.id));

    // post new blog
    if (!user._id.equals(cube.owner)) {
      req.flash('danger', 'Unable to post this blog post: Unauthorized.');
      return res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}/blog`);
    }

    cube.date_updated = Date.now();
    cube.updated_string = cube.date_updated.toLocaleString('en-US');
    cube = setCubeType(cube, carddb);

    await cube.save();

    const blogpost = new Blog();
    blogpost.markdown = req.body.markdown.substring(0, 10000);
    blogpost.title = req.body.title;
    blogpost.owner = user._id;
    blogpost.date = Date.now();
    blogpost.cube = cube._id;
    blogpost.dev = 'false';
    blogpost.date_formatted = blogpost.date.toLocaleString('en-US');
    blogpost.username = user.username;
    blogpost.cubename = cube.name;

    await blogpost.save();

    // mentions are only added for new posts and ignored on edits
    if (req.body.mentions) {
      const owner = await User.findById(user._id);
      const mentions = req.body.mentions.split(';');
      // mentions is either a string (if just one is found) or an array (if multiple are found)
      const query = User.find({ username_lower: mentions });
      await addMultipleNotifications(
        query,
        owner,
        `/cube/blog/blogpost/${blogpost._id}`,
        `${user.username} mentioned you in their blog post`,
      );
    }

    req.flash('success', 'Blog post successful');
    return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/blog`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/blog`);
  }
};

const getBlogPost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.postid);

    return render(req, res, 'BlogPostPage', {
      post,
    });
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.postid);

    if (!req.user._id.equals(blog.owner)) {
      req.flash('danger', 'Unauthorized');
      return res.redirect('/404');
    }
    await Blog.deleteOne({ _id: req.params.postid });

    req.flash('success', 'Post Removed');
    return res.send('Success');
  } catch (err) {
    return res.status(500).send({
      success: 'false',
      message: 'Error deleting post.',
    });
  }
};

const getBlogPage = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id), Cube.LAYOUT_FIELDS).lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }

    const countQ = Blog.countDocuments({
      cube: cube._id,
    });
    const blogsQ = Blog.find({
      cube: cube._id,
    })
      .sort({
        date: -1,
      })
      .skip(Math.max(req.params.page, 0) * 10)
      .limit(10)
      .lean();
    const [blogs, count] = await Promise.all([blogsQ, countQ]);

    return render(
      req,
      res,
      'CubeBlogPage',
      {
        cube,
        posts: blogs,
        pages: Math.ceil(count / 10),
        activePage: Math.max(req.params.page, 0),
      },
      {
        title: `${abbreviate(cube.name)} - Blog`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Blog: ${cube.name}`,
          miscutil.getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}cube/blog/${encodeURIComponent(req.params.id)}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/overview/${encodeURIComponent(req.params.id)}`);
  }
};

const redirectToFirstPage = (req, res) => res.redirect(`/cube/${encodeURIComponent(req.params.id)}/blog/page/0`);

router.get('/', redirectToFirstPage);
router.get('/page/:page', getBlogPage);
router.post('/post', ensureAuth, postToBlog);
router.get('/post/:postid', getBlogPost);
router.put('/post/:postid', updateBlogPost);
router.delete('/post/:postid', ensureAuth, deleteBlogPost);

export default router;
