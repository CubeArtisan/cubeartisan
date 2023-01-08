import { CgMathPlus } from 'solid-icons/cg';
import { createSignal, Show } from 'solid-js';

import { Button } from '@cubeartisan/cubeartisan/components/Button';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
import { HStack, VStack } from '@cubeartisan/cubeartisan/components/Stack';
import { Switch } from '@cubeartisan/cubeartisan/components/Switch/Switch';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const NewCubeModal = () => {
  const [importSwitch, setImportSwitch] = createSignal(false);

  return (
    <Modal>
      <Modal.Trigger>
        <CgMathPlus class={atoms({ height: 8, width: 8, color: 'white' })} />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Title atoms={{ alignSelf: 'center' }}>New Cube</Modal.Title>

          <VStack as="label" recipe={{ justify: 'center' }}>
            Cube Name
            <artisan.input type="text" atoms={{ borderRadius: 'md' }} />
          </VStack>

          <VStack as="label" recipe={{ justify: 'center' }}>
            Visibility
            <HStack
              as="fieldset"
              nam="visibility"
              atoms={{ boxShadow: 'borderNeutralLarge', padding: 1, borderRadius: 'md' }}
              recipe={{ justify: 'spaceAround', align: 'center' }}
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

          <VStack as="label" recipe={{ justify: 'center' }}>
            <Switch isChecked={importSwitch()} onCheckedChange={setImportSwitch}>
              <Switch.Input />
              <Switch.Label>Import from list (optional)</Switch.Label>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
            <Show when={importSwitch()}>
              <HStack
                as="fieldset"
                name="import"
                atoms={{ boxShadow: 'borderNeutralLarge', padding: 1, borderRadius: 'md' }}
                recipe={{ justify: 'spaceAround', align: 'center' }}
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
          <HStack recipe={{ justify: 'spaceBetween', align: 'center' }}>
            <Button recipe={{ color: 'danger' }}>Cancel</Button>
            <Button recipe={{ color: 'success' }}>Create</Button>
          </HStack>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default NewCubeModal;
