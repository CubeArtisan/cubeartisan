import { Component, For } from 'solid-js';
import { A } from 'solid-start';

import * as styles from '@cubeartisan/cubeartisan/layouts/site/SiteFooter/SiteFooter.css';

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

export const SiteFooter: Component = () => (
  <footer class={styles.footerContainer}>
    <div class={styles.footer}>
      <For each={footerSections}>
        {(section) => (
          <section>
            <h2 class={styles.sectionTitle}>{section.name}</h2>
            <ul>
              <For each={section.items}>
                {(item) => (
                  <li class={styles.sectionItems}>
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
