import { Switch as BaseSwitch } from '@kobalte/core';
import clsx from 'clsx';
import { Component, ComponentProps, ParentComponent, splitProps } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';

export const SwitchInput = BaseSwitch.Input;

export const SwitchLabel: ParentComponent<ComponentProps<typeof BaseSwitch.Label>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Label class={clsx(styles.switchLabel, local.class)} {...others} />;
};

export const SwitchControl: ParentComponent<ComponentProps<typeof BaseSwitch.Control>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Control class={clsx(styles.switchControl, local.class)} {...others} />;
};

export const SwitchThumb: Component<ComponentProps<typeof BaseSwitch.Thumb>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Thumb class={clsx(styles.switchThumb, local.class)} {...others} />;
};

export const SwitchRoot: ParentComponent<ComponentProps<typeof BaseSwitch>> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return <BaseSwitch.Root class={clsx(styles.switchRoot, local.class)} {...others} />;
};
