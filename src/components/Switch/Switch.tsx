import { Switch as BaseSwitch } from '@kobalte/core';
import { merge } from 'lodash';
import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';
import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

const SwitchInput = BaseSwitch.Input;

const UnstyledLabel = artisan(BaseSwitch.Label);
const SwitchLabel: typeof UnstyledLabel = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <UnstyledLabel class={`${styles.switchLabel} ${local.class}`} {...others} />;
};

const UnstyledControl = artisan(BaseSwitch.Control);
const SwitchControl: typeof UnstyledControl = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <UnstyledControl class={`${styles.switchControl} ${local.class}`} {...others} />;
};

const UnstyledThumb = artisan(BaseSwitch.Thumb);
const SwitchThumb: typeof UnstyledThumb = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <UnstyledThumb class={`${styles.switchThumb} ${local.class}`} {...others} />;
};

type SwitchComposite = {
  Input: typeof SwitchInput;
  Label: typeof SwitchLabel;
  Control: typeof SwitchControl;
  Thumb: typeof SwitchThumb;
};

const ArtisanSwitch = artisan(BaseSwitch);

const Switch: typeof ArtisanSwitch & SwitchComposite = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const defaultAtoms: Atoms = {
    display: 'inlineFlex',
    alignItems: 'center',
    justifyContent: 'spaceBetween',
    gap: 'gutter',
  };

  return <ArtisanSwitch atoms={merge(defaultAtoms, local.atoms)} {...others} />;
};

Switch.Input = SwitchInput;
Switch.Label = SwitchLabel;
Switch.Control = SwitchControl;
Switch.Thumb = SwitchThumb;

export { Switch };
