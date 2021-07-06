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
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const withModal = (Tag, ModalTag) => {
  const WithModal = ({ children, className, modalProps, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = useCallback(
      (event) => {
        if (event) {
          event.preventDefault();
        }
        setIsOpen(!isOpen);
      },
      [isOpen],
    );

    return (
      <>
        <Tag {...props} className={className ? `${className} clickable` : 'clickable'} onClick={toggle}>
          {children}
        </Tag>
        <ModalTag isOpen={isOpen} toggle={toggle} {...modalProps} />
      </>
    );
  };
  WithModal.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    modalProps: PropTypes.shape(ModalTag.propTypes).isRequired,
  };
  WithModal.defaultProps = {
    className: null,
  };
  return WithModal;
};

export default withModal;
