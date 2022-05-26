import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ContainerBody = ({ children, sx }) => <Box sx={{ paddingX: 2, marginTop: 2, ...sx }}>{children}</Box>;
ContainerBody.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.shape({}),
};
ContainerBody.defaultProps = {
  sx: {},
};
export default ContainerBody;
