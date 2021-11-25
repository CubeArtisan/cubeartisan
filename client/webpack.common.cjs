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
const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

//Multi page entry
function getEntries() {
  const entry = {};
  glob.sync('./pages/*.js').forEach((file) => {
    const name = file.match(/\/pages\/(.+)\.js/)[1];
    entry[name] = file;
  });
  return entry;
}

//Multi page template
function getHtmlPlugins() {
  return glob
    .sync('./pages/*.js')
    .map((file) => {
      return { name: file.match(/\/pages\/(.+)\.js/)[1], path: file };
    })
    .map(
      (template) =>
        new HtmlWebpackPlugin({
          filename: `${template.name}.pug`,
          inject: false,
          chunks: [template.name.toString(), 'runtime'],
          templateContent: ({htmlWebpackPlugin}) =>
            `doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    meta(name='description', content='Build, playtest, and share your Magic the Gathering cube!')
    meta(name='keywords', content='MTG,Magic the Gathering,Magic,Cube,Cubing,Cube Management,Cube Draft')
    meta(name='viewport', content='width=device-width, initial-scale=1')
    if csrfToken
      meta(name='csrf-token', content=csrfToken)
    if metadata
      for metadatum, i in metadata
        if metadatum.name
          meta(name=metadatum.name, content=metadatum.content)
        if metadatum.property
          meta(property=metadatum.property, content=metadatum.content)
    link(rel='stylesheet', href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css', integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh', crossorigin='anonymous')
    link(rel='stylesheet', href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap')
    link(rel='icon', href='/content/favicon.ico?v=1.1', type='image/x-icon')
    title=title
    link(rel='stylesheet' href=colors)
    link(rel='stylesheet' href='/css/autocomplete.css')
    link(rel='stylesheet' href='/css/draft.css')
    link(rel='stylesheet' href='/css/editcube.css')
    link(rel='stylesheet' href='/css/stylesheet.css')
    link(rel='stylesheet' href='/css/tags.css')
    ${htmlWebpackPlugin.files.css.map((filename) => `link(src='/js/${filename}', rel='stylesheet')`).join('\n    ')}
    link(href='//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css', rel='stylesheet')
    link(href='https://code.cdn.mozilla.net/fonts/fira.css' rel='stylesheet')
    link(href='https://unpkg.com/react-pivottable@0.9.0/pivottable.css', rel='stylesheet')

    if cssStyles
      for cssStyle in cssStyles
        | !{cssStyle}

  body
    != messages('dynamic_message', locals)
    #react-root !{reactHTML}

    script(type='text/javascript').
      window.reactProps = !{reactProps};
    ${htmlWebpackPlugin.files.js.map((filename) => `script(src='/js/${filename}', async, module)`).join('\n    ')}

    noscript
      div.centered
        p.mt-3.mx-2 CubeArtisan requires javascript to work. To use the site, please enable javascript in your browser.`,
          minify: false,
          alwaysWriteToDisk: true,
        }),
    );
}

const config = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
    usedExports: true,
  },
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        type: 'javascript/auto',
        exclude: /node_modules[\\/](?!@cubeartisan)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.cjs'),
          },
        },
      },
      {
        test: /\.wasm$/,
        type: 'asset/resource',
      },
      {
        test: /\.(css|less)$/,
        sideEffects: true,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@cubeartisan/client': path.resolve(__dirname, './'),
      '@cubeartisan/markdown': path.resolve(__dirname, '../markdown'),
      '@cubeartisan/server': path.resolve(__dirname, '../server'),
    },
  },
};

const clientConfig = merge(config, {
  entry: getEntries(),
  output: {
    filename: '[name].[contenthash].bundle.js',
    sourceMapFilename: '[name].[contenthash].js.map',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    ...getHtmlPlugins(),
    new HtmlWebpackHarddiskPlugin(),
  ],
  target: 'browserslist',
});

module.exports = { clientConfig };
