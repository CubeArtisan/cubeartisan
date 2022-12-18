import clsx from 'clsx';
import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/_Old/factory';
import {
  HeroContentBlockRecipe,
  heroContentBlockRecipe,
  HeroRootRecipe,
  heroRootRecipe,
} from '@cubeartisan/cubeartisan/components/generic/Hero/Hero.css';
import type { ArtisanComponent, ElementType, HTMLArtisanProps } from '@cubeartisan/cubeartisan/components/_Old/types';

type HeroContentBlockProps<C extends ElementType> = HTMLArtisanProps<C, HeroContentBlockRecipe>;

const HeroContentBlock: ArtisanComponent<'div', HeroContentBlockProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['recipe']);

  return <artisan class={clsx(local.class, heroContentBlockRecipe({ ...local.recipe }))} {...others} />;
};

type HeroProps<C extends ElementType> = HTMLArtisanProps<C, HeroRootRecipe>;

const Hero: ArtisanComponent<'div', HeroProps<'div'>> = (props) => {
  const [local, others] = splitProps(props, ['recipe']);

  return <artisan class={heroRootRecipe({ ...local.recipe })} {...others} />;
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
