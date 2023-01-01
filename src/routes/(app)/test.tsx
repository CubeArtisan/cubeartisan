// for testing components
import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
import { TestModal } from '@cubeartisan/cubeartisan/components/Modal/Modal.testrender';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';

const Test = () => (
  <VStack>
    <TestModal />
    <TestButton />
  </VStack>
);

export default Test;
