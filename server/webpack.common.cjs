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
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        type: 'javascript/auto',
        exclude: /node_modules[/\\](?!react-dom[/\\]server|consolidate|@cubeartisan[/\\]client|canvas)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.js'),
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
    fullySpecified: false,
    alias: {
      '@cubeartisan/client': path.resolve(__dirname, '../client'),
      '@cubeartisan/server': path.resolve(__dirname, '.'),
    },
  },
  performance: {
    hints: 'warning',
  },
};

const serverConfig = merge(config, {
  target: 'node',
  entry: {
    render: './serverjs/render',
  },
  output: {
    filename: 'dist/[name].js',
    sourceMapFilename: 'dist/[name].js.map',
    path: __dirname,
  },
  parallelism: 8,
});

module.exports = { serverConfig };
