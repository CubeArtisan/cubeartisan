import clsx from 'clsx';
import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import {
  heroContentBlockRecipe,
  HeroContentBlockVariants,
  heroRootRecipe,
  HeroRootVariants,
} from '@cubeartisan/cubeartisan/components/generic/Hero/Hero.css';
import type { ArtisanComponent, ElementType, HTMLArtisanProps } from '@cubeartisan/cubeartisan/components/types';

type HeroContentBlockProps<C extends ElementType> = HTMLArtisanProps<C, HeroContentBlockVariants>;

const HeroContentBlock: ArtisanComponent<'div', HeroContentBlockProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class', 'textAlign']);

  return <artisan class={clsx(local.class, heroContentBlockRecipe({ textAlign: local.textAlign }))} {...others} />;
};

type HeroProps<C extends ElementType> = HTMLArtisanProps<C, HeroRootVariants>;

const Hero: ArtisanComponent<'div', HeroProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['class', 'layout', 'background']);

  return (
    <artisan
      class={clsx(local.class, heroRootRecipe({ layout: local.layout, background: local.background }))}
      {...others}
    />
  );
};

const Root = Hero;
const ContentBlock = HeroContentBlock;

export {
  Hero,
  HeroContentBlock,
  //
  Root,
  ContentBlock,
};
export type { HeroProps, HeroContentBlockProps };
