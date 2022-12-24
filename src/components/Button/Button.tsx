import { splitProps } from 'solid-js';

import { buttonRecipe, ButtonVariants } from '@cubeartisan/cubeartisan/components/Button/Button.css';
import artisan from '@cubeartisan/cubeartisan/components/factory';

export const Button = artisan('button', buttonRecipe);
