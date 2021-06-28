import { useContext } from 'react';

import SiteCustomizationContext from '@hypercube/client/contexts/SiteCustomizationContext';

const Copyright = () => {
  const currentDate = new Date().getFullYear();
  const { siteName } = useContext(SiteCustomizationContext);

  return (
    <>
      All other content Copyright © 2020-{currentDate} {siteName}.
    </>
  );
};

export default Copyright;
