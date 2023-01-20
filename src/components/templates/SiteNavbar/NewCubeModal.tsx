import { CgMathPlus } from 'solid-icons/cg';
import { createSignal, Show } from 'solid-js';

import { Button } from '@cubeartisan/cubeartisan/components/Button';
import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
import { Switch } from '@cubeartisan/cubeartisan/components/Switch/';
import * as styles from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/NewCubeModal.css';

const NewCubeModal = () => {
  const [importSwitch, setImportSwitch] = createSignal(false);

  return (
    <Modal.Root>
      <Modal.Trigger>
        <CgMathPlus class={styles.triggerIcon} />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Title>New Cube</Modal.Title>

          <label class={styles.inputLabel}>
            Cube Name
            <input type="text" class={styles.textInputField} />
          </label>

          <label class={styles.inputLabel}>
            Visibility
            <fieldset name="visibility" class={styles.inputFieldset}>
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
            </fieldset>
          </label>

          <label class={styles.inputLabel}>
            <Switch.Root isChecked={importSwitch()} onCheckedChange={setImportSwitch}>
              <Switch.Input />
              <Switch.Label>Import from list (optional)</Switch.Label>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Root>
            <Show when={importSwitch()}>
              <fieldset name="import" class={styles.inputFieldset}>
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
              </fieldset>
            </Show>
          </label>
          <div class={styles.buttonsContainer}>
            <Button.Root recipe={{ color: 'danger' }} isDisabled={true}>
              Cancel
            </Button.Root>
            <Button.Root recipe={{ color: 'success' }}>Create</Button.Root>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};

export default NewCubeModal;
