import { Switch as BaseSwitch } from '@kobalte/core';
import { Component, ComponentProps, ParentComponent } from 'solid-js';

import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';

const SwitchInput = BaseSwitch.Input;

export const SwitchLabel: ParentComponent<ComponentProps<typeof BaseSwitch.Label>> = (props) => (
  <BaseSwitch.Label class={styles.switchLabel} {...props} />
);

const SwitchControl: ParentComponent<ComponentProps<typeof BaseSwitch.Control>> = (props) => (
  <BaseSwitch.Control class={styles.switchControl} {...props} />
);

const SwitchThumb: Component<ComponentProps<typeof BaseSwitch.Thumb>> = (props) => (
  <BaseSwitch.Thumb class={styles.switchThumb} {...props} />
);

type SwitchComposite = {
  Input: typeof SwitchInput;
  Label: typeof SwitchLabel;
  Control: typeof SwitchControl;
  Thumb: typeof SwitchThumb;
};

const Switch: ParentComponent<ComponentProps<typeof BaseSwitch>> & SwitchComposite = (props) => (
  <BaseSwitch class={styles.switchRoot} {...props} />
);

Switch.Input = SwitchInput;
Switch.Label = SwitchLabel;
Switch.Control = SwitchControl;
Switch.Thumb = SwitchThumb;

export { Switch };
