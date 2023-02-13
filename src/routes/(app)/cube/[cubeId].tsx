import { Button } from '@kobalte/core';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'solid-icons/tb';
import { Accessor, createMemo, createSignal, Show } from 'solid-js';
import { Outlet } from 'solid-start';

import * as styles from '@cubeartisan/cubeartisan/routes/(app)/cube/cubeId.css';

const CubeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = createSignal(true);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const dataset: Accessor<{ 'data-open': string | undefined }> = createMemo(() => ({
    'data-open': sidebarOpen() === true ? '' : undefined,
  }));

  return (
    <div class={styles.container}>
      <header class={styles.sidebar} {...dataset()}>
        <button onClick={() => closeSidebar()} class={styles.sidebarCloseButton}>
          <TbLayoutSidebarLeftCollapse class={styles.sidebarIcon} />
        </button>
        <div class={styles.sidebarContent}>
          <nav>
            <ul class={styles.sidebarNav}>
              <li>List</li>
              <li>Primer</li>
              <li>Blog</li>
              <li>Analysis</li>
              <li>Playtest</li>
            </ul>
          </nav>
        </div>
      </header>
      <div class={styles.main}>
        <Show when={!sidebarOpen()}>
          <Button.Root onPress={() => openSidebar()} class={styles.sidebarOpenButton}>
            <TbLayoutSidebarLeftExpand class={styles.sidebarIcon} />
          </Button.Root>
        </Show>
        <Outlet />
      </div>
    </div>
  );
};
export default CubeLayout;
