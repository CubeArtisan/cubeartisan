// Load Environment Variables
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import Cube from '@hypercube/server/models/cube';

import('dotenv').config();

const { NODE_ENV } = process.env;

const pages = {};
if (NODE_ENV === 'production') {
  pages.CardSearchPage = import('@hypercube/client/pages/CardSearchPage').default;
  pages.CommentPage = import('@hypercube/client/pages/CommentPage').default;
  pages.CommentReportsPage = import('@hypercube/client/pages/CommentReportsPage').default;
  pages.ContactPage = import('@hypercube/client/pages/ContactPage').default;
  pages.CreatorsPage = import('@hypercube/client/pages/CreatorsPage').default;
  pages.CubeAnalysisPage = import('@hypercube/client/pages/CubeAnalysisPage').default;
  pages.CubeBlogPage = import('@hypercube/client/pages/CubeBlogPage').default;
  pages.CubeComparePage = import('@hypercube/client/pages/CubeComparePage').default;
  pages.CubeDeckbuilderPage = import('@hypercube/client/pages/CubeDeckbuilderPage').default;
  pages.CubeDeckPage = import('@hypercube/client/pages/CubeDeckPage').default;
  pages.CubeDecksPage = import('@hypercube/client/pages/CubeDecksPage').default;
  pages.CubeDraftPage = import('@hypercube/client/pages/CubeDraftPage').default;
  pages.CubeListPage = import('@hypercube/client/pages/CubeListPage').default;
  pages.CubeOverviewPage = import('@hypercube/client/pages/CubeOverviewPage').default;
  pages.CubePlaytestPage = import('@hypercube/client/pages/CubePlaytestPage').default;
  pages.CubeSamplePackPage = import('@hypercube/client/pages/CubeSamplePackPage').default;
  pages.DashboardPage = import('@hypercube/client/pages/DashboardPage').default;
  pages.DevBlog = import('@hypercube/client/pages/DevBlog').default;
  pages.DownTimePage = import('@hypercube/client/pages/DownTimePage').default;
  pages.EditArticlePage = import('@hypercube/client/pages/EditArticlePage').default;
  pages.EditPodcastPage = import('@hypercube/client/pages/EditPodcastPage').default;
  pages.EditVideoPage = import('@hypercube/client/pages/EditVideoPage').default;
  pages.ErrorPage = import('@hypercube/client/pages/ErrorPage').default;
  pages.ExplorePage = import('@hypercube/client/pages/ExplorePage').default;
  pages.FiltersPage = import('@hypercube/client/pages/FiltersPage').default;
  pages.GridDraftPage = import('@hypercube/client/pages/GridDraftPage').default;
  pages.InfoPage = import('@hypercube/client/pages/InfoPage').default;
  pages.LandingPage = import('@hypercube/client/pages/LandingPage').default;
  pages.Loading = import('@hypercube/client/pages/Loading').default;
  pages.LoginPage = import('@hypercube/client/pages/LoginPage').default;
  pages.LostPasswordPage = import('@hypercube/client/pages/LostPasswordPage').default;
  pages.MarkdownPage = import('@hypercube/client/pages/MarkdownPage').default;
  pages.NotificationsPage = import('@hypercube/client/pages/NotificationsPage').default;
  pages.PasswordResetPage = import('@hypercube/client/pages/PasswordResetPage').default;
  pages.PodcastEpisodePage = import('@hypercube/client/pages/PodcastEpisodePage').default;
  pages.PodcastPage = import('@hypercube/client/pages/PodcastPage').default;
  pages.PodcastsPage = import('@hypercube/client/pages/PodcastsPage').default;
  pages.RecentDraftsPage = import('@hypercube/client/pages/RecentDraftsPage').default;
  pages.RegisterPage = import('@hypercube/client/pages/RegisterPage').default;
  pages.ReviewArticlesPage = import('@hypercube/client/pages/ReviewArticlesPage').default;
  pages.ReviewPodcastsPage = import('@hypercube/client/pages/ReviewPodcastsPage').default;
  pages.ReviewVideosPage = import('@hypercube/client/pages/ReviewVideosPage').default;
  pages.SearchPage = import('@hypercube/client/pages/SearchPage').default;
  pages.TopCardsPage = import('@hypercube/client/pages/TopCardsPage').default;
  pages.UserAccountPage = import('@hypercube/client/pages/UserAccountPage').default;
  pages.UserBlogPage = import('@hypercube/client/pages/UserBlogPage').default;
  pages.UserCubePage = import('@hypercube/client/pages/UserCubePage').default;
  pages.UserDecksPage = import('@hypercube/client/pages/UserDecksPage').default;
  pages.UserSocialPage = import('@hypercube/client/pages/UserSocialPage').default;
  pages.VersionPage = import('@hypercube/client/pages/VersionPage').default;
  pages.VideoPage = import('@hypercube/client/pages/VideoPage').default;
  pages.VideosPage = import('@hypercube/client/pages/VideosPage').default;
  pages.AdminCommentsPage = import('@hypercube/client/pages/AdminCommentsPage').default;
  pages.AdminDashboardPage = import('@hypercube/client/pages/AdminDashboardPage').default;
  pages.ApplicationPage = import('@hypercube/client/pages/ApplicationPage').default;
  pages.ApplicationsPage = import('@hypercube/client/pages/ApplicationsPage').default;
  pages.ArticlePage = import('@hypercube/client/pages/ArticlePage').default;
  pages.ArticlesPage = import('@hypercube/client/pages/ArticlesPage').default;
  pages.BlogPostPage = import('@hypercube/client/pages/BlogPostPage').default;
  pages.BrowseContentPage = import('@hypercube/client/pages/BrowseContentPage').default;
  pages.BulkUploadPage = import('@hypercube/client/pages/BulkUploadPage').default;
  pages.CardPage = import('@hypercube/client/pages/CardPage').default;
  pages.LeaveWarningPage = import('@hypercube/client/pages/LeaveWarningPage').default;
  pages.BrowsePackagesPage = import('@hypercube/client/pages/BrowsePackagesPage').default;
  pages.PackagePage = import('@hypercube/client/pages/PackagePage').default;
}

