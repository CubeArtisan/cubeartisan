import artisan from '@cubeartisan/cubeartisan/components/factory';
import { stackRecipe, hStackRecipe, vStackRecipe } from '@cubeartisan/cubeartisan/components/Stack/Stack.css';

/**
 * Horizontal flex container that centers content by default
 */
export const HStack = artisan('div', hStackRecipe);

/**
 * Vertical flex container that centers content by default
 */
export const VStack = artisan('div', vStackRecipe);
