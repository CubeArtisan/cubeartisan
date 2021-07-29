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
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { Spinner } from 'reactstrap';
import { fromEntries } from '@cubeartisan/client/utils/Util.js';
import styled from '@cubeartisan/client/utils/styledHelper.js';

const TransparentSpinner = styled(Spinner)`
  opacity: ${(props) => props.opacity};
`;

const withLoading = (Tag, handlers) => {
  const WithLoading = ({ loading, spinnerSize, opacity, ...props }) => {
    const [stateLoading, setLoading] = useState(false);
    const wrappedHandlers = useMemo(
      () =>
        fromEntries(
          (handlers || []).map((name) => [
            name,
            async (event) => {
              setLoading(true);
              await props[name](event);
              setLoading(false);
            },
          ]),
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      handlers.map((name) => props[name]),
    );
    const renderLoading = loading === null ? stateLoading : loading;

    return (
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        {renderLoading && <TransparentSpinner size={spinnerSize} className="position-absolute" />}
        <Tag disabled={renderLoading} {...props} {...wrappedHandlers} />
      </div>
    );
  };
  WithLoading.propTypes = {
    loading: PropTypes.bool,
    opacity: PropTypes.number,
    spinnerSize: PropTypes.string,
  };
  WithLoading.defaultProps = {
    loading: null,
    spinnerSize: undefined,
    opacity: 0.7,
  };
  if (typeof Tag === 'string') {
    WithLoading.displayName = `${Tag}WithLoading`;
  } else if (Tag.displayName) {
    WithLoading.displayName = `${Tag.displayName}WithLoading`;
  } else if (Tag.name) {
    WithLoading.displayName = `${Tag.name}WithLoading`;
  } else {
    WithLoading.displayName = 'WithLoading';
  }
  return WithLoading;
};

export default withLoading;
