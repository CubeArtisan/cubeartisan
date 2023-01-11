import { Separator as BaseSeparator } from '@kobalte/core';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { separatorRecipe } from '@cubeartisan/cubeartisan/components/Separator/Separator.css';
import { OmitProps } from '@cubeartisan/cubeartisan/components/types';
import type { vars } from '@cubeartisan/cubeartisan/styles';

const Separator = artisan(BaseSeparator, separatorRecipe);

export const VSeparator: OmitProps<typeof Separator, 'recipe'> & { length: typeof vars.space } = (props) => (
  <Separator orientation="vertical" recipe={{ orientation: 'vertical' }} {...props} />
);

export const HSeparator: OmitProps<typeof Separator, 'recipe'> & { length: typeof vars.space } = (props) => (
  <Separator orientation="horizontal" recipe={{ orientation: 'horizontal' }} {...props} />
);
