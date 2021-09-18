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
import { ensureAuth, handleRouteError, wrapAsyncApi, wrapAsyncPage } from '@cubeartisan/server/routes/middleware.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import { getFeedData } from '@cubeartisan/server/serverjs/rss.js';
import { updatePodcast } from '@cubeartisan/server/serverjs/podcast.js';
import generateMeta from '@cubeartisan/server/serverjs/meta.js';
import Article from '@cubeartisan/server/models/article.js';
import Podcast from '@cubeartisan/server/models/podcast.js';
import PodcastEpisode from '@cubeartisan/server/models/podcastEpisode.js';
import Video from '@cubeartisan/server/models/video.js';

const PAGE_SIZE = 24;

export const viewCreatorDashboard = async (req, res) => {
  try {
    return await render(req, res, 'CreatorsPage');
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const browseContentHandler = async (req, res) => {
  const results = 36;

  const articlesq = Article.find({ status: 'published' }).sort({ date: -1 }).limit(results);
  const episodesq = PodcastEpisode.find().sort({ date: -1 }).limit(results);
  const videosq = Video.find({ status: 'published' }).sort({ date: -1 }).limit(results);

  // We can do these queries in parallel
  const [articles, videos, episodes] = await Promise.all([articlesq, videosq, episodesq]);

  const content = [];

  for (const article of articles) {
    content.push({
      type: 'article',
      date: article.date,
      content: article,
    });
  }
  for (const video of videos) {
    content.push({
      type: 'video',
      date: video.date,
      content: video,
    });
  }
  for (const episode of episodes) {
    content.push({
      type: 'episode',
      date: episode.date,
      content: episode,
    });
  }

  content.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  content.splice(results);

  return render(req, res, 'BrowseContentPage', {
    content,
  });
};
export const browseContent = wrapAsyncPage(browseContentHandler);

const browseArticlesHandler = async (req, res) => {
  const count = await Article.countDocuments({ status: 'published' });
  const articles = await Article.find({ status: 'published' })
    .sort({ date: -1 })
    .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  return render(req, res, 'ArticlesPage', { articles, count, page: Math.max(req.params.page, 0) });
};
export const browseArticles = wrapAsyncPage(browseArticlesHandler);

const browsePodcastsHandler = async (req, res) => {
  const count = await PodcastEpisode.countDocuments({ status: 'published' });
  const episodes = await PodcastEpisode.find()
    .sort({ date: -1 })
    .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  const podcasts = await Podcast.find({ status: 'published' }).sort({ date: -1 }).lean();

  return render(req, res, 'PodcastsPage', { podcasts, count, episodes, page: Math.max(req.params.page, 0) });
};
export const browsePodcasts = wrapAsyncPage(browsePodcastsHandler);

const browseVideosHandler = async (req, res) => {
  const count = await Video.countDocuments({ status: 'published' });
  const videos = await Video.find({ status: 'published' })
    .sort({ date: -1 })
    .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  return render(req, res, 'VideosPage', { videos, count, page: Math.max(req.params.page, 0) });
};
export const browseVideos = wrapAsyncPage(browseVideosHandler);

const viewArticleHandler = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    req.flash('danger', 'Article not found');
    return res.redirect(404, '/content');
  }

  return render(
    req,
    res,
    'ArticlePage',
    { article },
    {
      title: article.title,
      metadata: generateMeta(
        article.title,
        article.short || `An article posted to ${process.env.SITE_NAME}`,
        article.image,
        `${process.env.SITE_ROOT}/article/${req.params.id}`,
      ),
    },
  );
};
export const viewArticle = wrapAsyncPage(viewArticleHandler);

const browsePodcastEpisodesHandler = async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);

  if (!podcast) {
    req.flash('danger', 'Podcast not found');
    return res.redirect(404, '/content');
  }
  const episodes = await PodcastEpisode.find({ podcast: podcast._id }).sort({ date: -1 });

  return render(
    req,
    res,
    'PodcastPage',
    { podcast, episodes },
    {
      title: podcast.title,
      metadata: generateMeta(
        podcast.title,
        `Listen to ${podcast.title} on ${process.env.SITE_NAME}!`,
        podcast.image,
        `${process.env.SITE_ROOT}/podcast/${req.params.id}`,
      ),
    },
  );
};

