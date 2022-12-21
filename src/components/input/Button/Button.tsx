import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { buttonRecipe, ButtonVariants } from '@cubeartisan/cubeartisan/components/input/Button/Button.css';
import type { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export const Button: ArtisanComponent<'button', ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ['recipe']);

  return <artisan.button class={buttonRecipe(local.recipe)} {...others} />;
};
