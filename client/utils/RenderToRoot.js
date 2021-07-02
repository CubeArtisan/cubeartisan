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
import ReactDOM from 'react-dom';

import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary';
import SiteCustomizationContext from '@cubeartisan/client/contexts/SiteCustomizationContext';
import UserContext from '@cubeartisan/client/contexts/UserContext';

const RenderToRoot = (Element) => {
  const reactProps = typeof window !== 'undefined' ? window.reactProps : {};
  const element = (
    <ErrorBoundary className="mt-3">
      <SiteCustomizationContext.Provider value={reactProps ? reactProps.siteCustomizations : null}>
        <UserContext.Provider value={reactProps ? reactProps.user : null}>
          <Element {...reactProps} />
        </UserContext.Provider>
      </SiteCustomizationContext.Provider>
    </ErrorBoundary>
  );
  if (typeof document !== 'undefined') {
    const wrapper = document.getElementById('react-root');
    if (wrapper) {
      if (wrapper.children.length === 0) {
        ReactDOM.render(element, wrapper);
      } else {
        ReactDOM.hydrate(element, wrapper);
      }
    }
  }

  return Element;
};

export default RenderToRoot;