export const browsePodcastEpisodes = wrapAsyncPage(browsePodcastEpisodesHandler);

const viewPodcastEpisodeHandler = async (req, res) => {
  const episode = await PodcastEpisode.findById(req.params.episodeid);

  if (!episode) {
    req.flash('danger', 'Podcast episode not found');
    return res.redirect(404, `/podcast/${req.params.podcastid}`);
  }

  return render(
    req,
    res,
    'PodcastEpisodePage',
    { episode },
    {
      title: episode.title,
      metadata: generateMeta(
        episode.title,
        `Listen to ${episode.title} on ${process.env.SITE_NAME}!`,
        episode.image,
        `${process.env.SITE_ROOT}/episode/${req.params.id}`,
      ),
    },
  );
};
export const viewPodcastEpisode = wrapAsyncPage(viewPodcastEpisodeHandler);

const viewVideoHandler = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    req.flash('danger', 'Video not found');
    return res.redirect(404, '/content');
  }

  return render(
    req,
    res,
    'VideoPage',
    { video },
    {
      title: video.title,
      metadata: generateMeta(
        video.title,
        video.short || `A video posted to ${process.env.SITE_NAME}`,
        video.image,
        `${process.env.SITE_ROOT}/video/${req.params.id}`,
      ),
    },
  );
};
export const viewVideo = wrapAsyncPage(viewVideoHandler);

const viewEditArticleHandler = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    req.flash('danger', 'Article not found');
    return res.redirect(404, '/404');
  }

  if (!article.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only article owners can edit articles.');
    return res.redirect(403, `/article/${article._id}`);
  }

  if (article.status === 'published') {
    req.flash('danger', 'Unauthorized: Articles cannot be editted after being published.');
    return res.redirect(403, `/article/${article._id}`);
  }

  return render(req, res, 'EditArticlePage', { article });
};
export const viewEditArticle = wrapAsyncPage(viewEditArticleHandler);

const viewEditPodcastHandler = async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);

  if (!podcast) {
    req.flash('danger', 'Podcast not found');
    return res.redirect(404, '/404');
  }

  if (!podcast.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only podcast owners can edit podcasts.');
    return res.redirect(403, `/podcast/${podcast._id}`);
  }

  if (podcast.status === 'published') {
    req.flash('danger', 'Unauthorized: Podcasts cannot be editted after being published.');
    return res.redirect(403, `/podcast/${podcast._id}`);
  }

  return render(req, res, 'EditPodcastPage', { podcast });
};
export const viewEditPodcast = wrapAsyncPage(viewEditPodcastHandler);

const fetchPodcastHandler = async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);

  if (!podcast) {
    req.flash('danger', 'Podcast not found');
    return res.redirect(404, '/404');
  }

  if (!podcast.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only podcast owners can fetch podcast episodes.');
    return res.redirect(403, `/podcast/${podcast._id}`);
  }

  if (podcast.status !== 'published') {
    req.flash('danger', 'Unauthorized: Only podcasts that have been published can have episodes fetched.');
    return res.redirect(403, `/podcast/${podcast._id}`);
  }

  await updatePodcast(podcast);

  req.flash('success', 'Podcast has been updated with all episodes.');

  return res.redirect(303, `/podcast/${podcast._id}`);
};
export const fetchPodcast = wrapAsyncApi(fetchPodcastHandler);

const viewEditVideoHandler = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    req.flash('danger', 'Video not found');
    return res.redirect(404, '/404');
  }

  if (!video.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only video owners can edit videos.');
    return res.redirect(403, `/video/${video._id}`);
  }

  if (video.status === 'published') {
    req.flash('danger', 'Unauthorized: Videos cannot be editted after being published.');
    return res.redirect(403, `/video/${video._id}`);
  }

  return render(req, res, 'EditVideoPage', { video });
};
export const viewEditVideo = wrapAsyncApi(viewEditVideoHandler);

