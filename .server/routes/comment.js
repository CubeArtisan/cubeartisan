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
import { addMultipleNotifications, addNotification } from '@cubeartisan/server/serverjs/util.js';
import Comment from '@cubeartisan/server/models/comment.js';
import User from '@cubeartisan/server/models/user.js';
import Report from '@cubeartisan/server/models/report.js';
import Deck from '@cubeartisan/server/models/deck.js';
import Article from '@cubeartisan/server/models/article.js';
import Video from '@cubeartisan/server/models/video.js';
import Podcast from '@cubeartisan/server/models/podcast.js';
import PodcastEpisode from '@cubeartisan/server/models/podcastEpisode.js';
import Blog from '@cubeartisan/server/models/blog.js';
import Package from '@cubeartisan/server/models/package.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import { ensureAuth, wrapAsyncApi, wrapAsyncPage } from '@cubeartisan/server/routes/middleware.js';

const getReplyContext = {
  comment: async (id) => {
    const comment = await Comment.findById(id);
    return [comment.owner, 'comment'];
  },
  blog: async (id) => {
    const blog = await Blog.findById(id);
    return [blog.owner, 'blogpost'];
  },
  deck: async (id) => {
    const deck = await Deck.findById(id);
    return [deck.owner, 'deck'];
  },
  article: async (id) => {
    const article = await Article.findById(id);
    return [article.owner, 'article'];
  },
  podcast: async (id) => {
    const podcast = await Podcast.findById(id);
    return [podcast.owner, 'podcast'];
  },
  video: async (id) => {
    const video = await Video.findById(id);
    return [video.owner, 'video'];
  },
  episode: async (id) => {
    const episode = await PodcastEpisode.findById(id);
    return [episode.owner, 'podcast episode'];
  },
  package: async (id) => {
    const pack = await Package.findById(id);
    return [pack.userid, 'card package'];
  },
  default: async () => null, // nobody gets a notification for this
};

const postCommentHandler = async (req, res) => {
  const poster = await User.findById(req.user._id);

  if (
    !['comment', 'blog', 'deck', 'card', 'article', 'podcast', 'video', 'episode', 'package'].includes(req.params.type)
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'Invalid comment parent type.',
    });
  }

  const comment = new Comment();

  comment.parent = req.params.parent.substring(0, 500);
  comment.parentType = req.params.type;
  comment.owner = poster._id;
  comment.ownerName = poster.username;
  comment.image = poster.image;
  comment.artist = poster.artist;
  comment.updated = false;
  comment.content = req.body.comment.substring(0, 5000);
  // the -1000 is to prevent weird time display error
  comment.timePosted = Date.now() - 1000;
  comment.date = Date.now() - 1000;

  await comment.save();

  const [ownerid, type] = await getReplyContext[req.params.type](req.params.parent);

  const owner = await User.findById(ownerid);

  if (owner) {
    await addNotification(
      owner,
      poster,
      `/comment/${comment._id}`,
      `${poster.username} left a comment in response to your ${type}.`,
    );
  }

  if (req.body.mentions) {
    const mentions = req.body.mentions.split(';');
    const users = User.find({ username_lower: mentions });
    await addMultipleNotifications(
      users,
      poster,
      `/comment/${comment._id}`,
      `${poster.username} mentioned you in their comment`,
    );
  }

  return res.status(200).send({
    success: 'true',
    comment,
  });
};
export const postComment = [ensureAuth, wrapAsyncApi(postCommentHandler)];

const editCommentHandler = async (req, res) => {
  const newComment = req.body.comment;

  const comment = await Comment.findById(newComment._id);

  if (!comment.owner.equals(req.user._id)) {
    return res.status(400).send({
      success: 'false',
      message: 'Comments can only be edited by their owner.',
    });
  }

  if (![null, comment.owner].includes(newComment.owner) || ![null, comment.ownerName].includes(newComment.ownerName)) {
    return res.status(400).send({
      success: 'false',
      message: 'Invalid comment update.',
    });
  }

  comment.owner = newComment.owner;
  comment.ownerName = newComment.ownerName;
  comment.image = newComment.owner
    ? req.user.image
    : 'https://img.scryfall.com/cards/art_crop/front/0/c/0c082aa8-bf7f-47f2-baf8-43ad253fd7d7.jpg?1562826021';
  comment.artist = newComment.owner ? 'Allan Pollack' : req.user.artist;
  comment.updated = true;
  comment.content = newComment.content.substring(0, 5000);
  // the -1000 is to prevent weird time display error
  comment.timePosted = Date.now() - 1000;

  await comment.save();

  return res.status(200).send({
    success: 'true',
  });
};
export const editComment = [ensureAuth, wrapAsyncApi(editCommentHandler)];

export const reportComment = async (req, res) => {
  const { info, reason } = req.body;

  const report = new Report();
  report.commentid = req.params.id;
  report.info = info;
  report.reason = reason;
  report.reportee = req.user ? req.user._id : null;
  report.timePosted = Date.now() - 1000;
  await report.save();

  req.flash(
    'success',
    'Thank you for the report! Our moderators will review the report can decide whether to take action.',
  );

  return res.redirect(`/comment/${req.params.id}`);
};

const viewCommentHandler = async (req, res) => {
  const comment = await Comment.findById(req.params.id).lean();

  return render(
    req,
    res,
    'CommentPage',
    {
      comment,
    },
    {
      title: 'Comment',
    },
  );
};
export const viewComment = wrapAsyncPage(viewCommentHandler);
