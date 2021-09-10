import React, { Suspense as ReactSuspense } from 'react';

const Suspense = ({ ...props }) => {
  if (typeof window !== 'undefined') {
    return <ReactSuspense {...props} />;
  }
  return null;
};

export default Suspense;
