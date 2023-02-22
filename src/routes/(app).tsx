import { Outlet } from 'solid-start';

import { SiteFooter } from '@cubeartisan/cubeartisan/layouts/site/SiteFooter';
import { SiteNavbar } from '@cubeartisan/cubeartisan/layouts/site/SiteNavbar';
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
