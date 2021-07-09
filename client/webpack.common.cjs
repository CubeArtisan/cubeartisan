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
        exclude: /node_modules/,
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
    ],
  },
  devtool: 'source-map',
  resolve: {
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
    BlogPostPage: './pages/BlogPostPage.js',
    BulkUploadPage: './pages/BulkUploadPage.js',
    CubeSamplePackPage: './pages/CubeSamplePackPage.js',
    CubeAnalysisPage: './pages/CubeAnalysisPage.js',
    CubeBlogPage: './pages/CubeBlogPage.js',
    CubeComparePage: './pages/CubeComparePage.js',
    CubeDeckPage: './pages/CubeDeckPage.js',
    CubeDecksPage: './pages/CubeDecksPage.js',
    CubeDeckbuilderPage: './pages/CubeDeckbuilderPage.js',
    CubeDraftPage: './pages/CubeDraftPage.js',
    CubeListPage: './pages/CubeListPage.js',
    CubeOverviewPage: './pages/CubeOverviewPage.js',
    CubePlaytestPage: './pages/CubePlaytestPage.js',
    DashboardPage: './pages/DashboardPage.js',
    GridDraftPage: './pages/GridDraftPage.js',
    DevBlog: './pages/DevBlog.js',
    ContactPage: './pages/ContactPage.js',
    InfoPage: './pages/InfoPage.js',
    FiltersPage: './pages/FiltersPage.js',
    DownTimePage: './pages/DownTimePage.js',
    ErrorPage: './pages/ErrorPage.js',
    CardSearchPage: './pages/CardSearchPage.js',
    CardPage: './pages/CardPage.js',
    CommentPage: './pages/CommentPage.js',
    LoginPage: './pages/LoginPage.js',
    RegisterPage: './pages/RegisterPage.js',
    LostPasswordPage: './pages/LostPasswordPage.js',
    NotificationsPage: './pages/NotificationsPage.js',
    PasswordResetPage: './pages/PasswordResetPage.js',
    UserAccountPage: './pages/UserAccountPage.js',
    UserBlogPage: './pages/UserBlogPage.js',
    UserDecksPage: './pages/UserDecksPage.js',
    UserSocialPage: './pages/UserSocialPage.js',
    UserCubePage: './pages/UserCubePage.js',
    ExplorePage: './pages/ExplorePage.js',
    SearchPage: './pages/SearchPage.js',
    RecentDraftsPage: './pages/RecentDraftsPage.js',
    VersionPage: './pages/VersionPage.js',
    LandingPage: './pages/LandingPage.js',
    AdminDashboardPage: './pages/AdminDashboardPage.js',
    CommentReportsPage: './pages/CommentReportsPage.js',
    ApplicationsPage: './pages/ApplicationsPage.js',
    AdminCommentsPage: './pages/AdminCommentsPage.js',
    ApplicationPage: './pages/ApplicationPage.js',
    CreatorsPage: './pages/CreatorsPage.js',
    MarkdownPage: './pages/MarkdownPage.js',
    EditArticlePage: './pages/EditArticlePage.js',
    ArticlePage: './pages/ArticlePage.js',
    ReviewArticlesPage: './pages/ReviewArticlesPage.js',
    ArticlesPage: './pages/ArticlesPage.js',
    EditVideoPage: './pages/EditVideoPage.js',
    VideoPage: './pages/VideoPage.js',
    ReviewVideosPage: './pages/ReviewVideosPage.js',
    VideosPage: './pages/VideosPage.js',
    EditPodcastPage: './pages/EditPodcastPage.js',
    PodcastPage: './pages/PodcastPage.js',
    ReviewPodcastsPage: './pages/ReviewPodcastsPage.js',
    PodcastsPage: './pages/PodcastsPage.js',
    PodcastEpisodePage: './pages/PodcastEpisodePage.js',
    BrowseContentPage: './pages/BrowseContentPage.js',
    LeaveWarningPage: './pages/LeaveWarningPage.js',
    BrowsePackagesPage: './pages/BrowsePackagesPage.js',
    PackagePage: './pages/PackagePage.js',
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
