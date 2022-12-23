import { mergeProps, splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { inlineRecipe } from '@cubeartisan/cubeartisan/components/Inline/Inline.css';
import type { ArtisanComponent } from '@cubeartisan/cubeartisan/components/types';

export type InlineProps = {
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'space-between' | 'space-around';
  // dividers?: true | false | 'regular' | 'strong'; TODO
};

export const Inline: ArtisanComponent<'div', unknown, InlineProps> = (props) => {
  const propsWithDefault = mergeProps({ space: 'md' }, props);
  const [local, others] = splitProps(propsWithDefault, ['space']);

  return <artisan.div class={inlineRecipe({ space: local.space })} {...others} />;
};
