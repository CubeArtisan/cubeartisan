import type { Component } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/templates/CubePage/CubeListHero.css';

export const CubeListHero: Component<{ cubeName: string }> = (props) => (
  <header class={styles.heroRoot}>
    <div>
      <h1 class={styles.cubeNameLabel}>{props.cubeName}</h1>
      <p>jesseb34r</p>
      <p>♥️ 📤 ...</p>
    </div>
    <div>
      <h2 class={styles.cubeDescriptionLabel}>Description</h2>
      <p class={styles.cubeDescription}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, eveniet atque error, omnis blanditiis illum
        maxime rerum a nulla alias doloribus nesciunt. Ab id eos inventore tempora voluptatum dignissimos nisi!
      </p>
    </div>
  </header>
);
