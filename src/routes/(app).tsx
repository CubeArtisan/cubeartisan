import { Outlet } from 'solid-start';

import { SiteFooter } from '@cubeartisan/cubeartisan/components/templates/SiteFooter/SiteFooter';
import { SiteNavbar } from '@cubeartisan/cubeartisan/components/templates/SiteNavbar';
import * as styles from '@cubeartisan/cubeartisan/routes/(app).css';

const AppLayout = () => (
  <div>
    <div class={styles.appContainer}>
      <SiteNavbar />
      <Outlet />
    </div>
    <SiteFooter />
  </div>
);
export default AppLayout;
