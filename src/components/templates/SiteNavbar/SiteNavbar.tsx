import { CgBell, CgProfile } from 'solid-icons/cg';
import { createSignal, Show } from 'solid-js';
import { A } from 'solid-start';
// import { createServerData$ } from 'solid-start/server';

// import { getClientUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { Button } from '@cubeartisan/cubeartisan/components/Button';
import NewCubeModal from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/NewCubeModal';
import * as styles from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/SiteNavbar.css';
// import type { ProtectedUser } from '@cubeartisan/cubeartisan/types/user';

const SiteNavbar = () => {
  // const user = createServerData$((_, { request }) => getClientUserFromRequest(request));
  const [testUser, setTestUser] = createSignal(false);
  const toggleTestUser = () => {
    setTestUser((prev) => !prev);
  };

  return (
    <header class={styles.navContainer}>
      <nav class={styles.nav}>
        <ul class={styles.navLinks}>
          <li class={styles.logoContainer}>
            {/* TODO: href should be "/", made "/test" for ease of prototyping */}
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
          <Show keyed when={testUser()}>
            {/* TODO: use 'u: ProtectedUser' to define a profile picture */}
            {
              (/* u: ProtectedUser */) => (
                <li class={styles.navLink}>
                  <A id="your-cubes" href={`/user/${/* u.username */ 'test'}/cubes`}>
                    Your Cubes
                  </A>
                </li>
              )
            }
          </Show>
        </ul>
      </nav>
      <ul class={styles.navActions}>
        <Show when={testUser()} keyed>
          {/* TODO: use 'u: ProtectedUser' to define a profile picture */}
          {
            (/* u: ProtectedUser */) => (
              <>
                <li class={styles.navAction}>
                  <NewCubeModal />
                </li>
                <li class={styles.navAction}>
                  <CgBell class={styles.navActionIcon} />
                </li>
                <li class={styles.navAction}>
                  <CgProfile class={styles.navActionIcon} />
                </li>
              </>
            )
          }
        </Show>
        <li>
          <Button recipe={{ color: 'primary' }} onPress={toggleTestUser}>
            Toggle Auth
          </Button>
        </li>
      </ul>
    </header>
  );
};

export { SiteNavbar };
