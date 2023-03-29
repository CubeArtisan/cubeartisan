// for testing components
import { TestButton } from '@cubeartisan/cubeartisan/components/generic/Button/Button.testrender';
import { TestModal } from '@cubeartisan/cubeartisan/components/generic/Modal/Modal.testrender';
import { TestRadioGroup } from '@cubeartisan/cubeartisan/components/generic/RadioGroup/RadioGroup.testrender';
import { TestSwitch } from '@cubeartisan/cubeartisan/components/generic/Switch/Switch.testrender';
import { TestTextField } from '@cubeartisan/cubeartisan/components/generic/TextField/TextField.testrender';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/test.css';

const Test = () => (
  <main class={styles.testPage}>
    <div class={styles.testComponentBox}>
      <TestButton />
    </div>
    <div class={styles.testComponentBox}>
      <TestSwitch />
    </div>
    <div class={styles.testComponentBox}>
      <TestTextField />
    </div>
    <div class={styles.testComponentBox}>
      <TestRadioGroup />
    </div>
    <div class={styles.testComponentBox}>
      <TestModal />
    </div>
  </main>
);

export default Test;
