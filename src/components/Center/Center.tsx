import { merge } from 'lodash';
import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';

export const Center: ArtisanParentComponent<'div'> = (props) => {
  const [local, others] = splitProps(props, ['style']);

  return <artisan.div style={merge({ display: 'grid', 'place-items': 'center' }, local.style)} {...others} />;
};
