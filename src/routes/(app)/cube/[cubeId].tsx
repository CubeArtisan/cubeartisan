import { Outlet } from 'solid-start';

import * as styles from '@cubeartisan/cubeartisan/routes/(app)/cube/cubeId.css';

const CubeLayout = () => (
  <div class={styles.container}>
    <div class={styles.main}>
      <Outlet />
    </div>
  </div>
);
export default CubeLayout;
