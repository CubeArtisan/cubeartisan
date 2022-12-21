import { mergeProps, splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { stackRecipe } from '@cubeartisan/cubeartisan/components/generic/Stack/Stack.css';
import type { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export type StackProps = {
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'space-between' | 'space-around';
  // dividers?: true | false | 'regular' | 'strong'; TODO
  align?: 'left' | 'right' | 'center';
};

export const Stack: ArtisanComponent<'div', unknown, StackProps> = (props) => {
  const propsWithDefault = mergeProps({ space: 'md', align: 'center' }, props);
  const [local, others] = splitProps(propsWithDefault, ['space', 'align']);

  return <artisan.div class={stackRecipe({ space: local.space, align: local.align })} {...others} />;
};
