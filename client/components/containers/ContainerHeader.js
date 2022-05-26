import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ContainerHeader = ({ title, variant, sx, children }) => (
  <Box
    sx={{
      backgroundColor: 'background.darker',
      paddingX: 2,
      paddingY: 1,
      marginBottom: 1,
      borderRadius: '16px 16px 0 0',
      width: '100%',
      ...sx,
    }}
  >
    <Typography variant={variant}>{title}</Typography>
    {children}
  </Box>
);
ContainerHeader.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  sx: PropTypes.shape({}),
  children: PropTypes.node,
};
ContainerHeader.defaultProps = {
  variant: 'h5',
  sx: {},
  children: null,
};
export default ContainerHeader;
