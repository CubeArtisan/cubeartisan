import { useParams, useRouteData } from 'solid-start';

import * as styles from '@cubeartisan/cubeartisan/components/templates/cube/list/list-hero.css';
import type { CubeRouteData } from '@cubeartisan/cubeartisan/routes/(app)/cube/[cubeId]/(list)';

export const CubeListHero = () => {
  const data = useRouteData<CubeRouteData>(useParams());

  return (
    <div class={styles.heroContainer}>
      <header class={styles.heroRoot}>
        <div>
          <h2 class={styles.cubeName}>{data()?.name}</h2>
          <p class={styles.cubeOwnerName}>{data()?.owner_name}</p>
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
    </div>
  );
};
