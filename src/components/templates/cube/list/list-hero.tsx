import { useCubeListContext } from '@cubeartisan/cubeartisan/components/templates/cube/list/list-context';
import * as styles from '@cubeartisan/cubeartisan/components/templates/cube/list/list-hero.css';

export const CubeListHero = () => {
  const cube = useCubeListContext();

  return (
    <header class={styles.heroRoot}>
      <div>
        <h1 class={styles.cubeNameLabel}>{cube.name}</h1>
        <p>{cube.owner_name}</p>
        <p>actions</p>
      </div>
      <div>
        <h2 class={styles.cubeDescriptionLabel}>Description</h2>
        <p class={styles.cubeDescription}>A short description</p>
      </div>
    </header>
  );
};
