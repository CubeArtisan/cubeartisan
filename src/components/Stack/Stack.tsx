import artisan from '@cubeartisan/cubeartisan/components/factory';
import * as styles from '@cubeartisan/cubeartisan/components/Stack/Stack.css';
import { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export const Stack: ArtisanComponent<'div', Record<string, never>, styles.StackVariants> = artisan(
  'div',
  styles.stackRecipe,
);

export const HStack: ArtisanComponent<'div', Record<string, never>, styles.HStackVariants> = artisan(
  'div',
  styles.hStackRecipe,
);

export const VStack: ArtisanComponent<'div', Record<string, never>, styles.VStackVariants> = artisan(
  'div',
  styles.vStackRecipe,
);
