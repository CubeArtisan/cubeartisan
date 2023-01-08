import { Switch as BaseSwitch } from '@kobalte/core';
import { merge } from 'lodash';
import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import type { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';
import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

const SwitchInput = BaseSwitch.Input;

const SwitchLabel = artisan(BaseSwitch.Label);

const SwitchControl = artisan(BaseSwitch.Control);

const SwitchThumb = artisan(BaseSwitch.Thumb);

type SwitchComposite = {
  Input: typeof SwitchInput;
  Label: typeof SwitchLabel;
  Control: typeof SwitchControl;
  Thumb: typeof SwitchThumb;
};

const ArtisanSwitch = artisan(BaseSwitch);

const Switch: ArtisanParentComponent<'label'> & SwitchComposite = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const defaultAtoms: Atoms = {
    display: 'inlineFlex',
    alignItems: 'center',
  };

  return <ArtisanSwitch atoms={merge(defaultAtoms, local.atoms)} {...others} />;
};

Switch.Input = SwitchInput;
Switch.Label = SwitchLabel;
Switch.Control = SwitchControl;
Switch.Thumb = SwitchThumb;

export { Switch };
