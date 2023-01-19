import { CgBell, CgProfile } from 'solid-icons/cg';
import { Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerAction$, createServerData$, redirect } from 'solid-start/server';

import { getClientUserFromRequest, storage } from '@cubeartisan/cubeartisan/backend/user';
import { Button } from '@cubeartisan/cubeartisan/components/Button';
import NewCubeModal from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/NewCubeModal';
import * as styles from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/SiteNavbar.css';
// import type { ProtectedUser } from '@cubeartisan/cubeartisan/types/user';

const SiteNavbar = () => {
  const user = createServerData$((_, { request }) => getClientUserFromRequest(request));
  const [, logOut] = createServerAction$(async (_, { request }) => {
    const session = await storage.getSession(request.headers.get('Cookie'));
    return redirect('/', {
      headers: {
        'Set-Cookie': await storage.destroySession(session),
      },
    });
  });

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
          <Show keyed when={user()}>
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
        <Show
          when={user()}
          keyed
          fallback={() => (
            <>
              <li>
                <Button.Root as={A} href={'/login'} recipe={{ color: 'primary', padding: 'baseText' }}>
                  Log In
                </Button.Root>
              </li>
              <li>
                <Button.Root as={A} href={'/signup'} recipe={{ color: 'primary', padding: 'baseText' }}>
                  Sign Up
                </Button.Root>
              </li>
            </>
          )}
        >
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
                <li>{user()?.username}</li>
                <li>
                  <Button.Root recipe={{ padding: 'baseText' }} onPress={() => logOut()}>
                    Log Out
                  </Button.Root>
                </li>
              </>
            )
          }
        </Show>
      </ul>
    </header>
  );
};

export { SiteNavbar };
