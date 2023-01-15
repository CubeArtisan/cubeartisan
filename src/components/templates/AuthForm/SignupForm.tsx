import { createServerAction$ } from 'solid-start/server';

import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';

const SignupForm = () => {
  const [, { Form }] = createServerAction$(async (form: FormData, { request }) => {
    if (await getUserFromRequest(request)) {
      throw new Error('Already Logged In');
    }
  });

  return (
    <Form>
      <h2>Sign Up</h2>
      <label>
        username
        <input type="text" />
      </label>
      <label>
        password
        <input type="password" />
      </label>
      <div>
        <button>Log in instead</button>
        <button>Next</button>
      </div>
    </Form>
  );
};
export default SignupForm;
