import { merge } from 'lodash';
import { CgBell, CgMathPlus, CgProfile, CgSearch } from 'solid-icons/cg';
import { createSignal, Show, splitProps } from 'solid-js';
import { A } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import { Center } from '@cubeartisan/cubeartisan/components/Center';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
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
          borderRadius: 'full',
          backgroundColor: { hover: 'neutralComponentHover', active: 'neutralComponentActive' },
          height: sizes[props.size],
          width: sizes[props.size],
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
                paddingInline: 2,
                paddingBlock: 1,
                borderRadius: 'md',
              }}
            >
              <A href="/">Home</A>
            </artisan.li>
            <artisan.li atoms={{ textDecoration: { hover: 'underline solid' } }}>
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
          <li>
            {() => {
              const [isOpen, setIsOpen] = createSignal(false);
              return (
                <>
                  <NavIcon size="sm" as="button" onClick={() => setIsOpen(true)}>
                    <CgSearch class={atoms({ height: 6, width: 6 })} />
                  </NavIcon>
                  <Modal isOpen={isOpen()} onOverlayClick={setIsOpen(false)} title="Search" atoms={{ width: 'xl' }}>
                    <input type="search" placeholder="type here..." />
                  </Modal>
                </>
              );
            }}
          </li>
          <li>
            {() => {
              const [isOpen, setIsOpen] = createSignal(false);
              const [importSwitch, setImportSwitch] = createSignal(false);
              return (
                <>
                  <NavIcon size="sm" as="button" onClick={() => setIsOpen(true)}>
                    <CgMathPlus class={atoms({ height: 8, width: 8 })} />
                  </NavIcon>
                  <Modal
                    isOpen={isOpen()}
                    onOverlayClick={setIsOpen(false)}
                    title="New Cube"
                    atoms={{ minWidth: 'md' }}
                  >
                    <VStack as="form" atoms={{ gap: 4, marginTop: 4 }}>
                      <VStack as="label" recipe={{ align: 'start' }}>
                        Cube Name
                        <input id="name" name="name" required type="text" placeholder="interesting name" />
                      </VStack>
                      <VStack as="label" recipe={{ align: 'start' }}>
                        Visibility
                        <HStack
                          as="fieldset"
                          name="visibility"
                          atoms={{ boxShadow: 'borderNeutralLarge', padding: 1, width: 'xs' }}
                          recipe={{ justify: 'spaceAround' }}
                        >
                          <label>
                            <input type="radio" name="visibility" id="public" value="public" checked />
                            Public
                          </label>
                          <label>
                            <input type="radio" name="visibility" id="unlisted" value="unlisted" />
                            Unlisted
                          </label>
                          <label>
                            <input type="radio" name="visibility" id="private" value="private" />
                            Private
                          </label>
                        </HStack>
                      </VStack>
                      <VStack as="label" recipe={{ align: 'start' }}>
                        <HStack recipe={{ justify: 'spaceBetween' }} atoms={{ width: 'xs' }}>
                          Import Existing List (optional)
                          <button type="button" onClick={() => setImportSwitch((prev) => !prev)}>
                            {importSwitch() ? 'true' : 'false'}
                          </button>
                        </HStack>
                        <Show when={importSwitch()}>
                          <HStack
                            as="fieldset"
                            name="import"
                            atoms={{ boxShadow: 'borderNeutralLarge', padding: 1, width: 'xs' }}
                            recipe={{ justify: 'spaceAround' }}
                          >
                            <label>
                              <input type="radio" name="import" id="paste" value="paste" />
                              Paste Text
                            </label>
                            <label>
                              <input type="radio" name="import" id="file" value="file" />
                              From File
                            </label>
                            <label>
                              <input type="radio" name="import" id="url" value="url" />
                              From URL
                            </label>
                          </HStack>
                        </Show>
                      </VStack>
                    </VStack>
                  </Modal>
                </>
              );
            }}
          </li>
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
        </HStack>
      </HStack>
    </HStack>
  );
};

export default SiteNavbar;
