import artisan from '@cubeartisan/cubeartisan/components/factory';
import * as styles from '@cubeartisan/cubeartisan/components/Hero/Hero.css';

const HeroContentBlock = artisan('div', styles.heroContentBlockRecipe);
const Hero = artisan('header', styles.heroRootRecipe);
export { Hero as Root, HeroContentBlock as ContentBlock };
