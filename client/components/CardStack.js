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
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const CardStack = ({ location, children, ...props }) => {
  const [{ isAcceptable }, drop] = useDrop({
    accept: 'card',
    drop: (item, monitor) => (monitor.didDrop() ? undefined : location),
    canDrop: () => true,
    collect: (monitor) => ({
      isAcceptable: !!monitor.isOver({ shallow: true }) && !!monitor.canDrop(),
    }),
  });

  let className = '';
  if (isAcceptable) {
    className = ' outline';
  }

  return (
    <div className={className} {...props}>
      <div ref={drop}>
        {!Array.isArray(children) ? (
          ''
        ) : (
          <div className="w-100 text-center mb-1">
            <b>{children.length > 0 ? children.length : ''}</b>
          </div>
        )}
        <div className="stack">{children}</div>
      </div>
    </div>
  );
};
CardStack.propTypes = {
  location: PropTypes.shape({ type: PropTypes.string.isRequired, data: PropTypes.arrayOf(PropTypes.number) })
    .isRequired,
  children: PropTypes.node.isRequired,
};
export default CardStack;
