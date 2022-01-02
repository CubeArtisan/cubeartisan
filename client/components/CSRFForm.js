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
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { getCsrfToken } from '@cubeartisan/client/utils/CSRF.js';

/**
 * @typedef {import('react').ReactNode} ReactNode
 * @typedef {import('react').ForwardRefExoticComponent<{ children: ReactNode, action: string, encType?: string, method?: string }>} ComponentType
 * @type ComponentType
 */
const CSRFForm = forwardRef(({ children, ...props }, ref) => {
  const CSRFFormInternal = () => (
    <form ref={ref} {...props}>
      <input type="hidden" name="_csrf" value={getCsrfToken() ?? ''} />
      {children}
    </form>
  );
  CSRFFormInternal.displayName = 'CSRFForm';
  return <CSRFFormInternal />;
});
CSRFForm.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CSRFForm;
