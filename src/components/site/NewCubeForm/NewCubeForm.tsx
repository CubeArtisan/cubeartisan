import { createServerAction$, redirect } from 'solid-start/server';

import { createCube } from '@cubeartisan/cubeartisan/backend/cubeUtils';
import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { Button } from '@cubeartisan/cubeartisan/components/generic/Button';
import { TextField } from '@cubeartisan/cubeartisan/components/generic/TextField';
import * as styles from '@cubeartisan/cubeartisan/components/site/NewCubeForm/NewCubeForm.css';

export const NewCubeForm = () => {
  const [, { Form }] = createServerAction$(async (formData: FormData, { request }) => {
    const cubeName = formData.get('name') as string;
    const user = await getUserFromRequest(request);

    const cube = await createCube(user, cubeName);
    return redirect(`/cube/${cube.shortID}`);
  });

  return (
    <Form class={styles.formRoot}>
      <header class={styles.formHeader}>
        <img src="/images/cube-logo.svg" class={styles.cubeLogo} />
        <h2 class={styles.formTitle}>New Cube</h2>
      </header>

      <TextField.Root name="name">
        <TextField.Label>Cube Name</TextField.Label>
        <TextField.Input type="text" />
      </TextField.Root>

      <div class={styles.formButtons}>
        <Button.Root recipe={{ padding: 'baseText' }}>Cancel</Button.Root>
        <Button.Root recipe={{ color: 'success', padding: 'baseText' }}>Create</Button.Root>
      </div>
    </Form>
  );
};
