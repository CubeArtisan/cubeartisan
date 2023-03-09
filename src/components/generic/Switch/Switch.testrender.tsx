import { createSignal } from 'solid-js';

import { Switch } from '@cubeartisan/cubeartisan/components/generic/Switch';
import * as styles from '@cubeartisan/cubeartisan/components/generic/Switch/Switch.testrender.css';

export const TestSwitch = () => {
  const [checked, setChecked] = createSignal(false);

  return (
    <div class={styles.testContainer}>
      <Switch.Root isChecked={checked()} onCheckedChange={setChecked}>
        <Switch.Input />
        <Switch.Label>Test Switch</Switch.Label>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
      <span
        classList={{
          [styles.toggleLabel]: true,
          [styles.toggleChecked]: checked(),
          [styles.toggleUnchecked]: !checked(),
        }}
      >
        {checked() ? 'on' : 'off'}
      </span>
    </div>
  );
};
