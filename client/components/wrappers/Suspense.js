import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { Suspense as ReactSuspense } from 'react';

/**
 * @type {React.FC<{ fallback?: React.ReactNode }>}
 */
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
