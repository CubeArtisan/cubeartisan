import { Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const SiteNavbar = () => {
  const user = createServerData$((_, { request }) => getUserFromRequest(request));

  // const handleLogin = () => {};
  // use <banner /> when including non-nav elements

  return (
    <artisan.nav
      atoms={{
        height: 12,
        width: 'full',
        backgroundColor: 'neutralSubtleSecondary',
        color: 'neutralContrast',
      }}
    >
      <div
        class={atoms({
          display: 'flex',
          justifyContent: 'spaceBetween',
          height: 'full',
          fontSize: 'base',
          marginInline: 'auto',
          width: 'content-80',
        })}
      >
        <ul
          class={atoms({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'spaceBetween',
            gap: 3,
          })}
        >
          <li>
            <A href="/">Home</A>
          </li>
          <li>
            <A href="/social">Social</A>
          </li>
          <li>
            <A href={`/${user()?._id}/cubes`}>Your Cubes</A>
          </li>
        </ul>
        <ul
          class={atoms({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'spaceBetween',
            gap: 3,
          })}
        >
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
        </ul>
      </div>
    </artisan.nav>
  );
};

export default SiteNavbar;
