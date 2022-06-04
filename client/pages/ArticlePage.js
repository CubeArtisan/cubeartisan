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
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { lazy, useContext } from 'react';

import { ContainerHeader, LayoutContainer } from '@cubeartisan/client/components/containers/LayoutContainer.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import ArticlePropType from '@cubeartisan/client/proptypes/ArticlePropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const Article = lazy(() => import('@cubeartisan/client/components/Article.js'));

export const ArticlePage = ({ loginCallback, article }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <LayoutContainer sx={{ marginBottom: 3 }}>
        {user && user._id === article.owner && (
          <ContainerHeader title={article.status !== 'published' ? '*Draft*' : null}>
            <Button color="primary" href={`/creators/article/${article._id}/edit`}>
              Edit
            </Button>
          </ContainerHeader>
        )}
        <Suspense>
          <Article article={article} />
        </Suspense>
      </LayoutContainer>
    </MainLayout>
  );
};
ArticlePage.propTypes = {
  loginCallback: PropTypes.string,
  article: ArticlePropType.isRequired,
};
ArticlePage.defaultProps = {
  loginCallback: '/',
};
export default RenderToRoot(ArticlePage);
