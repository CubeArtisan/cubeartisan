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
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { clientConfig: common } = require('./webpack.common.cjs');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
};
const clientConfig = merge(common, config, {
  devServer: {
    devMiddleware: {
      publicPath: '/js/',
    },
    historyApiFallback: true,
    compress: true,
    host: '127.0.0.1',
    port: 8080,
    static: {},
    // contentBase: path.join(__dirname, 'dist'),
    proxy: [
      {
        context: ['!/js/*.bundle.js', '**'],
        target: 'http://127.0.0.1:5000',
      },
    ],
    hot: true,
    // liveReload: true,
    // watchFiles: [
    //   './components/**/*.js',
    //   './drafting/**/*.js',
    //   './filtering/**/*.js',
    //   './generated/**/*.js',
    //   './hooks/**/*.js',
    //   './pages/**/*.js',
    //   './proptypes/**/*.js',
    //   './res/**/*',
    //   './utils/**/*.js',
    // ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});

module.exports = clientConfig;
