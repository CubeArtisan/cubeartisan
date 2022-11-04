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
import PropTypes from 'prop-types';
import { forwardRef, useCallback } from 'react';

import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';

/**
 * @typedef {{ onClick: (event: any) => void }} Clickable
 * @typedef {{ isOpen: boolean, toggle: () => void }} ModalLike
 */

/**
 * @template TagProps
 * @template {ModalLike}  ModalProps
 * @param {React.ComponentType<TagProps & Clickable>} Tag
 * @param {React.ComponentType<ModalProps & ModalLike>} ModalTag
 */
const withModal = (Tag, ModalTag) => {
  /**
   * @typedef {TagProps & { modalProps: Omit<ModalProps, 'isOpen'|'toggle'> }} WithModalProps
   */

  /**
   * @type {React.ForwardRefRenderFunction<any, WithModalProps>}
   */
  // eslint-disable-next-line react/prop-types
  const WithModalComponent = ({ modalProps, ...props }, ref) => {
    const [isOpen, toggleOpen] = useToggle(false);
    const toggleModal = useCallback(
      (e) => {
        e.preventDefault();
        toggleOpen();
      },
      [toggleOpen],
    );
    return (
      <>
        {/* @ts-ignore */}
        <Tag {...props} ref={ref} onClick={toggleModal} />
        <Suspense fallback={null}>
          {/* @ts-ignore */}
          <ModalTag isOpen={isOpen} toggle={toggleOpen} {...modalProps} />
        </Suspense>
      </>
    );
  };
  const WithModal = forwardRef(WithModalComponent);
  if (typeof Tag === 'string') {
    WithModal.displayName = `${Tag}WithModal`;
  } else if (Tag.displayName) {
    WithModal.displayName = `${Tag.displayName}WithModal`;
  } else if (Tag.name) {
    WithModal.displayName = `${Tag.name}WithModal`;
  } else {
    WithModal.displayName = 'WithModal';
  }
  // @ts-ignore
  WithModal.propTypes = {
    modalProps: PropTypes.shape(ModalTag.propTypes ?? {}),
    ...(Tag.propTypes ?? {}),
  };
  // @ts-ignore
  WithModal.defaultProps = {
    modalProps: ModalTag.defaultProps ?? {},
    ...(Tag.defaultProps ?? {}),
  };
  return WithModal;
};
export default withModal;
