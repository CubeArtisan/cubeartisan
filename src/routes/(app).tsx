import { Outlet } from 'solid-start';

import { SiteFooter } from '@cubeartisan/cubeartisan/components/site/SiteFooter';
import { SiteNavbar } from '@cubeartisan/cubeartisan/components/site/SiteNavbar';
import * as styles from '@cubeartisan/cubeartisan/routes/(app).css';

const AppLayout = () => (
  <>
    <div class={styles.appContainer}>
      <SiteNavbar />
      <Outlet />
    </div>
    <SiteFooter />
  </>
);
export default AppLayout;
