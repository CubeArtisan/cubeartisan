import { Switch as BaseSwitch, SwitchOptions } from '@kobalte/core';
import { merge } from 'lodash';
import { splitProps } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';
import type { ArtisanComponent, ArtisanParentComponent, PropsOf } from '@cubeartisan/cubeartisan/components/types';
import type { Atoms } from '@cubeartisan/cubeartisan/styles/atoms/atoms.css';

const SwitchInput = BaseSwitch.Input;

const UnstyledLabel = artisan(BaseSwitch.Label);
const SwitchLabel: ArtisanParentComponent<'label', Record<string, never>, PropsOf<typeof UnstyledLabel>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <UnstyledLabel class={`${styles.switchLabel} ${local.class}`} {...others} />;
};

const UnstyledControl = artisan(BaseSwitch.Control);
const SwitchControl: ArtisanParentComponent<'div', Record<string, never>, PropsOf<typeof UnstyledControl>> = (
  props,
) => {
  const [local, others] = splitProps(props, ['class']);

  return <UnstyledControl class={`${styles.switchControl} ${local.class}`} {...others} />;
};

const UnstyledThumb = artisan(BaseSwitch.Thumb);
const SwitchThumb: ArtisanComponent<'div', Record<string, never>, PropsOf<typeof UnstyledThumb>> = (props) => {
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

const Switch: ArtisanParentComponent<'label'> & SwitchComposite & SwitchOptions = (props) => {
  const [local, others] = splitProps(props, ['atoms']);

  const defaultAtoms: Atoms = {
    display: 'inlineFlex',
    alignItems: 'center',
    justifyContent: 'spaceBetween',
  };

  return <ArtisanSwitch atoms={merge(defaultAtoms, local.atoms)} {...others} />;
};

Switch.Input = SwitchInput;
Switch.Label = SwitchLabel;
Switch.Control = SwitchControl;
Switch.Thumb = SwitchThumb;

export { Switch };
