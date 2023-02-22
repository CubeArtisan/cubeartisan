import { Outlet } from 'solid-start';

import * as styles from '@cubeartisan/cubeartisan/routes/(app)/cube/cubeId.css';

/**
 * # Planning
 * This page will manage
 * - Context of cube data
 * - Which view is displayed
 * - nav and edit sidebars
 */

const CubeLayout = () => (
  <div class={styles.container}>
    <div class={styles.main}>
      <Outlet />
    </div>
  </div>
);
export default CubeLayout;
