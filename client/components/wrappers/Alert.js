import React from 'react';
import { Alert as MuiAlert } from '@mui/material';
import PropTypes from 'prop-types';

const Alert = ({ color, ...props }) => (
  <MuiAlert severity={color === 'danger' ? 'error' : color} variant="filled" color={color} {...props} />
);
Alert.propTypes = {
  color: PropTypes.string.isRequired,
};
export default Alert;
