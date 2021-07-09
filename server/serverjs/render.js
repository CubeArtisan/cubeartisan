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
import dotenv from 'dotenv';
import React from 'react';
// eslint-disable-next-line import/extensions
import ReactDOMServer from 'react-dom/server.node.js';
import serialize from 'serialize-javascript';
import Cube from '@cubeartisan/server/models/cube.js';
import { LoadingPage } from '@cubeartisan/client/pages/LoadingPage.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';

dotenv.config();

// const getPage = async () => null;
const pageCache = { Loading: LoadingPage, LoadingPage };
const getPage = async (page, req) => {
  if (!pageCache[page]) {
    const pageModule = await import(`@cubeartisan/client/pages/${page}.js`);
    if (pageModule.default) {
      pageCache[page] = pageModule.default;
    } else {
      req.logger.error(`Could not load page ${page}.`);
      return LoadingPage;
    }
  }
  return pageCache[page];
};

const getCubes = async (req) => {
  if (!req.user) return [];
  try {
    return await Cube.find({ owner: req.user._id }, '_id name').sort({ date_updated: -1 }).lean();
  } catch (err) {
    winston.warn(err);
    return [];
  }
};

export const render = async (req, res, page, reactProps = {}, options = {}) => {
  const cubes = await getCubes(req);
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
  req.logger.info(`baseUrl: ${req.baseUrl}, path: ${req.path}`);
  reactProps.loginCallback = req.baseUrl + req.path;
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

  const pageElement = await getPage(page, req);
  res.render('main', {
    reactHTML: pageElement ? ReactDOMServer.renderToString(React.createElement(pageElement, reactProps)) : null,
    reactProps: serialize(reactProps),
    page,
    metadata: options.metadata,
    title: options.title ? `${options.title} - ${process.env.SITE_NAME}` : process.env.SITE_NAME,
    colors: req.user?.theme ? `/css/${req.user.theme}.css` : '/css/default.css',
  });
};

export default render;
