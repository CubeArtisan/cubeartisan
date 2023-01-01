import artisan from '@cubeartisan/cubeartisan/components/factory';
import * as styles from '@cubeartisan/cubeartisan/components/Stack/Stack.css';
import { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';

/**
 * Horizontal flex container that centers content by default
 */
export const HStack: ArtisanParentComponent<'div', styles.HStackVariants> = artisan('div', styles.hStackRecipe);

/**
 * Vertical flex container that centers content by default
 */
export const VStack: ArtisanParentComponent<'div', styles.VStackVariants> = artisan('div', styles.vStackRecipe);
