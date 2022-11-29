import { A } from 'solid-start';

import * as styles from '@cubeartisan/cubeartisan/components/Nav.css';

const SiteNavbar = () => {
  const userid = '';

  return (
    <nav>
      <ul class={styles.nav}>
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
    </nav>
  );
};

export default SiteNavbar;
