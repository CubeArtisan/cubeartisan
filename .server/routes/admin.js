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
// Load Environment Variables
import express from 'express';
import mailer from 'nodemailer';
import path from 'path';
import Email from 'email-templates';
import { findUserLinks } from '@cubeartisan/markdown';
import { ensureRole, csrfProtection, handleRouteError } from '@cubeartisan/server/routes/middleware.js';
import User from '@cubeartisan/server/models/user.js';
import Report from '@cubeartisan/server/models/report.js';
import Application from '@cubeartisan/server/models/application.js';
import Comment from '@cubeartisan/server/models/comment.js';
import Article from '@cubeartisan/server/models/article.js';
import Video from '@cubeartisan/server/models/video.js';
import Podcast from '@cubeartisan/server/models/podcast.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import { addMultipleNotifications, addNotification } from '@cubeartisan/server/serverjs/util.js';
import { fileURLToPath } from 'url';

const ensureAdmin = ensureRole('Admin');
// eslint-disable-next-line no-underscore-dangle,prettier/prettier
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const router = express.Router();

router.use(csrfProtection);

router.get('/dashboard', ensureAdmin, async (req, res) => {
  try {
    const commentReportCount = await Report.countDocuments();
    const applicationCount = await Application.countDocuments();
    const articlesInReview = await Article.countDocuments({ status: 'inReview' });
    const videosInReview = await Video.countDocuments({ status: 'inReview' });
    const podcastsInReview = await Podcast.countDocuments({ status: 'inReview' });

    return await render(req, res, 'AdminDashboardPage', {
      commentReportCount,
      applicationCount,
      articlesInReview,
      videosInReview,
      podcastsInReview,
    });
  } catch (err) {
    return handleRouteError(req, res, err, `/404`);
  }
});

const PAGE_SIZE = 24;

router.get('/comments', async (_req, res) => res.redirect('/admin/comments/0'));

