import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import * as styles from '@cubeartisan/cubeartisan/components/generic/Hero/Hero.css';
import type { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';

const HeroContentBlock: ArtisanParentComponent<'div', styles.HeroContentBlockRecipe> = (props) => {
  const [local, others] = splitProps(props, ['recipe']);

  return <artisan.div class={styles.heroContentBlockRecipe(local.recipe)} {...others} />;
};

const Hero: ArtisanParentComponent<'header', styles.HeroRootRecipe> = (props) => {
  const [local, others] = splitProps(props, ['recipe']);

  return <artisan.header class={styles.heroRootRecipe(local.recipe)} {...others} />;
};

export { Hero as Root, HeroContentBlock as ContentBlock };
