import { Switch as BaseSwitch } from '@kobalte/core';
import clsx from 'clsx';
import { Component, ComponentProps, ParentComponent, splitProps } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';

const SwitchInput = BaseSwitch.Input;

const SwitchLabel: ParentComponent<ComponentProps<typeof BaseSwitch.Label>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Label class={clsx(styles.switchLabel, local.class)} {...others} />;
};

const SwitchControl: ParentComponent<ComponentProps<typeof BaseSwitch.Control>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Control class={clsx(styles.switchControl, local.class)} {...others} />;
};

const SwitchThumb: Component<ComponentProps<typeof BaseSwitch.Thumb>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Thumb class={clsx(styles.switchThumb, local.class)} {...others} />;
};

const SwitchRoot: ParentComponent<ComponentProps<typeof BaseSwitch.Root>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Root class={clsx(styles.switchRoot, local.class)} {...others} />;
};

export const Switch = {
  Root: SwitchRoot,
  Input: SwitchInput,
  Label: SwitchLabel,
  Control: SwitchControl,
  Thumb: SwitchThumb,
};