const editArticleHandler = async (req, res) => {
  const { articleid, title, image, imagename, artist, body, short } = req.body;

  const article = await Article.findById(articleid);

  if (!article.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only article owners can edit articles.');
    return res.redirect(403, `/article/${article._id}`);
  }

  article.title = title.substring(0, 1000);
  article.short = short.substring(0, 1000);
  article.image = image.substring(0, 1000);
  article.imagename = imagename.substring(0, 1000);
  article.artist = artist.substring(0, 1000);
  article.body = body.substring(0, 1000000);

  await article.save();

  return res.redirect(`/article/${article._id}`);
};
export const editArticle = wrapAsyncApi(editArticleHandler);

const editPodcastHandler = async (req, res) => {
  const { podcastid, rss } = req.body;

  const podcast = await Podcast.findById(podcastid);

  if (!podcast.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only podcast owners can edit podcasts.');
    return res.redirect(403, `/podcast/${podcast._id}`);
  }

  podcast.rss = rss;
  const fields = await getFeedData(rss);
  podcast.title = fields.title;
  podcast.description = fields.description;
  podcast.url = fields.url;
  podcast.image = fields.image;

  await podcast.save();

  return res.redirect(`/podcast/${podcast._id}`);
};
export const editPodcast = wrapAsyncApi(editPodcastHandler);

const editVideoHandler = async (req, res) => {
  const { videoid, title, image, imagename, artist, body, url, short } = req.body;

  const video = await Video.findById(videoid);

  if (!video.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only video owners can edit videos.');
    return res.redirect(403, `/video/${video._id}`);
  }

  video.title = title.substring(0, 1000);
  video.short = short.substring(0, 1000);
  video.image = image.substring(0, 1000);
  video.imagename = imagename.substring(0, 1000);
  video.artist = artist.substring(0, 1000);
  video.url = url.substring(0, 1000);
  video.body = body.substring(0, 1000000);

  await video.save();

  return res.redirect(`/video/${video._id}`);
};
export const editVideo = wrapAsyncApi(editVideoHandler);

const submitArticleHandler = async (req, res) => {
  const { articleid, title, image, imagename, artist, body, short } = req.body;

  const article = await Article.findById(articleid);

  if (!article.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only article owners can publish articles.');
    return res.redirect(403, `/creators/article/${article._id}`);
  }

  article.title = title.substring(0, 1000);
  article.short = short.substring(0, 1000);
  article.image = image.substring(0, 1000);
  article.imagename = imagename.substring(0, 1000);
  article.artist = artist.substring(0, 1000);
  article.body = body.substring(0, 1000000);
  article.status = 'published';

  await article.save();
  req.flash('success', 'Your article has been published.');

  return res.redirect(303, `/creators/article/${article._id}`);
};
export const submitArticle = wrapAsyncPage(submitArticleHandler);

const submitPodcastHandler = async (req, res) => {
  const { podcastid, rss } = req.body;

  const podcast = await Podcast.findById(podcastid);

  if (!podcast.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only podcast owners can publish podcasts.');
    return res.redirect(403, `/creators/podcast/${podcast._id}`);
  }

  podcast.rss = rss;
  const fields = await getFeedData(rss);
  podcast.title = fields.title;
  podcast.description = fields.description;
  podcast.url = fields.url;
  podcast.image = fields.image;
  podcast.status = 'inReview';

  await podcast.save();
  req.flash('success', 'Your podcast has been published.');

  return res.redirect(303, `/creators/podcast/${podcast._id}`);
};
export const submitPodcast = wrapAsyncPage(submitPodcastHandler);

