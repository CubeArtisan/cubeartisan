import { CgMathPlus } from 'solid-icons/cg';
import { createSignal, Show } from 'solid-js';

import { Button } from '@cubeartisan/cubeartisan/components/Button';
import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
import { Switch } from '@cubeartisan/cubeartisan/components/Switch/Switch';
import * as styles from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/NewCubeModal.css';

const NewCubeModal = () => {
  const [importSwitch, setImportSwitch] = createSignal(false);

  return (
    <Modal>
      <Modal.Trigger>
        <CgMathPlus class={styles.triggerIcon} />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Title>New Cube</Modal.Title>

          <label as="label" class={styles.inputLabel}>
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
            <Switch isChecked={importSwitch()} onCheckedChange={setImportSwitch}>
              <Switch.Input />
              <Switch.Label>Import from list (optional)</Switch.Label>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
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
            <Button recipe={{ color: 'danger' }} isDisabled={true}>
              Cancel
            </Button>
            <Button recipe={{ color: 'success' }}>Create</Button>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default NewCubeModal;
