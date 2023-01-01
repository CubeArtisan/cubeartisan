import { Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { HStack } from '@cubeartisan/cubeartisan/components/Stack';

const SiteNavbar = () => {
  const user = createServerData$((_, { request }) => getUserFromRequest(request));

  // const handleLogin = () => {};
  // use <banner /> when including non-nav elements

  return (
    <HStack atoms={{ backgroundColor: 'neutralSubtleSecondary', color: 'neutralContrast' }}>
      <HStack
        as="header"
        atoms={{
          height: 16,
          width: 'content-80',
        }}
        recipe={{ justify: 'spaceBetween' }}
      >
        <HStack as="nav">
          <HStack as="ul" atoms={{ gap: 2 }}>
            <li>
              <A href="/">Home</A>
            </li>
            <li>
              <A href="/social">Social</A>
            </li>
            <li>
              <A href={`/${user()?._id}/cubes`}>Your Cubes</A>
            </li>
          </HStack>
        </HStack>
        <HStack as="ul" atoms={{ gap: 2 }}>
          <li>
            <button>Search</button>
          </li>
          <li>
            <button>New Cube</button>
          </li>
          <li>
            <button>Notifications</button>
          </li>
          <li>
            <Show when={user()} fallback={<span>Sign In</span>}>
              {(u) => <p>{u.username}</p>}
            </Show>
          </li>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default SiteNavbar;
