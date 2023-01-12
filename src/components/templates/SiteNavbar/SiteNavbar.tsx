// import { CgBell, CgProfile } from 'solid-icons/cg';
// import { Show, splitProps } from 'solid-js';
import { A } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getClientUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
// import NewCubeModal from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/NewCubeModal';
// import type { ProtectedUser } from '@cubeartisan/cubeartisan/types/user';
import * as styles from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/SiteNavbar.css';

const SiteNavbar = () => {
  const user = createServerData$((_, { request }) => getClientUserFromRequest(request));

  return (
    <header class={styles.navContainer}>
      <nav class={styles.nav}>
        <ul class={styles.navLinks}>
          <li class={styles.logoContainer}>
            {/* href should be "/", made "/test" for ease of prototyping */}
            <A href="/test">
              <img src="/images/stacked-logo.svg" alt="CubeArtisan Logo" class={styles.logoImage} />
            </A>
          </li>
          <li class={styles.navLink}>
            <A href="/">Home</A>
          </li>
          <li class={styles.navLink}>
            <A href="/">Explore Cubes</A>
          </li>
          {/* <Show keyed when={user()}>
            {(u: ProtectedUser) => (
              <li>
                <A id="your-cubes" href={`/user/${u.username}/cubes`}>
                  Your Cubes
                </A>
              </li>
            )}
          </Show> */}
        </ul>
      </nav>
      <ul class={styles.navActions}>
        {/* <li class={styles.navAction}>
          <NewCubeModal />
        </li>
        <Show when={user()} keyed>
          {(u: ProtectedUser) => (
            <>
              <li class={styles.navAction}>
                <NavIcon size="sm" as="button" atoms={{ color: 'neutralContrast' }}>
                  <CgBell class={atoms({ height: 6, width: 6 })} />
                </NavIcon>
              </li>
              <li class={styles.navAction}>
                <CgProfile class={atoms({ height: 10, width: 10 })} />
              </li>
            </>
          )}
        </Show> */}
      </ul>
    </header>
  );
};

export { SiteNavbar };
