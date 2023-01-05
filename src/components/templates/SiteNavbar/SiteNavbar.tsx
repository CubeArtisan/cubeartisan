import { merge } from 'lodash';
import { CgBell, CgEnter, CgMathPlus, CgProfile, CgSearch } from 'solid-icons/cg';
import { createSignal, Show, splitProps } from 'solid-js';
import { A } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { Center } from '@cubeartisan/cubeartisan/components/Center';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import { HStack, VStack } from '@cubeartisan/cubeartisan/components/Stack';
import type { ArtisanParentComponent } from '@cubeartisan/cubeartisan/components/types';
import { atoms } from '@cubeartisan/cubeartisan/styles';

const NavIcon: ArtisanParentComponent<'div', null, { size: 'sm' | 'lg' }> = (props) => {
  const [local, others] = splitProps(props, ['atoms', 'size']);

  const sizes = {
    sm: 8,
    lg: 12,
  };

  return (
    <Center
      atoms={merge(
        {
          borderRadius: 'lg',
          height: sizes[props.size],
          width: sizes[props.size],
          backgroundColor: { hover: 'neutralComponentHover', active: 'neutralComponentActive' },
          boxShadow: {
            hover: 'borderNeutralInteractiveHoverLarge',
          },
        },
        local.atoms,
      )}
      {...others}
    />
  );
};

const SiteNavbar = () => {
  const user = createServerData$((_, { request }) => getUserFromRequest(request));

  return (
    <HStack atoms={{ backgroundColor: 'neutralSubtleSecondary', color: 'neutralContrast' }}>
      <HStack
        as="header"
        atoms={{
          height: 16,
          width: 'content-90',
        }}
        recipe={{ justify: 'spaceBetween' }}
      >
        <HStack as="nav">
          <HStack as="ul" atoms={{ gap: 8 }}>
            <artisan.li
              atoms={{
                backgroundColor: { hover: 'neutralComponentHover', active: 'neutralComponentActive' },
                boxShadow: {
                  hover: 'borderNeutralInteractiveHoverLarge',
                },
                borderRadius: 'md',
                paddingLeft: 1,
              }}
            >
              {/* href should be "/", made "/test" for ease of prototyping */}
              <A href="/test">
                <artisan.img
                  src="/images/stacked-logo.svg"
                  alt="CubeArtisan Logo"
                  atoms={{ height: 12, marginRight: 4 }}
                />
              </A>
            </artisan.li>
            <artisan.li
              atoms={{
                backgroundColor: { hover: 'neutralComponentHover', active: 'neutralComponentActive' },
                boxShadow: {
                  hover: 'borderNeutralInteractiveHoverLarge',
                },
                paddingInline: 2,
                paddingBlock: 1,
                borderRadius: 'md',
              }}
            >
              <A href="/">Home</A>
            </artisan.li>
            <artisan.li
              atoms={{
                backgroundColor: { hover: 'neutralComponentHover', active: 'neutralComponentActive' },
                boxShadow: {
                  hover: 'borderNeutralInteractiveHoverLarge',
                },
                paddingInline: 2,
                paddingBlock: 1,
                borderRadius: 'md',
              }}
            >
              <A href="/">Explore Cubes</A>
            </artisan.li>
            <Show when={user()}>
              {(u) => {
                <li>
                  <A id="your-cubes" href={`/user/${u.username}/cubes`}>
                    Your Cubes
                  </A>
                </li>;
              }}
            </Show>
          </HStack>
        </HStack>
        <HStack as="ul" atoms={{ gap: 4 }}>
          <li />
          <li />
          <Show when={user()}>
            <li>
              <NavIcon size="sm" as="button" atoms={{ color: 'neutralContrast' }}>
                <CgBell class={atoms({ height: 6, width: 6 })} />
              </NavIcon>
            </li>
            <li>
              <NavIcon size="lg" as="button" atoms={{ color: 'neutralContrast' }}>
                <CgProfile class={atoms({ height: 10, width: 10 })} />
              </NavIcon>
            </li>
          </Show>
        </HStack>
      </HStack>
    </HStack>
  );
};

export { SiteNavbar };
