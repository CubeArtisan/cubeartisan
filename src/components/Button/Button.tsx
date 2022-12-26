import { splitProps } from 'solid-js';

import { buttonRecipe, ButtonVariants } from '@cubeartisan/cubeartisan/components/Button/Button.css';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export const Button: ArtisanComponent<'button', ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ['recipe']);

  return <artisan.button class={buttonRecipe(local.recipe)} {...others} />;
};
