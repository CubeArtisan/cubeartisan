import { Switch as KSwitch } from '@kobalte/core';
import { createSignal } from 'solid-js';

import { Switch } from '@cubeartisan/cubeartisan/components/Switch/';
import * as kstyles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';
import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.testrender.css';

export const TestSwitch = () => {
  const [checked, setChecked] = createSignal(false);

  return (
    <>
      <Switch.Root isChecked={checked()} onCheckedChange={setChecked}>
        <Switch.Input />
        <Switch.Label>Test Switch</Switch.Label>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
      <KSwitch.Root isChecked={checked()} onCheckedChange={setChecked} class={kstyles.switchRoot}>
        <KSwitch.Input />
        <KSwitch.Label class={kstyles.switchLabel}>Test KSwitch</KSwitch.Label>
        <KSwitch.Control class={kstyles.switchControl}>
          <KSwitch.Thumb class={kstyles.switchThumb} />
        </KSwitch.Control>
      </KSwitch.Root>
      <span class={styles.toggleLabel}>{checked() ? 'on' : 'off'}</span>
    </>
  );
};
