import type { ParentComponent } from 'solid-js';

import {
  heroContentBlockRecipe,
  HeroContentBlockVariants,
  heroRootRecipe,
  HeroRootVariants,
} from '@cubeartisan/cubeartisan/components/generic/Hero/Hero.css';

type HeroContentBlockProps = HeroContentBlockVariants;

const HeroContentBlock: ParentComponent<HeroContentBlockProps> = (props) => (
  <div class={heroContentBlockRecipe({ textAlign: props.textAlign })}>{props.children}</div>
);

// maybe add a prop to choose background color
export type HeroProps = HeroRootVariants;

const Hero: ParentComponent<HeroProps> = (props) => (
  <div class={heroRootRecipe({ justify: props.justify, background: props.background })}>{props.children}</div>
);

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
