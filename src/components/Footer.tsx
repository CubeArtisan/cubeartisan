import { For } from 'solid-js';
import { A } from 'solid-start';

type FooterSection = {
  name: string;
  items: { linkName: string; url: string }[];
};

const socialsSection: FooterSection = {
  name: 'Social Media',
  items: [
    { linkName: 'Discord', url: 'https://discord.gg/xjepapKecw' },
    { linkName: 'GitHub', url: 'https://github.com/CubeArtisan/cubeartisan' },
    { linkName: 'Patreon', url: '' },
    { linkName: 'Twitter', url: '' },
  ],
};

const navSection: FooterSection = {
  name: 'Navigation',
  items: [
    { linkName: 'Home', url: '/' },
    { linkName: 'Social', url: '/social' },
    { linkName: 'Your Cubes', url: '/currentuser/cubes' },
    { linkName: 'Profile', url: '/currentuser' },
  ],
};

const helpSection: FooterSection = {
  name: 'Help',
  items: [
    { linkName: 'Help Docs', url: '' },
    { linkName: 'Dev Blog', url: '' },
    { linkName: 'Contact Us', url: '' },
  ],
};

const footerSections: FooterSection[] = [socialsSection, navSection, helpSection];

const SiteFooter = () => (
  <footer>
    <For each={footerSections}>
      {(section) => (
        <section>
          <h2>{section.name}</h2>
          <ul>
            <For each={section.items}>
              {(item) => (
                <li>
                  <A href={item.url}>{item.linkName}</A>
                </li>
              )}
            </For>
          </ul>
        </section>
      )}
    </For>
  </footer>
);

export default SiteFooter;
