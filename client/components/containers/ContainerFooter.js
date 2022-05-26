import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ContainerFooter = ({ children, sx }) => (
  <Box
    sx={{
      paddingX: 2,
      marginTop: 2,
      paddingY: 1,
      backgroundColor: 'background.darker',
      ...sx,
      borderRadius: '0 0 16px 16px',
    }}
  >
    {children}
  </Box>
);
ContainerFooter.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.shape({}),
};
ContainerFooter.defaultProps = {
  sx: {},
};
export default ContainerFooter;
