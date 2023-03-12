import { createMediaQuery } from '@solid-primitives/media';
import { createSignal, Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerAction$, createServerData$, redirect } from 'solid-start/server';

import { getClientUserFromRequest, storage } from '@cubeartisan/cubeartisan/backend/user';
import { LoginForm, LoginFormTitle } from '@cubeartisan/cubeartisan/components/auth/LoginForm';
import { SignupForm, SignupFormTitle } from '@cubeartisan/cubeartisan/components/auth/SignupForm';
import { Button } from '@cubeartisan/cubeartisan/components/generic/Button';
import { Modal } from '@cubeartisan/cubeartisan/components/generic/Modal';
import { TextField } from '@cubeartisan/cubeartisan/components/generic/TextField';
import {
  Bell,
  Cube,
  Enter,
  Home,
  MagnifyingGlass,
  Person,
  Plus,
  QuestionMarkCircled,
} from '@cubeartisan/cubeartisan/components/icons/';
import * as styles from '@cubeartisan/cubeartisan/components/site/SiteNavbar/SiteNavbar.css';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

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

  const isTabletPlus = createMediaQuery(`(min-width: ${tokens.screens.tablet})`, true);
  const isLaptopPlus = createMediaQuery(`(min-width: ${tokens.screens.laptop})`, true);

  const LoginButton = () => {
    const [loginOpen, setLoginOpen] = createSignal<boolean>(false);

    return (
      <Show
        when={isLaptopPlus()}
        fallback={
          <Button.Root recipe={{ color: 'primary', padding: 'baseText' }}>
            <A href="/login">Log In</A>
          </Button.Root>
        }
      >
        <Button.Root onClick={() => setLoginOpen(true)} recipe={{ color: 'primary', padding: 'baseText' }}>
          Log In
        </Button.Root>
        <Modal.Root isOpen={loginOpen()} onOpenChange={setLoginOpen} isModal>
          <Modal.Overlay onClick={() => setLoginOpen(false)} />
          <Modal.Content onPointerDownOutside={(event) => event.preventDefault()}>
            <LoginFormTitle />
            <LoginForm />
          </Modal.Content>
        </Modal.Root>
      </Show>
    );
  };

  const SignupButton = () => {
    const [signupOpen, setSignupOpen] = createSignal<boolean>(false);

    return (
      <Show
        when={isLaptopPlus()}
        fallback={
          <Button.Root recipe={{ padding: 'baseText' }}>
            <A href="/login">Sign Up</A>
          </Button.Root>
        }
      >
        <Button.Root onClick={() => setSignupOpen(true)} recipe={{ padding: 'baseText' }}>
          Sign Up
        </Button.Root>
        <Modal.Root isOpen={signupOpen()} onOpenChange={setSignupOpen} isModal>
          <Modal.Overlay />
          <Modal.Content>
            <SignupFormTitle />
            <SignupForm />
          </Modal.Content>
        </Modal.Root>
      </Show>
    );
  };

  return (
    <header>
      <nav>
        <ul class={styles.navList}>
          <Show
            when={user()}
            fallback={
              // ----- Not Logged In -----
              <>
                {/* Site Nav (home and help) */}
                <Show
                  when={isTabletPlus()}
                  fallback={
                    // (mobile) small cubeartisan logo
                    <li class={styles.navItemContainer}>
                      <A href="/">
                        <img class={styles.logo} src="/images/cube-logo.svg" />
                      </A>
                    </li>
                  }
                >
                  {/* (tablet+) large cubeartisan logo */}
                  <li class={styles.navItemContainer}>
                    <A href="/">
                      <img class={styles.logo} src="/images/stacked-logo.svg" />
                    </A>
                  </li>
                  {/* (laptop+) home and help links */}
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

                {/* Search Bar */}
                <TextField.Root class={styles.siteSearch}>
                  <TextField.Input class={styles.searchInput} />
                  <MagnifyingGlass class={styles.searchIcon} />
                </TextField.Root>

                {/* Auth */}
                <Show
                  when={isTabletPlus()}
                  fallback={
                    // (mobile) login icon link
                    <li class={styles.navItemContainer}>
                      <A href="/login">
                        <Enter class={styles.navIcon} />
                      </A>
                    </li>
                  }
                >
                  {/* (tablet+) signup and login buttons */}
                  <li>
                    <SignupButton />
                  </li>
                  <li>
                    <LoginButton />
                  </li>
                </Show>
              </>
            }
          >
            {/* ----- Logged In ----- */}
            <Show
              when={isTabletPlus()}
              fallback={
                // (mobile) home
                <li class={styles.navItemContainer}>
                  <A href="/">
                    <Home class={styles.navIcon} />
                  </A>
                </li>
              }
            >
              {/* (tablet+) large cubeartisan logo */}
              <li class={styles.navItemContainer}>
                <A href="/">
                  <img class={styles.logo} src="/images/stacked-logo.svg" />
                </A>
              </li>
              {/* (laptop+) home and help links */}
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

            {/* Search */}
            <Show
              when={isTabletPlus()}
              fallback={
                // (mobile) search icon
                <li class={styles.navItemContainer}>
                  <MagnifyingGlass class={styles.navIcon} />
                </li>
              }
            >
              {/* (tablet+) search bar */}
              <TextField.Root class={styles.siteSearch}>
                <TextField.Input class={styles.searchInput} />
                <MagnifyingGlass class={styles.searchIcon} />
              </TextField.Root>
            </Show>

            {/* User Actions */}
            <Show
              when={isTabletPlus()}
              fallback={
                // (mobile) Your Cubes and Profile links
                <>
                  <li class={styles.navItemContainer}>
                    <Cube class={styles.navIcon} />
                  </li>
                  <li class={styles.navItemContainer}>
                    <Person class={styles.navIcon} />
                  </li>
                </>
              }
            >
              <Show when={isLaptopPlus()}>
                {/* (laptop+) New Cube, Your Cubes, and Notifications */}
                <li class={styles.navItemContainer}>
                  <Plus class={styles.navIcon} />
                </li>
                <li class={styles.navItemContainer}>
                  <Cube class={styles.navIcon} />
                </li>
                <li class={styles.navItemContainer}>
                  <Bell class={styles.navIcon} />
                </li>
              </Show>
              {/* (tablet+) Profile and username */}
              <li style={{ display: 'flex', 'align-items': 'center', gap: '0.625rem' }}>
                <Person style={{ height: '1.5rem', width: '1.5rem' }} />
                {user()?.username}
              </li>

              {/* Temp logout button. Will be in dropdown menu */}
              <li>
                <Button.Root onClick={() => logOut()} recipe={{ padding: 'baseText' }}>
                  Log Out
                </Button.Root>
              </li>
            </Show>
          </Show>
        </ul>
      </nav>
    </header>
  );
};

export { SiteNavbar };
