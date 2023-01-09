import { merge } from 'lodash';
import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';

export const Center: typeof artisan.div = (props) => {
  const [local, others] = splitProps(props, ['style']);

  return <artisan.div style={merge({ display: 'grid', 'place-items': 'center' }, local.style)} {...others} />;
};
