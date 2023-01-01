import { Outlet } from 'solid-start';

import { VStack } from '@cubeartisan/cubeartisan/components/Stack';
import SiteFooter from '@cubeartisan/cubeartisan/components/templates/app/SiteFooter';
import SiteNavbar from '@cubeartisan/cubeartisan/components/templates/app/SiteNavbar';

const AppLayout = () => (
  <VStack recipe={{ justify: 'normal' }}>
    <VStack style={{ 'min-height': '100vh' }} recipe={{ justify: 'normal' }}>
      <SiteNavbar />
      <main>
        <Outlet />
      </main>
    </VStack>
    <SiteFooter />
  </VStack>
);
export default AppLayout;
