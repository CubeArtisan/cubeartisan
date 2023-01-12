// for testing components
import { For } from 'solid-js';

import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
// import { Center } from '@cubeartisan/cubeartisan/components/Center';
// import { TestModal } from '@cubeartisan/cubeartisan/components/Modal/Modal.testrender';
// import { TestRadioGroup } from '@cubeartisan/cubeartisan/components/RadioGroup/RadioGroup.testrender';
// import { VStack } from '@cubeartisan/cubeartisan/components/Stack';
// import { TestSwitch } from '@cubeartisan/cubeartisan/components/Switch/Switch.testrender';
import ContentPage from '@cubeartisan/cubeartisan/components/templates/ContentPage/ContentPage';
import * as styles from '@cubeartisan/cubeartisan/routes/(app)/test.css';

const renderList = [<TestButton />];
// const renderList = [<TestModal />, <TestRadioGroup />, <TestSwitch />, <TestButton />];

const Test = () => (
  <ContentPage>
    <For each={renderList}>{(testComponent) => <div class={styles.testComponentBox}>{testComponent}</div>}</For>
  </ContentPage>
);

export default Test;
