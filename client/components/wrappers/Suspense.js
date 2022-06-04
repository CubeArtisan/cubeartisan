import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { Suspense as ReactSuspense } from 'react';

/**
 * @typedef SuspenseProps
 * @property {React.ReactElement?} [fallback]
 * @property {React.ReactNode} children
 */

/**
 * @type {React.FC<SuspenseProps>}
 */
const Suspense = ({ fallback, children, ...props }) => {
  if (typeof window !== 'undefined') {
    return <ReactSuspense fallback={fallback} {...props} />;
  }
  return null;
};
Suspense.propTypes = {
  fallback: PropTypes.element,
  // @ts-ignore
  children: PropTypes.node.isRequired,
};
Suspense.defaultProps = {
  fallback: <CircularProgress />,
};
export default Suspense;
