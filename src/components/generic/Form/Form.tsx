// Form root => <form> element with styling options
// form field => accepts optional label and validation options
// form submit button => color, label, and maybe position? although that should probably always be bottom right
// title? maybe this is handled outside the form?
// TODO hover help icon that shows info text

import { Component, Show } from 'solid-js';
import { createServerAction$, redirect } from 'solid-start/server';

import { createUser, getUserFromRequest, storage } from '@cubeartisan/cubeartisan/backend/user';
import * as styles from '@cubeartisan/cubeartisan/components/generic/Form/Form.css';

type FormTextInputProps = {
  label?: string;
  type: '';
  name: string;
  id: string;
};

const FormTextInput: Component<FormTextInputProps> = (props) => (
  <>
    <Show when={!!props.label}>
      <label for={props.name} />
    </Show>
    <input type={props.type} id={props.id} name={props.name} />
  </>
);

const ArtisanForm: Component = () => {
  const [, { Form }] = createServerAction$(async (form: FormData, { request }) => {
    if (await getUserFromRequest(request)) {
      throw new Error('Already Logged In');
    }

    const username = form.get('username') as string;
    const password = form.get('password') as string;
    const email = form.get('email') as string;

    if (!username || !password || !email) {
      throw new Error('invalid input');
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
    <Form class={styles.form}>
      <h2 class={styles.formTitle}>Sign Up</h2>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" required />
      <label for="username">Email</label>
      <input type="email" name="email" id="email" required />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required />
      <button type="submit" value="submit">
        Sign Up
      </button>
    </Form>
  );
};
export { ArtisanForm, FormTextInput as TextInput };
