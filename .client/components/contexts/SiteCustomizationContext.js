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
import { createContext } from 'react';

/**
 * @typedef SiteCustomizations
 * @property {string} discordUrl
 * @property {string} siteName
 * @property {string} siteRoot
 * @property {string} sourceRepo
 * @property {string} supportEmail
 * @property {string} mtgmlServer
 */

/** @type {SiteCustomizations} */
export const DEFAULT_SITE_CUSTOMIZATIONS = {
  discordUrl: 'DiscordUrl',
  siteName: 'SiteName',
  siteRoot: 'http://localhost:8080',
  sourceRepo: 'https://github.com/cubeartisan/CubeArtisan',
  supportEmail: 'support@localhost',
  mtgmlServer: 'https://mtgml.cubeartisan.net',
};

const SiteCustomizationContext = createContext(DEFAULT_SITE_CUSTOMIZATIONS);
export default SiteCustomizationContext;
