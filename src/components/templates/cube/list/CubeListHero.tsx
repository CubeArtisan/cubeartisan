import { useCubeListContext } from '@cubeartisan/cubeartisan/components/templates/cube/list/CubeListContext';
import * as styles from '@cubeartisan/cubeartisan/components/templates/cube/list/CubeListHero.css';

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
