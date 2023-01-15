import { Switch as BaseSwitch } from '@kobalte/core';
import { Component, ComponentProps, ParentComponent, splitProps } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';

const SwitchInput = BaseSwitch.Input;

const SwitchLabel: ParentComponent<ComponentProps<typeof BaseSwitch.Label>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Label class={`${styles.switchLabel} ${local.class}`} {...others} />;
};

const SwitchControl: ParentComponent<ComponentProps<typeof BaseSwitch.Control>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Control class={`${styles.switchControl} ${local.class}`} {...others} />;
};

const SwitchThumb: Component<ComponentProps<typeof BaseSwitch.Thumb>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Thumb class={`${styles.switchThumb} ${local.class}`} {...others} />;
};

type SwitchComposite = {
  Input: typeof SwitchInput;
  Label: typeof SwitchLabel;
  Control: typeof SwitchControl;
  Thumb: typeof SwitchThumb;
};

const Switch: ParentComponent<ComponentProps<typeof BaseSwitch>> & SwitchComposite = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch class={`${styles.switchRoot} ${local.class}`} {...others} />;
};

Switch.Input = SwitchInput;
Switch.Label = SwitchLabel;
Switch.Control = SwitchControl;
Switch.Thumb = SwitchThumb;

export { Switch };
