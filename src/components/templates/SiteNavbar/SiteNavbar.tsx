import { merge } from 'lodash';
import { CgBell, CgProfile } from 'solid-icons/cg';
import { Show, splitProps } from 'solid-js';
import { A } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getClientUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { Center } from '@cubeartisan/cubeartisan/components/Center';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import { HStack } from '@cubeartisan/cubeartisan/components/Stack';
import NewCubeModal from '@cubeartisan/cubeartisan/components/templates/SiteNavbar/NewCubeModal';
import type { AddProps } from '@cubeartisan/cubeartisan/components/types';
import { atoms } from '@cubeartisan/cubeartisan/styles';
import type { ProtectedUser } from '@cubeartisan/cubeartisan/types/user';

const sizes = {
  sm: 8,
  lg: 12,
};

const NavIcon: AddProps<typeof Center, { size: keyof typeof sizes }> = (props: any) => {
  const [local, others] = splitProps(props, ['atoms', 'size']);

  return (
    <Center
      atoms={merge(
        {
          borderRadius: 'lg',
          height: sizes[props.size as keyof typeof sizes],
          width: sizes[props.size as keyof typeof sizes],
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
  const user = createServerData$((_, { request }) => getClientUserFromRequest(request));

  return (
    <HStack
      atoms={{ backgroundColor: 'neutralSubtleSecondary', color: 'neutralContrast' }}
      recipe={{ align: 'center', justify: 'center' }}
    >
      <HStack
        as="header"
        atoms={{
          height: 16,
          width: 'content-90',
        }}
        recipe={{ justify: 'spaceBetween', align: 'center' }}
      >
        <HStack<"nav"> as="nav" recipe={{ justify: 'center', align: 'center' }}>
          <HStack<"ul"> as="ul" atoms={{ gap: 8 }} recipe={{ justify: 'center', align: 'center' }}>
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
                borderRadius: 'md',
                paddingInline: 2,
                paddingBlock: 1,
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
                borderRadius: 'md',
                paddingInline: 2,
                paddingBlock: 1,
              }}
            >
              <A href="/">Explore Cubes</A>
            </artisan.li>
            <Show keyed when={user()}>
              {(u: ProtectedUser) => (
                <li>
                  <A id="your-cubes" href={`/user/${u.username}/cubes`}>
                    Your Cubes
                  </A>
                </li>
              )}
            </Show>
          </HStack>
        </HStack>
        <HStack as="ul" atoms={{ gap: 4 }} recipe={{ justify: 'center', align: 'center' }}>
          <li>
            <NewCubeModal />
          </li>
          <li />
          <Show when={user()} keyed>
            {(u: ProtectedUser) => (
              <>
                <li>
                  <NavIcon<'button'> size="sm" as="button" atoms={{ color: 'neutralContrast' }}>
                    <CgBell class={atoms({ height: 6, width: 6 })} />
                  </NavIcon>
                </li>
                <li>
                  <NavIcon<typeof A> size="lg" as={A} atoms={{ color: 'neutralContrast' }} href={`/user/${u.username}`}>
                    <CgProfile class={atoms({ height: 10, width: 10 })} />
                  </NavIcon>
                </li>
              </>
            )}
          </Show>
        </HStack>
      </HStack>
    </HStack>
  );
};

export { SiteNavbar };
