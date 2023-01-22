import type { Component } from 'solid-js';

import { Switch } from '@cubeartisan/cubeartisan/components/Switch/Switch';

export type ComposedSwitchProps = {
  label: string;
};

export const ComposedSwitch: Component<ComposedSwitchProps> = (props) => (
  <Switch.Root>
    <Switch.Input />
    <Switch.Label>{props.label}</Switch.Label>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
  </Switch.Root>
);

export type ControlledComposedSwitchProps = {
  label: string;
  isChecked: boolean;
  onCheckedChange: () => void;
};

export const ControlledComposedSwitch: Component<ControlledComposedSwitchProps> = (props) => (
  // eslint-disable-next-line solid/reactivity
  <Switch.Root isChecked={props.isChecked} onCheckedChange={props.onCheckedChange}>
    <Switch.Input />
    <Switch.Label>{props.label}</Switch.Label>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
  </Switch.Root>
);