const getPage = (page) => pages[page] || pages.Loading;

const getCubes = (req, callback) => {
  if (!req.user) {
    callback([]);
  } else {
    Cube.find({ owner: req.user._id }, '_id name')
      .sort({ date_updated: -1 })
      .lean()
      .exec((err, docs) => {
        if (err) {
          callback([]);
        } else {
          callback(docs);
        }
      });
  }
};

const render = (req, res, page, reactProps = {}, options = {}) => {
  getCubes(req, (cubes) => {
    reactProps.user = req.user
      ? {
          id: req.user._id,
          notifications: req.user.notifications,
          username: req.user.username,
          email: req.user.email,
          about: req.user.about,
          image: req.user.image,
          image_name: req.user.image_name,
          artist: req.user.artist,
          roles: req.user.roles,
          theme: req.user.theme,
          hide_featured: req.user.hide_featured,
          cubes,
        }
      : null;

    reactProps.loginCallback = req.baseUrl + req.path;
    reactProps.nitroPayEnabled = process.env.NITROPAY_ENABLED === 'true';
    reactProps.siteCustomizations = {
      discordUrl: process.env.DISCORD_URL,
      siteName: process.env.SITE_NAME,
      siteRoot: process.env.SITE_ROOT,
      sourceRepo: process.env.SOURCE_REPO,
      supportEmail: process.env.SUPPORT_EMAIL,
    };

    if (!options.metadata) {
      options.metadata = [];
    }
    if (!options.metadata.some((data) => data.property === 'og:image')) {
      options.metadata.push({
        property: 'og:image',
        content: '/content/sticker.png',
      });
    }

    res.render('main', {
      reactHTML:
        NODE_ENV === 'production'
          ? ReactDOMServer.renderToString(React.createElement(getPage(page), reactProps))
          : null,
      reactProps: serialize(reactProps),
      page,
      metadata: options.metadata,
      title: options.title ? `${options.title} - ${process.env.SITE_NAME}` : process.env.SITE_NAME,
      colors: req.user && req.user.theme ? `/css/${req.user.theme}.css` : '/css/default.css',
    });
  });
};

export default render;