router.get('/comments/:page', ensureAdmin, async (req, res) => {
  try {
    const count = await Comment.countDocuments();
    const comments = await Comment.find()
      .sort({ timePosted: -1 })
      .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();

    return await render(req, res, 'AdminCommentsPage', { comments, count, page: Math.max(req.params.page, 0) });
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
});

router.get('/reviewarticles', async (_req, res) => {
  res.redirect('/admin/reviewarticles/0');
});

router.get('/reviewvideos', async (_req, res) => {
  res.redirect('/admin/reviewvideos/0');
});

router.get('/reviewpodcasts', async (_req, res) => {
  res.redirect('/admin/reviewpodcasts/0');
});

router.get('/reviewarticles/:page', ensureAdmin, async (req, res) => {
  try {
    const count = await Article.countDocuments({ status: 'inReview' });
    const articles = await Article.find({ status: 'inReview' })
      .sort({ date: -1 })
      .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();

    return await render(req, res, 'ReviewArticlesPage', { articles, count, page: Math.max(req.params.page, 0) });
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
});

router.get('/reviewvideos/:page', ensureAdmin, async (req, res) => {
  try {
    const count = await Video.countDocuments({ status: 'inReview' });
    const videos = await Video.find({ status: 'inReview' })
      .sort({ date: -1 })
      .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();

    return await render(req, res, 'ReviewVideosPage', { videos, count, page: Math.max(req.params.page, 0) });
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
});

router.get('/reviewpodcasts/:page', ensureAdmin, async (req, res) => {
  try {
    const count = await Podcast.countDocuments({ status: 'inReview' });
    const podcasts = await Podcast.find({ status: 'inReview' })
      .sort({ date: -1 })
      .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();

    return await render(req, res, 'ReviewPodcastsPage', { podcasts, count, page: Math.max(req.params.page, 0) });
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
});

router.get('/commentreports', async (_req, res) => res.redirect('/admin/commentreports/0'));

router.get('/commentreports/:page', ensureAdmin, async (req, res) => {
  try {
    const count = await Report.countDocuments();
    const reports = await Report.find()
      .sort({ timePosted: -1 })
      .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();

    return await render(req, res, 'CommentReportsPage', { reports, count, page: Math.max(req.params.page, 0) });
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
});

router.get('/applications', async (_req, res) => res.redirect('/admin/applications/0'));

router.get('/applications/:page', ensureAdmin, async (req, res) => {
  try {
    const count = await Application.countDocuments();
    const applications = await Application.find()
      .sort({ timePosted: -1 })
      .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();

    return await render(req, res, 'ApplicationsPage', { applications, count, page: Math.max(req.params.page, 0) });
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
});

router.get('/publisharticle/:id', ensureAdmin, async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article.status !== 'inReview') {
    req.flash('danger', `Article not in review`);
    return res.redirect('/admin/reviewarticles/0');
  }

  article.status = 'published';
  article.date = new Date();

  const owner = await User.findById(article.owner);

  await article.save();

  if (owner) {
    await addNotification(
      owner,
      req.user,
      `/article/${article._id}`,
      `${req.user.username} has approved and published your article: ${article.title}`,
    );

    const mentions = findUserLinks(article.body).map((x) => x.toLowerCase());
    if (mentions.length) {
      const query = User.find({ username_lower: mentions });
      await addMultipleNotifications(
        query,
        owner,
        `/article/${article._id}`,
        `${owner.username} mentioned you in their article`,
      );
    }
  }

  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: owner.email,
      subject: 'Your article has been published',
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  email.send({
    template: 'content_publish',
    locals: { title: article.title, url: `${process.env.SITE_ROOT}/content/article/${article._id}`, type: 'article' },
  });

  req.flash('success', `Article published: ${article.title}`);

  return res.redirect('/admin/reviewarticles/0');
});

router.get('/publishvideo/:id', ensureAdmin, async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video.status !== 'inReview') {
    req.flash('danger', `Video not in review`);
    return res.redirect('/admin/reviewvideos/0');
  }

  video.status = 'published';
  video.date = new Date();

  const owner = await User.findById(video.owner);

  await video.save();

  if (owner) {
    await addNotification(
      owner,
      req.user,
      `/video/${video._id}`,
      `${req.user.username} has approved and published your video: ${video.title}`,
    );

    const mentions = findUserLinks(video.body).map((x) => x.toLowerCase());
    if (mentions.length) {
      const query = User.find({ username_lower: mentions });
      await addMultipleNotifications(
        query,
        owner,
        `/video/${video._id}`,
        `${owner.username} mentioned you in their video`,
      );
    }
  }

  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: owner.email,
      subject: 'Your video has been published',
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  email.send({
    template: 'content_publish',
    locals: { title: video.title, url: `${process.env.SITE_ROOT}/content/video/${video._id}`, type: 'video' },
  });

  req.flash('success', `Video published: ${video.title}`);

  return res.redirect('/admin/reviewvideos/0');
});

router.get('/publishpodcast/:id', ensureAdmin, async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);

  if (podcast.status !== 'inReview') {
    req.flash('danger', `Podcast not in review`);
    return res.redirect('/admin/reviewpodcasts/0');
  }

  podcast.status = 'published';
  podcast.date = new Date();

  const owner = await User.findById(podcast.owner);

  await podcast.save();

  if (owner) {
    await addNotification(
      owner,
      req.user,
      `/podcast/${podcast._id}`,
      `${req.user.username} has approved your podcast: ${podcast.title}`,
    );
  }

  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: owner.email,
      subject: 'Your podcast has been approved',
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  await email.send({
    template: 'content_publish',
    locals: { title: podcast.title, url: `${process.env.SITE_ROOT}/content/podcast/${podcast._id}`, type: 'podcast' },
  });

  req.flash('success', `Podcast published: ${podcast.title}`);

  return res.redirect('/admin/reviewpodcasts/0');
});

router.get('/removearticlereview/:id', ensureAdmin, async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article.status !== 'inReview') {
    req.flash('danger', `Article not in review`);
    return res.redirect('/admin/reviewarticles/0');
  }

  article.status = 'draft';
  article.date = new Date();

  const owner = await User.findById(article.owner);

  await article.save();

  if (owner) {
    await addNotification(
      owner,
      req.user,
      `/article/${article._id}`,
      `${req.user.username} has declined to publish your article: ${article.title}`,
    );
  }

  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: owner.email,
      subject: 'Your article was not published',
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  await email.send({
    template: 'content_decline',
    locals: { title: article.title, url: `${process.env.SITE_ROOT}/content/article/${article._id}`, type: 'article' },
  });

  req.flash('success', `Article declined: ${article.title}`);

  return res.redirect('/admin/reviewarticles/0');
});

