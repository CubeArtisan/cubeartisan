import { Button as ButtonBase } from '@kobalte/core';

import { buttonRecipe } from '@cubeartisan/cubeartisan/components/Button/Button.css';
import artisan from '@cubeartisan/cubeartisan/components/factory';

export const Button = artisan(typeof ButtonBase, buttonRecipe);
