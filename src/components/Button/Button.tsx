import { buttonRecipe, ButtonVariants } from '@cubeartisan/cubeartisan/components/Button/Button.css';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export const Button: ArtisanComponent<'button', ButtonVariants> = artisan('button', buttonRecipe);
