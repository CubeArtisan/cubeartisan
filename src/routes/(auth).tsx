import { Outlet } from 'solid-start';

import * as styles from '@cubeartisan/cubeartisan/routes/(auth).css';

const AuthLayout = () => (
  <main class={styles.authContainer}>
    <div class={styles.authFormContainer}>
      <Outlet />
    </div>
  </main>
);
export default AuthLayout;
