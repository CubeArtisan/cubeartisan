// for testing components
import { createServerAction$, redirect } from 'solid-start/server';

import { storage } from '@cubeartisan/cubeartisan/backend/user';
import { Button } from '@cubeartisan/cubeartisan/components/Button';
import { TestButton } from '@cubeartisan/cubeartisan/components/Button/Button.testrender';
import { Modal } from '@cubeartisan/cubeartisan/components/Modal/Modal';
import { VStack } from '@cubeartisan/cubeartisan/components/Stack';

const Test = () => (
  // const [logging, signOut] = createServerAction$(async (_, { request }) => {
  //   const session = await storage.getSession(request.headers.get('Cookie'));
  //   return redirect('/login', {
  //     headers: {
  //       'Set-Cookie': await storage.destroySession(session),
  //     },
  //   });
  // });

  <VStack atoms={{ width: 'screenW', height: 'screenH', placeItems: 'center' }}>
    <Modal />
    {/* <Button onClick={() => signOut('')} recipe={{ color: 'neutral', size: 'md' }}>
        Sign Out
      </Button> */}
  </VStack>
);
export default Test;

// <VStack atoms={{ width: 'screenW', height: 'screenH', placeItems: 'center' }}>
//   <Modal />
// </VStack>
