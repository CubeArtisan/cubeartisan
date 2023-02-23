import { ListHero, ListTable } from '@cubeartisan/cubeartisan/components/cube/list';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/cube/[cubeId]/(list).css';

const CubePage = () => (
  <main class={styles.main}>
    <ListHero />
    <ListTable />
  </main>
);

export default CubePage;
