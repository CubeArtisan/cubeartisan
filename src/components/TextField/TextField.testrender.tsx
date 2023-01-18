import { createSignal } from 'solid-js';

import { TextField } from '@cubeartisan/cubeartisan/components/TextField';

export const TestTextField = () => {
  const [value, setValue] = createSignal<string>();
  const validPattern = /[^a-zA-Z0-9_-]/;

  return (
    <TextField.Root
      value={value()}
      onValueChange={setValue}
      validationState={validPattern.test(value()) ? 'invalid' : 'valid'}
    >
      <TextField.Label>Username</TextField.Label>
      <TextField.Input placeholder="degenerate_cuber" />
      <TextField.Description>You can change this later</TextField.Description>
      <TextField.ErrorMessage>Use only alphanumeric characters, underscores, and dashes</TextField.ErrorMessage>
    </TextField.Root>
  );
};
