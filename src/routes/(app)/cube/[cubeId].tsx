import { Dialog } from '@kobalte/core';
import { createMediaQuery } from '@solid-primitives/media';
import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createSignal,
  Setter,
  Show,
  splitProps,
  useContext,
} from 'solid-js';
import { A, Outlet, useIsRouting, useMatch } from 'solid-start';

import { Button } from '@cubeartisan/cubeartisan/components/generic/Button';
import { TextField } from '@cubeartisan/cubeartisan/components/generic/TextField';
import { testCube } from '@cubeartisan/cubeartisan/mock/testCube';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/cube/cubeId.css';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

/**
 * # Planning
 * This page will manage
 * - Context of cube data
 * - Cube Navigation
 *   - List
 *   - Primer
 *   - Blog
 *   - Changelog
 *   - Playtest
 *   - Compare
 *   - Analytics
 */

/**
 * # Cube Context Planning
 * - cube
 */

export type CubeContextValue = {
  editSidebarOpen: Accessor<boolean>;
  setEditSidebarOpen: Setter<boolean>;
};

export const CubeContext = createContext<CubeContextValue>();

export const useCubeContext = () => {
  const context = useContext(CubeContext);

  if (context === undefined) {
    throw new Error('[cubeartisan]: `useCubeContext` must be used witin the `cubeId` route');
  }

  return context;
};

