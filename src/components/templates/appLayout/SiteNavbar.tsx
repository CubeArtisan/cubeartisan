import { createSignal, For, Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';
import artisan from '@cubeartisan/cubeartisan/components/factory';
import { Modal } from '@cubeartisan/cubeartisan/components/Modal';
import { HStack, VStack } from '@cubeartisan/cubeartisan/components/Stack';

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
            <li>
              <artisan.img
                src="/images/stacked-logo.svg"
                alt="CubeArtisan Logo"
                atoms={{ height: 12, marginRight: 4 }}
              />
            </li>
            <li>
              <A href="/">Home</A>
            </li>
            <li>
              <A href="/explore">Explore Cubes</A>
            </li>
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
                  <button onClick={() => setIsOpen(true)}>Search</button>
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
                  <button onClick={() => setIsOpen(true)}>New Cube</button>
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
