import React, { Suspense as ReactSuspense } from 'react';
import PropTypes from 'prop-types';

const Suspense = ({ fallback, ...props }) => {
  if (typeof window === 'undefined') return fallback;
  return <ReactSuspense fallback={fallback} {...props} />;
};
Suspense.propTypes = {
  fallback: PropTypes.node.isRequired,
};
export default Suspense;
