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
import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary.js';
import SiteCustomizationContext, {
  DEFAULT_SITE_CUSTOMIZATIONS,
} from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';

const RenderToRoot = (Element) => {
  const defaultReactProps = typeof window !== 'undefined' ? window?.reactProps ?? {} : {};
  const Wrapped = (providedReactProps) => {
    const reactProps = { ...defaultReactProps, ...providedReactProps };
    return (
      <ErrorBoundary className="mt-3">
        <SiteCustomizationContext.Provider value={reactProps?.siteCustomizations ?? DEFAULT_SITE_CUSTOMIZATIONS}>
          <UserContext.Provider value={reactProps?.user ?? { _id: null, username: 'Anonymous User' }}>
            <Element {...reactProps} />
          </UserContext.Provider>
        </SiteCustomizationContext.Provider>
      </ErrorBoundary>
    );
  };
  if (typeof document !== 'undefined') {
    // import('bootstrap/dist/css/bootstrap.min.css');
    const wrapper = document.getElementById('react-root');
    const element = <Wrapped />;
    if (wrapper) {
      if (wrapper.children.length === 0) {
        ReactDOM.render(element, wrapper);
      } else {
        ReactDOM.hydrate(element, wrapper);
      }
    }
  }
  return Wrapped;
};

export default RenderToRoot;
