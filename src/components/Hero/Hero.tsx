import artisan from '@cubeartisan/cubeartisan/components/factory';
import * as styles from '@cubeartisan/cubeartisan/components/Hero/Hero.css';

const HeroContent: ArtisanParentComponent<'div', Record<string, never>, styles.HeroContentVariants> = artisan(
  'div',
  styles.heroContentRecipe,
);

const Hero: ArtisanParentComponent<'header', Record<string, never>, styles.HeroRootVariants> = artisan(
  'div',
  styles.heroRootRecipe,
);

export { Hero as Root, HeroContent as Content };
