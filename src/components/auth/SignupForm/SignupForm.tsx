import { A } from 'solid-start';
import { createServerAction$, redirect } from 'solid-start/server';

import { createUser, getUserFromRequest, storage } from '@cubeartisan/cubeartisan/backend/user';
import * as styles from '@cubeartisan/cubeartisan/components/auth/AuthForm/authForms.css';
import { Button } from '@cubeartisan/cubeartisan/components/generic/Button';
import { TextField } from '@cubeartisan/cubeartisan/components/generic/TextField';

export const SignupFormTitle = () => (
  <div class={styles.formTitle}>
    <A href={'/'}>
      <img src="/images/master-icon.svg" alt="CubeArtisan Logo" class={styles.logo} />
    </A>
    Sign Up
  </div>
);

export const SignupForm = () => {
  const [, { Form }] = createServerAction$(async (formData: FormData, { request }) => {
    // redundant safeguard. signup button should never show if already logged in.
    if (await getUserFromRequest(request)) {
      throw new Error('Aleady Logged In');
    }

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;

    if (!username || !password || !email) {
      throw new Error('Please fill in all fields');
    }

    const user = await createUser(username, password, email);
    const session = await storage.getSession();
    session.set('userId', user._id);
    return redirect('/', {
      headers: {
        'Set-Cookie': await storage.commitSession(session),
      },
    });
  });

  return (
    <Form class={styles.formRoot}>
      <TextField.Root name="username">
        <TextField.Label>Username</TextField.Label>
        <TextField.Input placeholder="johndoe@email.com" type="email" />
        <TextField.Description>You can change this later</TextField.Description>
        <TextField.ErrorMessage>{/* put content here for different errors */}</TextField.ErrorMessage>
      </TextField.Root>
      <TextField.Root name="password">
        <TextField.Label>Password</TextField.Label>
        <TextField.Input type="password" />
        <TextField.ErrorMessage />
      </TextField.Root>
      <TextField.Root name="email">
        <TextField.Label>Email</TextField.Label>
        <TextField.Input type="email" />
        <TextField.Description>Used for verification only</TextField.Description>
        <TextField.ErrorMessage />
      </TextField.Root>
      {/* need error message for for submit as well */}
      <footer class={styles.footer}>
        <A href={'/login'} type="button" class={styles.buttonLink}>
          Log In Instead
        </A>
        <Button.Root type="submit" recipe={{ color: 'primary', padding: 'baseText' }}>
          Sign Up
        </Button.Root>
      </footer>
    </Form>
  );
};
