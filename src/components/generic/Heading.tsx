import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { ArtisanComponent, ElementType, HTMLArtisanProps } from '@cubeartisan/cubeartisan/components/types';

interface HeadingP {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export type HeadingProps<C extends ElementType> = HTMLArtisanProps<C, null, HeadingP>;

const Heading: ArtisanComponent<'h2', HeadingProps<'h2'>> = (props) => {
  const [local, others] = splitProps(props, ['level']);

  return <artisan.h1 {...others} />;
};

export default Heading;
