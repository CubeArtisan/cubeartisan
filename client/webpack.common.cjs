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
const path = require('path');
const merge = require('webpack-merge');

const config = {
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        type: 'javascript/auto',
        exclude: /node_modules[/\\](?!react-dnd|dnd-core)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.cjs'),
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.b64$/,
        type: 'asset',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    fullySpecified: false,
    alias: {
      '@cubeartisan/client': path.resolve(__dirname, './'),
      '@cubeartisan/server': path.resolve(__dirname, '../server'),
    },
  },
  performance: {
    hints: 'warning',
  },
};

const clientConfig = merge(config, {
  entry: {
    BlogPostPage: './client/pages/BlogPostPage.js',
    BulkUploadPage: './client/pages/BulkUploadPage.js',
    CubeSamplePackPage: './client/pages/CubeSamplePackPage.js',
    CubeAnalysisPage: './client/pages/CubeAnalysisPage.js',
    CubeBlogPage: './client/pages/CubeBlogPage.js',
    CubeComparePage: './client/pages/CubeComparePage.js',
    CubeDeckPage: './client/pages/CubeDeckPage.js',
    CubeDecksPage: './client/pages/CubeDecksPage.js',
    CubeDeckbuilderPage: './client/pages/CubeDeckbuilderPage.js',
    CubeDraftPage: './client/pages/CubeDraftPage.js',
    CubeListPage: './client/pages/CubeListPage.js',
    CubeOverviewPage: './client/pages/CubeOverviewPage.js',
    CubePlaytestPage: './client/pages/CubePlaytestPage.js',
    DashboardPage: './client/pages/DashboardPage.js',
    GridDraftPage: './client/pages/GridDraftPage.js',
    DevBlog: './client/pages/DevBlog.js',
    ContactPage: './client/pages/ContactPage.js',
    InfoPage: './client/pages/InfoPage.js',
    FiltersPage: './client/pages/FiltersPage.js',
    DownTimePage: './client/pages/DownTimePage.js',
    ErrorPage: './client/pages/ErrorPage.js',
    CardSearchPage: './client/pages/CardSearchPage.js',
    CardPage: './client/pages/CardPage.js',
    CommentPage: './client/pages/CommentPage.js',
    LoginPage: './client/pages/LoginPage.js',
    RegisterPage: './client/pages/RegisterPage.js',
    LostPasswordPage: './client/pages/LostPasswordPage.js',
    NotificationsPage: './client/pages/NotificationsPage.js',
    PasswordResetPage: './client/pages/PasswordResetPage.js',
    UserAccountPage: './client/pages/UserAccountPage.js',
    UserBlogPage: './client/pages/UserBlogPage.js',
    UserDecksPage: './client/pages/UserDecksPage.js',
    UserSocialPage: './client/pages/UserSocialPage.js',
    UserCubePage: './client/pages/UserCubePage.js',
    ExplorePage: './client/pages/ExplorePage.js',
    SearchPage: './client/pages/SearchPage.js',
    RecentDraftsPage: './client/pages/RecentDraftsPage.js',
    VersionPage: './client/pages/VersionPage.js',
    LandingPage: './client/pages/LandingPage.js',
    AdminDashboardPage: './client/pages/AdminDashboardPage.js',
    CommentReportsPage: './client/pages/CommentReportsPage.js',
    ApplicationsPage: './client/pages/ApplicationsPage.js',
    AdminCommentsPage: './client/pages/AdminCommentsPage.js',
    ApplicationPage: './client/pages/ApplicationPage.js',
    CreatorsPage: './client/pages/CreatorsPage.js',
    MarkdownPage: './client/pages/MarkdownPage.js',
    EditArticlePage: './client/pages/EditArticlePage.js',
    ArticlePage: './client/pages/ArticlePage.js',
    ReviewArticlesPage: './client/pages/ReviewArticlesPage.js',
    ArticlesPage: './client/pages/ArticlesPage.js',
    EditVideoPage: './client/pages/EditVideoPage.js',
    VideoPage: './client/pages/VideoPage.js',
    ReviewVideosPage: './client/pages/ReviewVideosPage.js',
    VideosPage: './client/pages/VideosPage.js',
    EditPodcastPage: './client/pages/EditPodcastPage.js',
    PodcastPage: './client/pages/PodcastPage.js',
    ReviewPodcastsPage: './client/pages/ReviewPodcastsPage.js',
    PodcastsPage: './client/pages/PodcastsPage.js',
    PodcastEpisodePage: './client/pages/PodcastEpisodePage.js',
    BrowseContentPage: './client/pages/BrowseContentPage.js',
    LeaveWarningPage: './client/pages/LeaveWarningPage.js',
    BrowsePackagesPage: './client/pages/BrowsePackagesPage.js',
    PackagePage: './client/pages/PackagePage.js',
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].js.map',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'browserslist:> 2%',
  optimization: {
    chunkIds: 'size',
  },
  parallelism: 8,
});

module.exports = { clientConfig };