router.get('/removevideoreview/:id', ensureAdmin, async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video.status !== 'inReview') {
    req.flash('danger', `Video not in review`);
    return res.redirect('/admin/reviewvideos/0');
  }

  video.status = 'draft';
  video.date = new Date();

  const owner = await User.findById(video.owner);

  await video.save();

  if (owner) {
    await addNotification(
      owner,
      req.user,
      `/video/${video._id}`,
      `${req.user.username} has declined to publish your video: ${video.title}`,
    );
  }

  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: owner.email,
      subject: 'Your video was not published',
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  await email.send({
    template: 'content_decline',
    locals: { title: video.title, url: `${process.env.SITE_ROOT}/content/video/${video._id}`, type: 'video' },
  });

  req.flash('success', `Video declined: ${video.title}`);

  return res.redirect('/admin/reviewvideos/0');
});

router.get('/removepodcastreview/:id', ensureAdmin, async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);

  if (podcast.status !== 'inReview') {
    req.flash('danger', `podcast not in review`);
    return res.redirect('/admin/reviewpodcasts/0');
  }

  podcast.status = 'draft';
  podcast.date = new Date();

  const owner = await User.findById(podcast.owner);

  await podcast.save();

  if (owner) {
    await addNotification(
      owner,
      req.user,
      `/podcast/${podcast._id}`,
      `${req.user.username} has declined your podcast: ${podcast.title}`,
    );
  }

  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: owner.email,
      subject: 'Your podcast was not approved',
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  await email.send({
    template: 'content_decline',
    locals: { title: podcast.title, url: `${process.env.SITE_ROOT}/content/podcast/${podcast._id}`, type: 'podcast' },
  });

  req.flash('success', `Podcast declined: ${podcast.title}`);

  return res.redirect('/admin/reviewpodcasts/0');
});

router.get('/ignorereport/:id', ensureAdmin, async (req, res) => {
  const report = await Report.findById(req.params.id);

  await Report.deleteMany({ commentid: report.commentid });

  req.flash('success', 'All reports for this comment have been deleted.');
  return res.redirect('/admin/commentreports/0');
});

router.get('/removecomment/:id', ensureAdmin, async (req, res) => {
  const report = await Report.findById(req.params.id);
  const comment = await Comment.findById(report.commentid);

  comment.owner = null;
  comment.ownerName = null;
  comment.image =
    'https://img.scryfall.com/cards/art_crop/front/0/c/0c082aa8-bf7f-47f2-baf8-43ad253fd7d7.jpg?1562826021';
  comment.artist = 'Allan Pollack';
  comment.updated = true;
  comment.content = '[removed by moderator]';
  // the -1000 is to prevent weird time display error
  comment.timePosted = Date.now() - 1000;

  await comment.save();

  req.flash('success', 'This comment has been deleted.');
  return res.redirect(`/admin/ignorereport/${report._id}`);
});

router.get('/application/approve/:id', ensureAdmin, async (req, res) => {
  const application = await Application.findById(req.params.id);

  const user = await User.findById(application.userid);
  if (!user.roles) {
    user.roles = [];
  }
  if (!user.roles.includes('ContentCreator')) {
    user.roles.push('ContentCreator');
  }
  await user.save();

  await Application.deleteOne({ _id: application._id });

  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: user.email,
      subject: `${process.env.SITE_NAME} Content Creator`,
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  await email.send({
    template: 'application_approve',
    locals: {},
  });

  req.flash('success', `Application for ${user.username} approved.`);
  return res.redirect(`/admin/applications/0`);
});

router.get('/application/decline/:id', ensureAdmin, async (req, res) => {
  const application = await Application.findById(req.params.id);

  await Application.deleteOne({ _id: application._id });

  const user = await User.findById(application.userid);

  const smtpTransport = mailer.createTransport({
    name: process.env.SITE_HOSTNAME,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_CONFIG_USERNAME,
      pass: process.env.EMAIL_CONFIG_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: process.env.SUPPORT_EMAIL_FROM,
      to: user.email,
      subject: `${process.env.SITE_NAME} Content Creator`,
    },
    send: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(__dirname, '..', 'public'),
        images: true,
      },
    },
    transport: smtpTransport,
  });

  await email.send({
    template: 'application_decline',
    locals: {},
  });

  req.flash('danger', `Application declined.`);
  return res.redirect(`/admin/applications/0`);
});

export default router;
