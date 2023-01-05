import { Dialog } from '@kobalte/core';
import { CgMathPlus } from 'solid-icons/cg';
import { createSignal, Show } from 'solid-js';

import { HStack, VStack } from '@cubeartisan/cubeartisan/components/Stack';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const NewCubeModal = () => {
  const [importSwitch, setImportSwitch] = createSignal(false);

  return (
    <Dialog>
      <Dialog.Trigger>
        <CgMathPlus class={atoms({ height: 8, width: 8, color: 'white' })} />
        Hello
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <VStack>
            <Dialog.Title>New Cube</Dialog.Title>
            <VStack as="label">
              Cube Name
              <input type="text" />
            </VStack>
            <VStack as="label">
              Visibility
              <HStack
                as="fieldset"
                nam="visibility"
                atoms={{ boxShadow: 'borderNeutralLarge', padding: 1, width: 'xs' }}
                recipe={{ justify: 'spaceAround' }}
              >
                <label>
                  <input type="radio" name="visibility" id="public" value="public" checked />
                  Public
                </label>
                <label>
                  <input type="radio" name="visibility" id="unlisted" value="unlisted" />
                  Unlisted
                </label>
                <label>
                  <input type="radio" name="visibility" id="private" value="private" />
                  Private
                </label>
              </HStack>
            </VStack>
            <VStack as="label" recipe={{ align: 'start' }}>
              <HStack recipe={{ justify: 'spaceBetween' }} atoms={{ width: 'xs' }}>
                Import Existing List (optional)
                <button type="button" onClick={() => setImportSwitch((prev) => !prev)}>
                  {importSwitch() ? 'true' : 'false'}
                </button>
              </HStack>
              <Show when={importSwitch()}>
                <HStack
                  as="fieldset"
                  name="import"
                  atoms={{ boxShadow: 'borderNeutralLarge', padding: 1, width: 'xs' }}
                  recipe={{ justify: 'spaceAround' }}
                >
                  <label>
                    <input type="radio" name="import" id="paste" value="paste" />
                    Paste Text
                  </label>
                  <label>
                    <input type="radio" name="import" id="file" value="file" />
                    From File
                  </label>
                  <label>
                    <input type="radio" name="import" id="url" value="url" />
                    From URL
                  </label>
                </HStack>
              </Show>
            </VStack>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default NewCubeModal;
