import { merge } from 'lodash';
import { mergeProps, splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { stackRecipe, StackVariants } from '@cubeartisan/cubeartisan/components/Stack/Stack.css';
import type { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export const HStack: ArtisanComponent<'div', Omit<StackVariants, 'direction'>> = (props) => {
  const propsWithDefault = mergeProps({ space: 'md', align: 'center' }, props);
  const [local, others] = splitProps(propsWithDefault, ['recipe']);

  return <artisan.div class={stackRecipe(merge({ direction: 'row' }, local.recipe))} {...others} />;
};
