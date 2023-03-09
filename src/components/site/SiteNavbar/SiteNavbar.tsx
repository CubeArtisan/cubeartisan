import { createMediaQuery } from '@solid-primitives/media';
import { Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getClientUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { Button } from '@cubeartisan/cubeartisan/components/generic/Button';
import { TextField } from '@cubeartisan/cubeartisan/components/generic/TextField';
import { Bell } from '@cubeartisan/cubeartisan/components/icons/Bell';
import { Cube } from '@cubeartisan/cubeartisan/components/icons/Cube';
import { Enter } from '@cubeartisan/cubeartisan/components/icons/Enter';
import { Home } from '@cubeartisan/cubeartisan/components/icons/Home';
import { MagnifyingGlass } from '@cubeartisan/cubeartisan/components/icons/MagnifyingGlass';
import { Person } from '@cubeartisan/cubeartisan/components/icons/Person';
import { Plus } from '@cubeartisan/cubeartisan/components/icons/Plus';
import { QuestionMarkCircled } from '@cubeartisan/cubeartisan/components/icons/QuestionMarkCircled';
import * as styles from '@cubeartisan/cubeartisan/components/site/SiteNavbar/SiteNavbar.css';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

const SiteNavbar = () => {
  const user = createServerData$((_, { request }) => getClientUserFromRequest(request));

  const isTabletPlus = createMediaQuery(`(min-width: ${tokens.screens.tablet})`, true);
  const isLaptopPlus = createMediaQuery(`(min-width: ${tokens.screens.laptop})`, true);

  return (
    <header>
      <nav>
        <ul class={styles.navList}>
          <Show
            when={user()}
            fallback={
              <>
                <Show
                  when={isTabletPlus()}
                  fallback={
                    <li class={styles.navItemContainer}>
                      <A href="/">
                        <img class={styles.logo} src="/images/cube-logo.svg" />
                      </A>
                    </li>
                  }
                >
                  <li class={styles.navItemContainer}>
                    <A href="/">
                      <img class={styles.logo} src="/images/stacked-logo.svg" />
                    </A>
                  </li>
                  <Show when={isLaptopPlus()}>
                    <li class={styles.navItemContainer}>
                      <A href="/">
                        <Home class={styles.navIcon} />
                      </A>
                    </li>
                    <li class={styles.navItemContainer}>
                      <A href="/help">
                        <QuestionMarkCircled class={styles.navIcon} />
                      </A>
                    </li>
                  </Show>
                </Show>
                <TextField.Root class={styles.siteSearch}>
                  <TextField.Input class={styles.searchInput} />
                  <MagnifyingGlass class={styles.searchIcon} />
                </TextField.Root>
                <Show
                  when={isTabletPlus()}
                  fallback={
                    <li class={styles.navItemContainer}>
                      <Enter class={styles.navIcon} />
                    </li>
                  }
                >
                  <li>
                    <Button.Root recipe={{ padding: 'baseText' }}>Sign Up</Button.Root>
                  </li>
                  <li>
                    <Button.Root recipe={{ color: 'primary', padding: 'baseText' }}>Log In</Button.Root>
                  </li>
                </Show>
              </>
            }
          >
            <Show
              when={isTabletPlus()}
              fallback={
                <li>
                  <A href="/">
                    <Home class={styles.navIcon} />
                  </A>
                </li>
              }
            >
              <li>
                <A href="/">
                  <img src="/images/stacked-logo.svg" />
                </A>
              </li>
              <Show when={isLaptopPlus()}>
                <li class={styles.navItemContainer}>
                  <A href="/">
                    <Home class={styles.navIcon} />
                  </A>
                </li>
                <li class={styles.navItemContainer}>
                  <A href="/help">
                    <QuestionMarkCircled class={styles.navIcon} />
                  </A>
                </li>
              </Show>
            </Show>
            <Show
              when={isTabletPlus()}
              fallback={
                <li>
                  <Button.Root class={styles.navItemContainer}>
                    <MagnifyingGlass class={styles.navIcon} />
                  </Button.Root>
                </li>
              }
            >
              <TextField.Root class={styles.siteSearch}>
                <TextField.Input class={styles.searchInput} />
                <MagnifyingGlass class={styles.searchIcon} />
              </TextField.Root>
            </Show>
            <Show
              when={isTabletPlus()}
              fallback={
                <>
                  <li>
                    <Cube class={styles.navIcon} />
                  </li>
                  <li>
                    <Person class={styles.navIcon} />
                  </li>
                </>
              }
            >
              <Show when={isLaptopPlus()}>
                <li>
                  <Plus class={styles.navItemContainer} />
                </li>
                <li>
                  <Cube class={styles.navItemContainer} />
                </li>
                <li>
                  <Bell class={styles.navItemContainer} />
                </li>
              </Show>
              <li>
                <Person />
                {user()?.username}
              </li>
            </Show>
          </Show>
        </ul>
      </nav>
    </header>
  );
};

export { SiteNavbar };
