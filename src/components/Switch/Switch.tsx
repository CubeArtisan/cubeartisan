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

const SwitchRoot: ParentComponent<ComponentProps<typeof BaseSwitch>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Root class={`${styles.switchRoot} ${local.class}`} {...others} />;
};

export const Switch = {
  Input: SwitchInput,
  Label: SwitchLabel,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Root: SwitchRoot,
};
