// for testing components
import { For } from 'solid-js';

import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
// import { TestModal } from '@cubeartisan/cubeartisan/components/Modal/Modal.testrender';
// import { TestRadioGroup } from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup.testrender';
// import { TestSwitch } from '@cubeartisan/cubeartisan/components/Switch/Switch.testrender';
import ContentPage from '@cubeartisan/cubeartisan/components/templates/ContentPage/ContentPage';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/test.css';

// const renderList = [<TestModal />, <TestRadioGroup />, <TestSwitch />, <TestButton />];

const Test = () => (
  <ContentPage>
    <div class={styles.testComponentBox}>
      <TestButton />
    </div>
  </ContentPage>
);

export default Test;