const CubeLayout = () => {
  /**
   * Mock cube data
   * TODO: implement data fetching
   */
  const cube = testCube;

  const [cubeNavOpen, setCubeNavOpen] = createSignal<boolean>(false);
  const closeCubeNav = () => setCubeNavOpen(false);
  const openCubeNav = () => setCubeNavOpen(true);

  const [editSidebarOpen, setEditSidebarOpen] = createSignal<boolean>(false);
  const closeEditSidebar = () => setEditSidebarOpen(false);
  const openEditSidebar = () => setEditSidebarOpen(true);

  const isLaptopPlus = createMediaQuery(`(min-width: ${tokens.screens.laptop})`, true);
  const isRouting = useIsRouting();

  // Open nav when screen size gets larger
  // Close nav when screen gets smaller
  createEffect(() => {
    setCubeNavOpen(isLaptopPlus());
  });

  // Close nav modal but don't close nav sidebar when navigating
  createEffect(() => {
    if (isRouting() === true && !isLaptopPlus()) {
      closeCubeNav();
    }
  });

  let editSidebarInputRef;
  let editModalInputRef;
  createEffect(() => {
    if (editSidebarOpen()) {
      document.activeElement.blur();
      if (isLaptopPlus()) {
        setTimeout(() => editSidebarInputRef.focus(), 200);
      } else {
        editModalInputRef.focus();
      }
    }
  });

  const CubeNav = () => {
    const match = useMatch(() => `/cube/${cube.id}`);

    return (
      <nav>
        <ul class={styles.cubeNav}>
          <h2 class={styles.cubeNavHeading}>List</h2>
          <li>
            <A
              href={`/cube/${cube.id}`}
              class={match()?.path ? styles.cubeNavLinkSmallActive : styles.cubeNavLinkSmall}
            >
              Mainboard
            </A>
          </li>
          <li>
            <A
              href={`/cube/${cube.id}/maybeboard`}
              inactiveClass={styles.cubeNavLinkSmall}
              activeClass={styles.cubeNavLinkSmallActive}
            >
              Maybeboard
            </A>
          </li>
          <h2 class={styles.cubeNavHeading}>About</h2>
          <li>
            <A
              href={`/cube/${cube.id}/primer`}
              inactiveClass={styles.cubeNavLinkSmall}
              activeClass={styles.cubeNavLinkSmallActive}
            >
              Primer
            </A>
          </li>
          <li>
            <A
              href={`/cube/${cube.id}/blog`}
              inactiveClass={styles.cubeNavLinkSmall}
              activeClass={styles.cubeNavLinkSmallActive}
            >
              Blog
            </A>
          </li>
          <li>
            <A
              href={`/cube/${cube.id}/changelog`}
              inactiveClass={styles.cubeNavLinkSmall}
              activeClass={styles.cubeNavLinkSmallActive}
            >
              Changelog
            </A>
          </li>
          <h2 class={styles.cubeNavHeading}>Playtest</h2>
          <li>
            <A
              href={`/cube/${cube.id}/playtest/samplepack`}
              inactiveClass={styles.cubeNavLinkSmall}
              activeClass={styles.cubeNavLinkSmallActive}
            >
              Sample Pack
            </A>
          </li>
          <li>
            <A
              href={`/cube/${cube.id}/playtest/draft`}
              inactiveClass={styles.cubeNavLinkSmall}
              activeClass={styles.cubeNavLinkSmallActive}
            >
              Draft
            </A>
          </li>
          <li>
            <A
              href={`/cube/${cube.id}/playtest/sealed`}
              inactiveClass={styles.cubeNavLinkSmall}
              activeClass={styles.cubeNavLinkSmallActive}
            >
              Sealed Pool
            </A>
          </li>
          <li>
            <A
              href={`/cube/compare`}
              inactiveClass={styles.cubeNavLinkLarge}
              activeClass={styles.cubeNavLinkLargeActive}
            >
              Compare
            </A>
          </li>
          <li>
            <A
              href={`/cube/${cube.id}/analytics`}
              inactiveClass={styles.cubeNavLinkLarge}
              activeClass={styles.cubeNavLinkLargeActive}
            >
              Analytics
            </A>
          </li>
        </ul>
      </nav>
    );
  };

  const CubeNavCloseButton: Component<{ class: string }> = (props) => {
    const [local, others] = splitProps(props, ['class']);

    return (
      <Button.Root data-open={cubeNavOpen()} onClick={() => closeCubeNav()} class={local.class} {...others}>
        <svg
          class={styles.buttonIcon}
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </Button.Root>
    );
  };

  const EditSidebar: Component<{ ref }> = (props) => (
    <div class={styles.editSidebar}>
      <h2 class={styles.editSidebarTitle}>Edit</h2>
      <TextField.Root>
        <TextField.Input ref={props.ref} type="search" placeholder="Add or Remove" />
      </TextField.Root>
      <div>Commit buttons</div>
      <div>Current Commit</div>
      <div>Notes</div>
    </div>
  );

  const EditSidebarCloseButton: Component<{ class: string }> = (props) => {
    const [local, others] = splitProps(props, ['class']);

    return (
      <Button.Root data-open={editSidebarOpen()} onClick={() => closeEditSidebar()} class={local.class} {...others}>
        <svg
          class={styles.buttonIcon}
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </Button.Root>
    );
  };

  const cubeContextValue = {
    editSidebarOpen,
    setEditSidebarOpen,
  };

  return (
    <CubeContext.Provider value={cubeContextValue}>
      <div class={styles.container}>
        {/* Cube Nav Sidebar */}
        <div data-open={cubeNavOpen()} class={styles.cubeNavSidebarContainer}>
          <Show when={cubeNavOpen()}>
            <CubeNavCloseButton class={styles.cubeNavSidebarCloseButton} />
          </Show>
          <CubeNav />
        </div>
        {/* Cube Nav Sidebar Modal */}
        <Dialog.Root isOpen={!isLaptopPlus() && cubeNavOpen()} onOpenChange={setCubeNavOpen} forceMount>
          <Dialog.Portal>
            <Dialog.Overlay class={styles.modalOverlay} />
            <Dialog.Content class={styles.cubeNavModalContent}>
              <CubeNavCloseButton class={styles.cubeNavModalCloseButton} />
              <CubeNav />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* Main Page Content */}
        <div class={styles.mainContainer}>
          {/* Cube Nav Floating Button */}
          <Show when={!cubeNavOpen()}>
            <Button.Root onClick={() => openCubeNav()} class={styles.cubeNavOpenButton}>
              <svg
                class={styles.buttonIcon}
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
              </svg>
            </Button.Root>
          </Show>
          {/* Page Content */}
          <Outlet />
          {/* Edit Sidebar Floating Button */}
          <Show when={!editSidebarOpen()}>
            <Button.Root
              onClick={() => openEditSidebar()}
              class={styles.editSidebarOpenButton}
              recipe={{ color: 'success' }}
            >
              <svg
                class={styles.buttonIcon}
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
              </svg>
            </Button.Root>
          </Show>
        </div>
        {/* Edit Sidebar */}
        <div data-open={editSidebarOpen()} class={styles.editSidebarContainer}>
          <Show when={editSidebarOpen()}>
            <EditSidebarCloseButton class={styles.editSidebarCloseButton} />
          </Show>
          <EditSidebar ref={editSidebarInputRef} />
        </div>
        {/* Edit Sidebar Modal */}
        <Dialog.Root isOpen={!isLaptopPlus() && editSidebarOpen()} onOpenChange={setEditSidebarOpen} forceMount>
          <Dialog.Portal>
            <Dialog.Overlay class={styles.modalOverlay} />
            <Dialog.Content class={styles.editSidebarModalContent}>
              <EditSidebarCloseButton class={styles.editSidebarModalCloseButton} />
              <EditSidebar ref={editModalInputRef} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </CubeContext.Provider>
  );
};
export default CubeLayout;
