// Form root => <form> element with styling options
// form field => accepts optional label and validation options
// form submit button => color, label, and maybe position? although that should probably always be bottom right
// title? maybe this is handled outside the form?
// TODO hover help icon that shows info text

import { Component, ParentComponent, Show } from 'solid-js';
import { createServerAction$ } from 'solid-start/server';

import { createUser } from '@cubeartisan/cubeartisan/backend/user';
import { atoms } from '@cubeartisan/cubeartisan/styles';

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

type FormProps = {
  action: string;
};

const MyForm: ParentComponent<FormProps> = (props) => {
  const [logging, { Form }] = createServerAction$(async (form: FormData, { request }) => {
    const username = form.get('username') as string;
    const password = form.get('password') as string;
    const email = form.get('email') as string;
    await createUser(username, password, email);
  });
  return (
    <Form action={props.action} method="post" class={atoms({ display: 'flex', flexDirection: 'column' })}>
      {props.children}
    </Form>
  );
};

export { MyForm as Root, FormTextInput as TextInput };
export type {};
