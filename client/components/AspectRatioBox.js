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
import cx from 'classnames';
import PropTypes from 'prop-types';
import styled from '@cubeartisan/client/utils/styledHelper.js';

export const StretchedDiv = styled.div`
  padding-top: ${(props) => (100 / props.ratio).toFixed(5)}%;
`;

const NoMarginsDiv = styled.div`
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

/** 2020-11-17 struesdell:
 * - Added classnames dependency, allowing for terse classname construction
 * - Added style to props shape to allow partial style passthrough
 * - Added propTypes declaration to resolve ESLint errors (issue #1601)
 * - Added defaultProps to support partial prop application
 */
const AspectRatioBox = ({ ratio, className, ...props }) => (
  <StretchedDiv className="position-relative w-100" ratio={ratio}>
    <NoMarginsDiv className={cx('position-absolute', 'overflow-hidden', className)} {...props} />
  </StretchedDiv>
);
AspectRatioBox.propTypes = {
  ratio: PropTypes.number.isRequired,
  className: PropTypes.string,
};
AspectRatioBox.defaultProps = {
  className: '',
};
export default AspectRatioBox;
