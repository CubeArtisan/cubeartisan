import { A } from 'solid-start';

import * as styles from '@cubeartisan/cubeartisan/components/Nav.css';

const SiteNavbar = () => {
  const userid = '';

  return (
    <nav class={styles.nav}>
      <div class={styles.navContainer}>
        <ul class={styles.navList}>
          <li>
            <A href="/">Home</A>
          </li>
          <li>
            <A href="/social">Social</A>
          </li>
          <li>
            <A href={`/${userid}/cubes`}>Your Cubes</A>
          </li>
        </ul>
        <ul class={styles.navList}>
          <li>
            <button>Search</button>
          </li>
          <li>
            <button>New Cube</button>
          </li>
          <li>
            <button>Notifications</button>
          </li>
          <li>
            <button>Sign In</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SiteNavbar;
