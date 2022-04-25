import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * @typedef { import('react').FunctionComponent<{ sx?: object }> } ComponentType
 * @type ComponentType
 */
const CardHeader = ({ sx, ...props }) => (
  <Box sx={{ borderRadius: '2rem 2rem 0 0', backgroundColor: 'background.darker', paddingX: 2, ...sx }} {...props} />
);
CardHeader.propTypes = {
  sx: PropTypes.shape({}),
};
CardHeader.defaultProps = {
  sx: {},
};
export default CardHeader;
