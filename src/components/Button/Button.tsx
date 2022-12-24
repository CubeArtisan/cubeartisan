import { buttonRecipe, ButtonVariants } from '@cubeartisan/cubeartisan/components/Button/Button.css';
import artisan from '@cubeartisan/cubeartisan/components/factory';

export const Button: ArtisanComponent<'button', ButtonVariants> = artisan('button', buttonRecipe);
