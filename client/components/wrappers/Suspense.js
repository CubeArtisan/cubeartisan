import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { Suspense as ReactSuspense } from 'react';

/**
 * @typedef SuspenseProps
 * @property {React.ReactElement?} [fallback]
 * @property {React.ReactNode} children
 */

/** @type {React.FC<SuspenseProps>} */
const Suspense = ({ fallback, children }) => <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
Suspense.propTypes = {
  fallback: PropTypes.element,
  // @ts-ignore
  children: PropTypes.node.isRequired,
};
Suspense.defaultProps = {
  fallback: <CircularProgress />,
};
export default Suspense;
