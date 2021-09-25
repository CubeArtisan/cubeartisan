import React, { Suspense as ReactSuspense } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

const Suspense = ({ ...props }) => {
  if (typeof window !== 'undefined') {
    return <ReactSuspense {...props} />;
  }
  return null;
};
Suspense.propTypes = {
  fallback: PropTypes.node,
};
Suspense.defaultProps = {
  fallback: <Spinner />,
};

export default Suspense;
