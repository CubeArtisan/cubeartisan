// import { useParams, useRouteData } from 'solid-start';

import { Separator } from '@kobalte/core';

import * as styles from '@cubeartisan/cubeartisan/layouts/cube/list/ListHero/ListHero.css';
// import type { CubeRouteData } from '@cubeartisan/cubeartisan/routes/(app)/cube/[cubeId]/(list)';

export const ListHero = () => (
  // const data = useRouteData<CubeRouteData>(useParams());

  <div class={styles.heroContainer}>
    <header class={styles.heroRoot}>
      <div>
        <h2 class={styles.cubeName}>Mortal Combat</h2>
        <p class={styles.cubeOwnerName}>jesseb34r</p>
      </div>
      <div>
        <h2 class={styles.cubeDescriptionHeader}>Description</h2>
        <p class={styles.cubeDescription}>
          4 packs of 18 cards are to be drafted by 8 players. <br />
          First picks are double picks (like double masters) <br />
          Last pick is burned. <br />
          First mulligan is free.
        </p>
      </div>
    </header>
    <Separator.Root class={styles.separator} />
  </div>
);
