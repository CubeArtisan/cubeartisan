import { CgMathPlus } from 'solid-icons/cg';
import { createSignal, For, Match, Show, Switch } from 'solid-js';
import { createServerAction$, redirect } from 'solid-start/server';

import { createCube } from '@cubeartisan/cubeartisan/backend/cubeUtils';
import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { Button, buttonRecipe } from '@cubeartisan/cubeartisan/components/generic/Button';
import { Modal } from '@cubeartisan/cubeartisan/components/generic/Modal';
import { RadioGroup } from '@cubeartisan/cubeartisan/components/generic/RadioGroup';
import { ControlledComposedSwitch } from '@cubeartisan/cubeartisan/components/generic/Switch';
import { TextField } from '@cubeartisan/cubeartisan/components/generic/TextField';
import * as styles from '@cubeartisan/cubeartisan/components/site/SiteNavbar/NewCubeModal.css';

const NewCubeModal = () => {
  const [, { Form }] = createServerAction$(async (formData: FormData, { request }) => {
    const cubeName = formData.get('name') as string;
    const user = await getUserFromRequest(request);
    const cube = await createCube(user!, cubeName);
    return redirect(`/cube/${cube.shortID}`);
  });

  const [importSwitch, setImportSwitch] = createSignal(false);
  const [importValue, setImportValue] = createSignal<'paste' | 'file' | 'url'>('paste');

  return (
    <Modal.Root>
      <Modal.Trigger>
        <CgMathPlus class={styles.triggerIcon} />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Form>
          <Modal.Content>
            <Modal.Title>New Cube</Modal.Title>

            <TextField.Root name="name">
              <TextField.Label>Cube Name</TextField.Label>
              <TextField.Input type="text" />
            </TextField.Root>

            <RadioGroup.Root defaultValue="public" name="visibility">
              <RadioGroup.Label>Visibilty</RadioGroup.Label>
              <RadioGroup.ItemsContainer>
                <RadioGroup.Item value="public">
                  <RadioGroup.ItemInput />
                  <RadioGroup.ItemLabel>Public</RadioGroup.ItemLabel>
                </RadioGroup.Item>
                <RadioGroup.ItemSeparator />
                <RadioGroup.Item value="unlisted">
                  <RadioGroup.ItemInput />
                  <RadioGroup.ItemLabel>Unlisted</RadioGroup.ItemLabel>
                </RadioGroup.Item>
                <RadioGroup.ItemSeparator />
                <RadioGroup.Item value="private">
                  <RadioGroup.ItemInput />
                  <RadioGroup.ItemLabel>Private</RadioGroup.ItemLabel>
                </RadioGroup.Item>
              </RadioGroup.ItemsContainer>
            </RadioGroup.Root>

            <div class={styles.importContainer}>
              <RadioGroup.Root value={importValue()} onValueChange={setImportValue}>
                <RadioGroup.Label>
                  <ControlledComposedSwitch
                    label="Import from list (optional)"
                    isChecked={importSwitch()}
                    onCheckedChange={setImportSwitch}
                  />
                </RadioGroup.Label>
                <Show when={importSwitch()}>
                  <RadioGroup.ItemsContainer>
                    <For
                      each={[
                        { id: 'paste', label: 'Paste Text' },
                        { id: 'file', label: 'From File' },
                        { id: 'url', label: 'From URL' },
                      ]}
                    >
                      {(item, index) => (
                        <>
                          <RadioGroup.Item value={item.id}>
                            <RadioGroup.ItemInput />
                            <RadioGroup.ItemLabel>{item.label}</RadioGroup.ItemLabel>
                          </RadioGroup.Item>
                          <Show when={index() + 1 !== 3}>
                            <RadioGroup.ItemSeparator />
                          </Show>
                        </>
                      )}
                    </For>
                  </RadioGroup.ItemsContainer>
                </Show>
              </RadioGroup.Root>

              <Show when={importSwitch()}>
                <Switch>
                  <Match when={importValue() === 'paste'}>
                    <textarea name="paste-text" />
                  </Match>
                  <Match when={importValue() === 'file'}>
                    <input name="import-file" type="file" />
                  </Match>
                  <Match when={importValue() === 'url'}>
                    <TextField.Root name="url">
                      <TextField.Input type="import-url" placeholder="url" />
                    </TextField.Root>
                  </Match>
                </Switch>
              </Show>
            </div>

            <div class={styles.buttonsContainer}>
              <Modal.CloseButton type="button" class={buttonRecipe({ color: 'danger', padding: 'baseText' })}>
                Cancel
              </Modal.CloseButton>
              {/* <Modal.CloseButton type="submit" class={buttonRecipe({ color: 'success', padding: 'baseText' })}>
                Create
              </Modal.CloseButton> */}

              <Button.Root type="submit" recipe={{ color: 'success', padding: 'baseText' }}>
                Create
              </Button.Root>
            </div>
          </Modal.Content>
        </Form>
      </Modal.Portal>
    </Modal.Root>
  );
};

export default NewCubeModal;
