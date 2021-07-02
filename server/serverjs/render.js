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
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import Cube from '@cubeartisan/server/models/cube';

import('dotenv').config();

const { NODE_ENV } = process.env;

const pages = {};
if (NODE_ENV === 'production') {
  pages.CardSearchPage = import('@cubeartisan/client/pages/CardSearchPage').default;
  pages.CommentPage = import('@cubeartisan/client/pages/CommentPage').default;
  pages.CommentReportsPage = import('@cubeartisan/client/pages/CommentReportsPage').default;
  pages.ContactPage = import('@cubeartisan/client/pages/ContactPage').default;
  pages.CreatorsPage = import('@cubeartisan/client/pages/CreatorsPage').default;
  pages.CubeAnalysisPage = import('@cubeartisan/client/pages/CubeAnalysisPage').default;
  pages.CubeBlogPage = import('@cubeartisan/client/pages/CubeBlogPage').default;
  pages.CubeComparePage = import('@cubeartisan/client/pages/CubeComparePage').default;
  pages.CubeDeckbuilderPage = import('@cubeartisan/client/pages/CubeDeckbuilderPage').default;
  pages.CubeDeckPage = import('@cubeartisan/client/pages/CubeDeckPage').default;
  pages.CubeDecksPage = import('@cubeartisan/client/pages/CubeDecksPage').default;
  pages.CubeDraftPage = import('@cubeartisan/client/pages/CubeDraftPage').default;
  pages.CubeListPage = import('@cubeartisan/client/pages/CubeListPage').default;
  pages.CubeOverviewPage = import('@cubeartisan/client/pages/CubeOverviewPage').default;
  pages.CubePlaytestPage = import('@cubeartisan/client/pages/CubePlaytestPage').default;
  pages.CubeSamplePackPage = import('@cubeartisan/client/pages/CubeSamplePackPage').default;
  pages.DashboardPage = import('@cubeartisan/client/pages/DashboardPage').default;
  pages.DevBlog = import('@cubeartisan/client/pages/DevBlog').default;
  pages.DownTimePage = import('@cubeartisan/client/pages/DownTimePage').default;
  pages.EditArticlePage = import('@cubeartisan/client/pages/EditArticlePage').default;
  pages.EditPodcastPage = import('@cubeartisan/client/pages/EditPodcastPage').default;
  pages.EditVideoPage = import('@cubeartisan/client/pages/EditVideoPage').default;
  pages.ErrorPage = import('@cubeartisan/client/pages/ErrorPage').default;
  pages.ExplorePage = import('@cubeartisan/client/pages/ExplorePage').default;
  pages.FiltersPage = import('@cubeartisan/client/pages/FiltersPage').default;
  pages.GridDraftPage = import('@cubeartisan/client/pages/GridDraftPage').default;
  pages.InfoPage = import('@cubeartisan/client/pages/InfoPage').default;
  pages.LandingPage = import('@cubeartisan/client/pages/LandingPage').default;
  pages.Loading = import('@cubeartisan/client/pages/Loading').default;
  pages.LoginPage = import('@cubeartisan/client/pages/LoginPage').default;
  pages.LostPasswordPage = import('@cubeartisan/client/pages/LostPasswordPage').default;
  pages.MarkdownPage = import('@cubeartisan/client/pages/MarkdownPage').default;
  pages.NotificationsPage = import('@cubeartisan/client/pages/NotificationsPage').default;
  pages.PasswordResetPage = import('@cubeartisan/client/pages/PasswordResetPage').default;
  pages.PodcastEpisodePage = import('@cubeartisan/client/pages/PodcastEpisodePage').default;
  pages.PodcastPage = import('@cubeartisan/client/pages/PodcastPage').default;
  pages.PodcastsPage = import('@cubeartisan/client/pages/PodcastsPage').default;
  pages.RecentDraftsPage = import('@cubeartisan/client/pages/RecentDraftsPage').default;
  pages.RegisterPage = import('@cubeartisan/client/pages/RegisterPage').default;
  pages.ReviewArticlesPage = import('@cubeartisan/client/pages/ReviewArticlesPage').default;
  pages.ReviewPodcastsPage = import('@cubeartisan/client/pages/ReviewPodcastsPage').default;
  pages.ReviewVideosPage = import('@cubeartisan/client/pages/ReviewVideosPage').default;
  pages.SearchPage = import('@cubeartisan/client/pages/SearchPage').default;
  pages.TopCardsPage = import('@cubeartisan/client/pages/TopCardsPage').default;
  pages.UserAccountPage = import('@cubeartisan/client/pages/UserAccountPage').default;
  pages.UserBlogPage = import('@cubeartisan/client/pages/UserBlogPage').default;
  pages.UserCubePage = import('@cubeartisan/client/pages/UserCubePage').default;
  pages.UserDecksPage = import('@cubeartisan/client/pages/UserDecksPage').default;
  pages.UserSocialPage = import('@cubeartisan/client/pages/UserSocialPage').default;
  pages.VersionPage = import('@cubeartisan/client/pages/VersionPage').default;
  pages.VideoPage = import('@cubeartisan/client/pages/VideoPage').default;
  pages.VideosPage = import('@cubeartisan/client/pages/VideosPage').default;
  pages.AdminCommentsPage = import('@cubeartisan/client/pages/AdminCommentsPage').default;
  pages.AdminDashboardPage = import('@cubeartisan/client/pages/AdminDashboardPage').default;
  pages.ApplicationPage = import('@cubeartisan/client/pages/ApplicationPage').default;
  pages.ApplicationsPage = import('@cubeartisan/client/pages/ApplicationsPage').default;
  pages.ArticlePage = import('@cubeartisan/client/pages/ArticlePage').default;
  pages.ArticlesPage = import('@cubeartisan/client/pages/ArticlesPage').default;
  pages.BlogPostPage = import('@cubeartisan/client/pages/BlogPostPage').default;
  pages.BrowseContentPage = import('@cubeartisan/client/pages/BrowseContentPage').default;
  pages.BulkUploadPage = import('@cubeartisan/client/pages/BulkUploadPage').default;
  pages.CardPage = import('@cubeartisan/client/pages/CardPage').default;
  pages.LeaveWarningPage = import('@cubeartisan/client/pages/LeaveWarningPage').default;
  pages.BrowsePackagesPage = import('@cubeartisan/client/pages/BrowsePackagesPage').default;
  pages.PackagePage = import('@cubeartisan/client/pages/PackagePage').default;
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
