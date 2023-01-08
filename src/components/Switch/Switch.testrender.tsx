import { createSignal } from 'solid-js';

import artisan from '@cubeartisan/cubeartisan/components/factory';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';
import { Switch } from '@cubeartisan/cubeartisan/components/Switch/Switch';
import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';

export const TestSwitch = () => {
  const [checked, setChecked] = createSignal(false);

  return (
    <VStack atoms={{ gap: 4 }}>
      <Switch isChecked={checked()} onCheckedChange={setChecked}>
        <Switch.Input />
        <Switch.Label class={styles.switchLabel}>Test Switch</Switch.Label>
        <Switch.Control class={styles.switchControl}>
          <Switch.Thumb class={styles.switchThumb} />
        </Switch.Control>
      </Switch>
      <artisan.span
        atoms={{
          boxShadow: 'borderNeutral',
          borderRadius: 'md',
          paddingInline: 2,
          paddingBlock: 1,
          backgroundColor: 'neutralSolid',
        }}
      >
        {checked() ? 'on' : 'off'}
      </artisan.span>
    </VStack>
  );
};
