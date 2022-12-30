import artisan from '@cubeartisan/cubeartisan/components/factory';
import { stackRecipe, hStackRecipe, vStackRecipe } from '@cubeartisan/cubeartisan/components/Stack/Stack.css';

export const Stack = artisan(
  'div',
  stackRecipe,
);

export const HStack = artisan(
  'div',
  hStackRecipe,
);

export const VStack = artisan(
  'div',
  vStackRecipe,
);
