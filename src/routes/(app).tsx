import { Button } from '@kobalte/core';
import { Accessor, createMemo, createSignal, Show } from 'solid-js';
import { A, Outlet } from 'solid-start';

import { SiteFooter } from '@cubeartisan/cubeartisan/components/templates/SiteFooter/SiteFooter';
import * as styles from '@cubeartisan/cubeartisan/routes/(app).css';

const AppLayout = () => {
  const [navOpen, setNavOpen] = createSignal(true);
  const toggleNavOpen = () => setNavOpen((prev) => !prev);

  const navDataset: Accessor<{ 'data-open': string | undefined }> = createMemo(() => ({
    'data-open': navOpen() === true ? '' : undefined,
  }));

  return (
    <div class={styles.appContainer}>
      <div class={styles.appContent}>
        <header class={styles.siteNavContainer}>
          <nav class={styles.siteNav}>
            <A href="/test" class={styles.siteNavIcon}>
              <img src="/images/stacked-logo.svg" alt="CubeArtisan Logo" class={styles.logoImage} />
            </A>
            <A href="/" class={styles.siteNavIcon}>
              <img src="/images/radix-icons/home.svg" alt="CubeArtisan Logo" class={styles.logoImage} />
            </A>
            <A href="/" class={styles.siteNavIcon}>
              <img src="/images/radix-icons/info-circled.svg" alt="CubeArtisan Logo" class={styles.logoImage} />
            </A>
          </nav>
          <div class={styles.siteNavUserActionsContainer}>
            <A href="/" class={styles.siteNavIcon}>
              <img src="/images/radix-icons/magnifying-glass.svg" alt="CubeArtisan Logo" class={styles.logoImage} />
            </A>
            <A href="/" class={styles.siteNavIcon}>
              <img src="/images/radix-icons/plus.svg" alt="CubeArtisan Logo" class={styles.logoImage} />
            </A>
            <A href="/" class={styles.siteNavIcon}>
              <img src="/images/radix-icons/bell.svg" alt="CubeArtisan Logo" class={styles.logoImage} />
            </A>
            <h2 class={styles.avatarUsername}>jesseb34r</h2>
          </div>
        </header>

        <div class={styles.appBody}>
          <nav class={styles.sidebarNav} {...navDataset()}>
            Nav
          </nav>
          <div class={styles.main}>
            <Outlet />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};
export default AppLayout;
