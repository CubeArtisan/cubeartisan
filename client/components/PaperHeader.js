import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const PaperHeader = ({ title, variant, sx, children }) => (
  <Box
    sx={{
      backgroundColor: 'background.darker',
      paddingX: 2,
      paddingY: 1,
      marginBottom: 1,
      width: '100%',
      ...sx,
    }}
  >
    <Typography variant={variant}>{title}</Typography>
    {children}
  </Box>
);
PaperHeader.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  sx: PropTypes.shape({}),
  children: PropTypes.node,
};
PaperHeader.defaultProps = {
  variant: 'h5',
  sx: {},
  children: null,
};
export default PaperHeader;
