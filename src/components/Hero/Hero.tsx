import artisan from '@cubeartisan/cubeartisan/components/factory';
import { heroContentRecipe, heroRootRecipe } from '@cubeartisan/cubeartisan/components/Hero/Hero.css';

const HeroContent = artisan('div', heroContentRecipe);
const Hero = artisan('header', heroRootRecipe);
export { Hero as Root, HeroContent as Content };
