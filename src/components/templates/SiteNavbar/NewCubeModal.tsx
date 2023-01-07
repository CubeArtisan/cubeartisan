import { Dialog } from '@kobalte/core';
import { CgMathPlus } from 'solid-icons/cg';
import { createSignal, Show } from 'solid-js';

import { buttonRecipe } from '@cubeartisan/cubeartisan/components/Button';
import { HStack, VStack } from '@cubeartisan/cubeartisan/components/Stack';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const NewCubeModal = () => {
  const [importSwitch, setImportSwitch] = createSignal(false);

  return (
    <Dialog>
      <Dialog.Trigger class={buttonRecipe()}>
        <CgMathPlus class={atoms({ height: 8, width: 8, color: 'white' })} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          class={atoms({
            backgroundColor: 'shadowDark10',
            width: 'screenW',
            height: 'screenH',
            position: 'fixed',
            top: 0,
            left: 0,
          })}
        />
        <Dialog.Content
          as="section"
          class={atoms({
            position: 'absolute',
            paddingInline: 10,
            paddingBlock: 8,
            width: 'md',
            backgroundColor: 'neutralComponent',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            borderRadius: 'md',
            gap: 4,
          })}
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <VStack as="header">
            <Dialog.Title
              class={atoms({
                fontSize: '2xl',
                lineHeight: '2xl',
                fontWeight: 'semibold',
              })}
            >
              New Cube
            </Dialog.Title>
          </VStack>
          <VStack as="label" recipe={{ align: 'normal' }}>
            Cube Name
            <input type="text" />
          </VStack>
          <VStack as="label" recipe={{ align: 'normal' }}>
            Visibility
            <HStack
              as="fieldset"
              nam="visibility"
              atoms={{ boxShadow: 'borderNeutralLarge', padding: 1 }}
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default NewCubeModal;
