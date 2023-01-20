import { Button as BaseButton } from '@kobalte/core';
import clsx from 'clsx';
import { ComponentProps, ParentComponent, splitProps } from 'solid-js';

import { buttonRecipe, ButtonVariants } from '@cubeartisan/cubeartisan/components/Button/Button.css';

export const ButtonRoot: ParentComponent<{ recipe?: ButtonVariants } & ComponentProps<typeof BaseButton.Root>> = (
  props,
) => {
  const [local, others] = splitProps(props, ['recipe', 'class']);

  return <BaseButton.Root class={clsx(buttonRecipe(local.recipe), local.class)} {...others} />;
};
