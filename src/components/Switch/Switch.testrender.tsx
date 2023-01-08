import { Switch } from '@cubeartisan/cubeartisan/components/Switch/Switch';
import * as styles from '@cubeartisan/cubeartisan/components/Switch/Switch.css';

export const TestSwitch = () => (
  <Switch>
    <Switch.Input />
    <Switch.Label class={styles.switchLabel}>Test Switch</Switch.Label>
    <Switch.Control class={styles.switchControl}>
      <Switch.Thumb class={styles.switchThumb} />
    </Switch.Control>
  </Switch>
);
