import { Outlet } from 'solid-start';

import { VStack } from '@cubeartisan/cubeartisan/components/Stack';
import SiteFooter from '@cubeartisan/cubeartisan/components/templates/SiteFooter';
import { SiteNavbar } from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/SiteNavbar';

const AppLayout = () => (
  <VStack>
    <VStack style={{ 'min-height': '100vh' }}>
      <SiteNavbar />
      <main>
        <Outlet />
      </main>
    </VStack>
    <SiteFooter />
  </VStack>
);
export default AppLayout;
