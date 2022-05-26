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

import { MarkdownHelp } from '@cubeartisan/markdown';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import ExternalLink from '@cubeartisan/client/components/markdown/ExternalLink.js';
import MarkdownCardImage from '@cubeartisan/client/components/markdown/MarkdownCardImage.js';
import MarkdownCardLink from '@cubeartisan/client/components/markdown/MarkdownCardLink.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const MarkdownPage = ({ loginCallback }) => {
  const { siteName } = useContext(SiteCustomizationContext);
  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <MarkdownHelp
        siteName={siteName}
        ExternalLink={ExternalLink}
        CardImage={MarkdownCardImage}
        CardLink={MarkdownCardLink}
      />
    </MainLayout>
  );
};

MarkdownPage.propTypes = {
  loginCallback: PropTypes.string,
  siteCustomizations: PropTypes.shape({
    siteName: PropTypes.string.isRequired,
  }).isRequired,
};

MarkdownPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(MarkdownPage);
