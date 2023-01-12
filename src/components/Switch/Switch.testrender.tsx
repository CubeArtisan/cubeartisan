import { createSignal } from 'solid-js';

import { Switch } from '@cubeartisan/cubeartisan/components/Switch/Switch';
import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.testrender.css';

export const TestSwitch = () => {
  const [checked, setChecked] = createSignal(false);

  return (
    <>
      <Switch isChecked={checked()} onCheckedChange={setChecked}>
        <Switch.Input />
        <Switch.Label class={styles.switchLabel}>Test Switch</Switch.Label>
        <Switch.Control class={styles.switchControl}>
          <Switch.Thumb class={styles.switchThumb} />
        </Switch.Control>
      </Switch>
      <span class={styles.toggleLabel}>{checked() ? 'on' : 'off'}</span>
    </>
  );
};
