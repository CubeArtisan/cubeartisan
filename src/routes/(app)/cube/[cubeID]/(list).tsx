import { Separator } from '@kobalte/core';

import { ListActions, ListHero, ListTable } from '@cubeartisan/cubeartisan/components/cube/list';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/cube/[cubeID]/(list).css';

const CubePage = () => (
  <main class={styles.main}>
    <ListHero />
    <Separator.Root class={styles.separator} />
    <ListActions />
    <ListTable />
  </main>
);

export default CubePage;
