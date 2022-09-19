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
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';

import { LayoutContainer } from '@cubeartisan/client/components/containers/LayoutContainer.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false, error: '', stack: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error.message, stack: error.stack };
  }

  componentDidCatch(error, errorInfo) {
    // TODO: Set up network error-logging service so we know if there are UI bugs.
    console.error(error, errorInfo);
  }

  render() {
    const { error, stack, hasError } = this.state;
    const { children, sx } = this.props;
    if (hasError) {
      return (
        <Box sx={sx ?? { marginTop: 3 }}>
          <Typography variant="h1" align="center">
            Something went wrong.
          </Typography>
          <Typography component="p" variant="subtitle1" align="center">
            You may want to try reloading the page.
          </Typography>
          <br />
          <LayoutContainer>
            <Typography component="p" variant="body1">
              <code>{error}</code>
            </Typography>
            <Typography component="p" variant="body1">
              <code>
                {stack.split('\n').map((text, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={i}>
                    {text}
                    <br />
                  </Fragment>
                ))}
              </code>
            </Typography>
          </LayoutContainer>
        </Box>
      );
    }
    return children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.shape({}),
};
ErrorBoundary.defaultProps = {
  sx: null,
};
export default ErrorBoundary;
