/*
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
import { useMemo } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client'; // eslint-disable-line
import { SWRConfig } from 'swr';

import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import { DisplayContextProvider } from '@cubeartisan/client/components/contexts/DisplayContext.js';
import SiteCustomizationContext, {
  DEFAULT_SITE_CUSTOMIZATIONS,
} from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import { DEFAULT_AXIOS_OPTIONS } from '@cubeartisan/client/utils/SWRFetchers.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/UserPropType.js').User} User
 * @typedef {import('@cubeartisan/client/components/contexts/SiteCustomizationContext.js').SiteCustomizations} SiteCustomizations
 */

/**
 * @typedef DefaultProps
 * @property {User?} user
 * @property {SiteCustomizations?} siteCustomizations
 */
/**
 * @template Props
 * @typedef {Props & DefaultProps} ElementProps
 */
/**
 * @template Props
 * @param {React.ComponentType<ElementProps<Props>>} Element
 */
const RenderToRoot = (Element) => {
  const Wrapped = () => {
    /** @type {ElementProps<Props>} */
    // @ts-ignore
    const reactProps = useMemo(() => (typeof window !== 'undefined' ? window?.reactProps ?? {} : {}), []);
    const defaultUserProps = useMemo(
      () =>
        reactProps?.user ?? {
          _id: null,
          username: 'Anonymous User',
          email: null,
          about: null,
          notifications: [],
          image_name: null,
          image: null,
          artist: null,
          users_following: [],
          roles: [],
          hide_featured: false,
          theme: null,
        },
      [reactProps],
    );
    return (
      <ErrorBoundary>
        <SWRConfig value={DEFAULT_AXIOS_OPTIONS}>
          <UserContext.Provider value={defaultUserProps}>
            <SiteCustomizationContext.Provider value={reactProps?.siteCustomizations ?? DEFAULT_SITE_CUSTOMIZATIONS}>
              <DisplayContextProvider cubeID={null} defaultNumCols={5}>
                <Element {...reactProps} />
              </DisplayContextProvider>
            </SiteCustomizationContext.Provider>
          </UserContext.Provider>
        </SWRConfig>
      </ErrorBoundary>
    );
  };
  if (typeof document !== 'undefined') {
    const wrapper = document.getElementById('react-root');
    const element = <Wrapped />;
    if (wrapper) {
      if (wrapper.children.length === 0) {
        const root = createRoot(wrapper);
        root.render(element);
      } else {
        hydrateRoot(wrapper, element);
      }
    }
  }
  return Wrapped;
};
export default RenderToRoot;
