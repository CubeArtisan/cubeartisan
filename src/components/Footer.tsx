import { Component, For } from 'solid-js';
import { A } from 'solid-start';

import { atoms } from '@cubeartisan/cubeartisan/styles';

type FooterSectionContent = {
  name: string;
  items: { linkName: string; url: string }[];
};

const socialsSection: FooterSectionContent = {
  name: 'Social Media',
  items: [
    { linkName: 'Discord', url: 'https://discord.gg/xjepapKecw' },
    { linkName: 'GitHub', url: 'https://github.com/CubeArtisan/cubeartisan' },
    { linkName: 'Patreon', url: '' },
    { linkName: 'Twitter', url: '' },
  ],
};

const navSection: FooterSectionContent = {
  name: 'Navigation',
  items: [
    { linkName: 'Home', url: '/' },
    { linkName: 'Social', url: '/social' },
    { linkName: 'Your Cubes', url: '/currentuser/cubes' },
    { linkName: 'Profile', url: '/currentuser' },
  ],
};

const helpSection: FooterSectionContent = {
  name: 'Help',
  items: [
    { linkName: 'Help Docs', url: '' },
    { linkName: 'Dev Blog', url: '' },
    { linkName: 'Contact Us', url: '' },
  ],
};

const footerSections: FooterSectionContent[] = [socialsSection, navSection, helpSection];

const SiteFooter: Component = () => (
  <footer
    class={atoms({
      width: 'full',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: 'neutralSubtleSecondary',
    })}
  >
    <div
      class={atoms({
        display: 'flex',
        alignItems: 'flexStart',
        justifyContent: 'spaceBetween',
        width: 'content-80',
        paddingBlock: 8,
      })}
    >
      <For each={footerSections}>
        {(section) => (
          <section>
            <h2
              class={atoms({
                text: 'base',
                textAlign: 'center',
                marginBottom: 1,
                cursor: 'default',
              })}
            >
              {section.name}
            </h2>
            <ul>
              <For each={section.items}>
                {(item) => (
                  <li
                    class={atoms({
                      text: 'base',
                      textAlign: 'center',
                      color: { default: 'neutralLowContrast', hover: 'neutralContrast' },
                    })}
                  >
                    <A href={item.url}>{item.linkName}</A>
                  </li>
                )}
              </For>
            </ul>
          </section>
        )}
      </For>
    </div>
  </footer>
);

export default SiteFooter;
