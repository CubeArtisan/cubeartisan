import { Outlet } from 'solid-start';

import { SiteFooter } from '@cubeartisan/cubeartisan/components/templates/SiteFooter/SiteFooter';
import { SiteNavbar } from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/SiteNavbar';
import * as styles from '@cubeartisan/cubeartisan/routes/(app).css';

const AppLayout = () => (
  <div class={styles.appContainer}>
    <div class={styles.appContent}>
      <SiteNavbar />
      <Outlet />
    </div>
    <SiteFooter />
  </div>
);
export default AppLayout;
