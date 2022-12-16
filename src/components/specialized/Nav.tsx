import { A } from 'solid-start';

import { atoms } from '@cubeartisan/cubeartisan/styles';

const SiteNavbar = () => {
  const userid = '';

  // const handleLogin = () => {};

  return (
    <nav
      class={atoms({
        height: 12,
        width: 'full',
        backgroundColor: 'neutralSubtleSecondary',
        color: 'neutralContrast',
      })}
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
            <A href={`/${userid}/cubes`}>Your Cubes</A>
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
            <button>Sign In</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SiteNavbar;