const submitVideoHandler = async (req, res) => {
  const { videoid, title, image, imagename, artist, body, url, short } = req.body;

  const video = await Video.findById(videoid);

  if (!video.owner.equals(req.user._id)) {
    req.flash('danger', 'Unauthorized: Only video owners can publish videos.');
    return res.redirect(303, `/video/${video._id}`);
  }

  video.title = title.substring(0, 1000);
  video.short = short.substring(0, 1000);
  video.image = image.substring(0, 1000);
  video.imagename = imagename.substring(0, 1000);
  video.artist = artist.substring(0, 1000);
  video.url = url.substring(0, 1000);
  video.body = body.substring(0, 1000000);
  video.status = 'inReview';

  await video.save();
  req.flash('success', 'Your video has been published.');

  return res.redirect(303, `/video/${video._id}`);
};
export const submitVideo = wrapAsyncPage(submitVideoHandler);

const createNewArticleHandler = async (req, res) => {
  const article = new Article();

  article._id = req.params.id;
  article.title = 'New Article';
  article.body = '';
  article.owner = req.user._id;
  article.date = new Date();
  article.image =
    'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/e/decb78dd-03d7-43a0-8ff5-1b97c6f515c9.jpg?1580015192';
  article.artist = 'Craig J Spearing';
  article.short = 'This is a brand new article!';
  article.imagename = 'emmessi tome [mb1-1579]';
  article.status = 'draft';
  article.username = req.user.username;

  await article.save();

  return res.redirect(303, `/creators/article/${article._id}/edit`);
};
export const createNewArticle = [ensureAuth, wrapAsyncPage(createNewArticleHandler)];

const createNewPodcastHandler = async (req, res) => {
  const podcast = new Podcast();

  podcast._id = req.params.id;
  podcast.title = 'New Podcast';
  podcast.description = '';
  podcast.url = '';
  podcast.rss = '';
  podcast.owner = req.user._id;
  podcast.image =
    'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/e/decb78dd-03d7-43a0-8ff5-1b97c6f515c9.jpg?1580015192';
  podcast.date = new Date();

  podcast.status = 'draft';
  podcast.username = req.user.username;

  await podcast.save();

  return res.redirect(303, `/creators/podcast/${podcast._id}/edit`);
};
export const createNewPodcast = wrapAsyncPage(createNewPodcastHandler);

const createNewVideoHandler = async (req, res) => {
  const video = new Video();

  video._id = req.params.id;
  video.title = 'New Video';
  video.body = '';
  video.short = 'This is a brand new video!';
  video.url = '';
  video.owner = req.user._id;
  video.date = new Date();
  video.image =
    'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/e/decb78dd-03d7-43a0-8ff5-1b97c6f515c9.jpg?1580015192';
  video.artist = 'Craig J Spearing';
  video.imagename = 'emmessi tome [mb1-1579]';
  video.status = 'draft';
  video.username = req.user.username;

  await video.save();

  return res.redirect(303, `/creators/video/${video._id}/edit`);
};
export const createNewVideo = wrapAsyncPage(createNewVideoHandler);

const getJsonUserArticlesHandler = async (req, res) => {
  const numResults = await Article.countDocuments({ owner: req.user._id });
  const articles = await Article.find({ owner: req.user._id })
    .sort({ date: -1 })
    .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  return res.status(200).send({
    success: 'true',
    numResults,
    articles,
  });
};
export const getJsonUserArticles = wrapAsyncApi(getJsonUserArticlesHandler);

const getJsonUserPodcastsHandler = async (req, res) => {
  const numResults = await Podcast.countDocuments({ owner: req.user._id });
  const podcasts = await Podcast.find({ owner: req.user._id })
    .sort({ date: -1 })
    .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  return res.status(200).send({
    success: 'true',
    numResults,
    podcasts,
  });
};
export const getJsonUserPodcasts = wrapAsyncApi(getJsonUserPodcastsHandler);

const getJsonUserVideosHandler = async (req, res) => {
  const numResults = await Video.countDocuments({ owner: req.user._id });
  const videos = await Video.find({ owner: req.user._id })
    .sort({ date: -1 })
    .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .lean();

  return res.status(200).send({
    success: 'true',
    numResults,
    videos,
  });
};
export const getJsonUserVideos = wrapAsyncApi(getJsonUserVideosHandler);
