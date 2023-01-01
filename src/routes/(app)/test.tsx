// for testing components
import type { ParentComponent } from 'solid-js';

import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
import { Center } from '@cubeartisan/cubeartisan/components/Center';
import { TestModal } from '@cubeartisan/cubeartisan/components/Modal/Modal.testrender';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';

const TestComponentBox: ParentComponent = (props) => (
  <Center
    atoms={{ minWidth: 'lg', minHeight: 'md', borderRadius: '2xl', backgroundColor: 'neutralSubtleSecondary' }}
    children={props.children}
  />
);

const Test = () => (
  <VStack style={{ 'min-height': 'calc(100vh - 4rem)' }} atoms={{ gap: 10, padding: 16 }}>
    <TestComponentBox children={<TestModal />} />
    <TestComponentBox children={<TestButton />} />
  </VStack>
);

export default Test;
