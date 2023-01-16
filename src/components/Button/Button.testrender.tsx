import { Button } from '@cubeartisan/cubeartisan/components/Button/';
import * as styles from '@cubeartisan/cubeartisan/components/Button/Button.testrender.css';

export const TestButton = () => (
  <div class={styles.testButtonContainer}>
    <div class={styles.testButtonRow}>
      <Button.Root recipe={{ color: 'neutral' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'primary' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'success' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'info' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'warning' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'danger' }} class={styles.testButton}>
        Test
      </Button.Root>
    </div>
    <div class={styles.testButtonRow}>
      <Button.Root recipe={{ color: 'neutral' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'primary' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'success' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'info' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'warning' }} class={styles.testButton}>
        Test
      </Button.Root>
      <Button.Root recipe={{ color: 'danger' }} class={styles.testButton}>
        Test
      </Button.Root>
    </div>
  </div>
);
