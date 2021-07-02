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
import { useRef } from 'react';
import PropTypes from 'prop-types';

import { UncontrolledTooltip } from 'reactstrap';

const Tooltip = ({ text, children, wrapperTag, tooltipProps, ...props }) => {
  const divRef = useRef();
  const Tag = wrapperTag || 'div';
  return (
    <>
      <Tag ref={divRef} {...props}>
        {children}
      </Tag>
      <UncontrolledTooltip placement="top" boundariesElement="window" trigger="hover" target={divRef} {...tooltipProps}>
        {text}
      </UncontrolledTooltip>
    </>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  wrapperTag: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  tooltipProps: PropTypes.shape({}),
};

Tooltip.defaultProps = {
  wrapperTag: 'div',
  tooltipProps: {},
};

export default Tooltip;
