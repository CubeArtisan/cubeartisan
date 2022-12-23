// Form root => <form> element with styling options
// form field => accepts optional label and validation options
// form submit button => color, label, and maybe position? although that should probably always be bottom right
// title? maybe this is handled outside the form?
// TODO hover help icon that shows info text

import { Component, Show } from 'solid-js';
import { createServerAction$, redirect } from 'solid-start/server';

import { createUser, getUserFromRequest, storage } from '@cubeartisan/cubeartisan/backend/user';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';

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

const MyForm: Component = () => {
  const [logging, { Form }] = createServerAction$(async (form: FormData, { request }) => {
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
    <Form>
      <artisan.div
        atoms={{
          height: 'screenH',
          width: 'screenW',
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VStack atoms={{ backgroundColor: 'neutralComponent', padding: 10, borderRadius: 'md' }}>
          <artisan.h1 atoms={{ text: '2xl', marginBottom: 4 }}>Sign Up</artisan.h1>
          <artisan.label for="username">Username</artisan.label>
          <artisan.input type="text" name="username" id="username" required style={{ color: 'black' }} />
          <artisan.label for="username">Email</artisan.label>
          <artisan.input type="email" name="email" id="email" required style={{ color: 'black' }} />
          <artisan.label for="password">Password</artisan.label>
          <artisan.input type="password" name="password" id="password" required style={{ color: 'black' }} />
          <artisan.button type="submit" value="submit">
            Sign Up
          </artisan.button>
          <artisan.span>{logging.error}</artisan.span>
        </VStack>
      </artisan.div>
    </Form>
  );
};

export { MyForm as Root, FormTextInput as TextInput };
