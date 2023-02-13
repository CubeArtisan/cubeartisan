// for testing components
import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
import { TestModal } from '@cubeartisan/cubeartisan/components/Modal/Modal.testrender';
import { TestRadioGroup } from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup.testrender';
import { TestSwitch } from '@cubeartisan/cubeartisan/components/Switch/Switch.testrender';
import ContentPage from '@cubeartisan/cubeartisan/components/templates/ContentPage/ContentPage';
import { TestTextField } from '@cubeartisan/cubeartisan/components/TextField/TextField.testrender';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/test.css';

const Test = () => (
  <ContentPage class={styles.testPage}>
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
  </ContentPage>
);

export default Test;
