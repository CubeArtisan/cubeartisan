// for testing components
import type { ParentComponent } from 'solid-js';

import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
import { Center } from '@cubeartisan/cubeartisan/components/Center';
import { TestModal } from '@cubeartisan/cubeartisan/components/Modal/Modal.testrender';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';
import { TestSwitch } from '@cubeartisan/cubeartisan/components/Switch/Switch.testrender';

const TestComponentBox: ParentComponent = (props) => (
  <Center
