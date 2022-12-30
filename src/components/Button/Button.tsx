import { buttonRecipe, ButtonVariants } from '@cubeartisan/cubeartisan/components/Button/Button.css';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export const Button: ArtisanComponent<'button', Record<string, never>, ButtonVariants> = artisan(
  'button',
  buttonRecipe,
);
