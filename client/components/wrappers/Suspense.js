import React, { Suspense as ReactSuspense } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

const Suspense = ({ fallback, ...props }) => {
  if (typeof window !== 'undefined') {
    return <ReactSuspense fallback={fallback} {...props} />;
  }
  return null;
};
Suspense.propTypes = {
  fallback: PropTypes.node,
};
Suspense.defaultProps = {
  fallback: <CircularProgress />,
};
export default Suspense;
