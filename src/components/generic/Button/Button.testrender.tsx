import { Button } from '@cubeartisan/cubeartisan/components/generic/Button';
import * as styles from '@cubeartisan/cubeartisan/components/generic/Button/Button.testrender.css';

export const TestButton = () => (
  <div class={styles.testButtonContainer}>
    <div class={styles.testButtonRow}>
      <Button.Root recipe={{ color: 'neutral', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'primary', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'success', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'info', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'warning', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'danger', padding: 'baseText' }}>Test</Button.Root>
    </div>
    <div class={styles.testButtonRow}>
      <Button.Root recipe={{ color: 'neutral', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'primary', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'success', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'info', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'warning', padding: 'baseText' }}>Test</Button.Root>
      <Button.Root recipe={{ color: 'danger', padding: 'baseText' }}>Test</Button.Root>
    </div>
  </div>
);
