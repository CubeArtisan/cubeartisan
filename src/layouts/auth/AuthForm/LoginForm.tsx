import { Link } from '@kobalte/core';
import { A } from 'solid-start';
import { createServerAction$, redirect } from 'solid-start/server';

import { getUserFromRequest, storage, verifyUser } from '@cubeartisan/cubeartisan/backend/user';
import { Button } from '@cubeartisan/cubeartisan/components/Button';
import { TextField } from '@cubeartisan/cubeartisan/components/TextField';
import * as styles from '@cubeartisan/cubeartisan/layouts/auth/AuthForm/authForms.css';

export const LoginFormTitle = () => (
  <div class={styles.formTitle}>
    <Link.Root as={A} href={'/'} preventFocusOnPress={true}>
      <img src="/images/master-icon.svg" alt="CubeArtisan Logo" class={styles.logo} />
    </Link.Root>
    Log In
  </div>
);

export const LoginForm = () => {
  const [, { Form }] = createServerAction$(async (formData: FormData, { request }) => {
    // redundant safeguard. login button should never show if already logged in.
    if (await getUserFromRequest(request)) {
      throw new Error('Aleady Logged In');
    }

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      throw new Error('Please fill in all fields');
    }

    const user = await verifyUser(username, password);
    if (!user) {
      throw new Error('Incorrect username or password. Please try again.');
    } else {
      const session = await storage.getSession();
      session.set('userId', user._id);
      return redirect('/', {
        headers: {
          'Set-Cookie': await storage.commitSession(session),
        },
      });
    }
  });

  return (
    <Form class={styles.formRoot}>
      <TextField.Root name="username">
        <TextField.Label>Username or Email</TextField.Label>
        <TextField.Input placeholder="johndoe@email.com" type="text" />
        <TextField.ErrorMessage>{/* put content here for different errors */}</TextField.ErrorMessage>
      </TextField.Root>
      <TextField.Root name="password">
        <TextField.Label>Password</TextField.Label>
        <TextField.Input type="password" />
        <TextField.ErrorMessage />
      </TextField.Root>
      {/* need error message for for submit as well */}
      <footer class={styles.footer}>
        <Link.Root as={A} href={'/signup'} type="button" class={styles.buttonLink}>
          Sign Up Instead
        </Link.Root>
        <Button.Root type="submit" recipe={{ color: 'primary', padding: 'baseText' }}>
          Log In
        </Button.Root>
      </footer>
    </Form>
  );
};
