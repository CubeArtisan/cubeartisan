import { useCubeListContext } from '@cubeartisan/cubeartisan/components/templates/cube/list/list-context';
import * as styles from '@cubeartisan/cubeartisan/components/templates/cube/list/list-hero.css';

export const CubeListHero = () => {
  const cube = useCubeListContext();

  return (
    <div class={styles.heroContainer}>
      <header class={styles.heroRoot}>
        <div>
          <h1 class={styles.cubeNameLabel}>{cube.name}</h1>
          <p>{cube.owner_name}</p>
          <p>actions</p>
        </div>
        <div>
          <h2 class={styles.cubeDescriptionLabel}>Description</h2>
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
