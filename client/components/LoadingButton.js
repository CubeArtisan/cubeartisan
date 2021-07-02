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
import { Button, Spinner } from 'reactstrap';

const LoadingButton = ({ onClick, loading, ...props }) => {
  const [stateLoading, setLoading] = useState(false);

  const handleClick = useCallback(
    async (event) => {
      setLoading(true);
      await onClick(event);
      setLoading(false);
    },
    [onClick],
  );

  const loadingControlled = loading !== null;
  const renderLoading = loadingControlled ? loading : stateLoading;
  const renderOnClick = loadingControlled ? onClick : handleClick;

  return (
    <div className="d-flex justify-content-center align-items-center">
      {renderLoading && <Spinner className="position-absolute" />}
      <Button {...props} onClick={renderOnClick} disabled={renderLoading} />
    </div>
  );
};
LoadingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
LoadingButton.defaultProps = {
  loading: null,
};

export default LoadingButton;
