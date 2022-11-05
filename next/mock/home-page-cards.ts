interface HomePageCardsType {
  name: string;
  blurb: string;
  section: Array<{ thumbnail: string; caption: string; link: string }>;
}

const homePageCards: HomePageCardsType[] = [
  {
    name: 'Your Cubes',
    blurb: 'Pick up where you left off',
    section: [
      {
        thumbnail: 'https://cards.scryfall.io/art_crop/front/f/1/f1d9cfce-1507-4cdf-9d58-6ebaf44e72e3.jpg?1562557622',
        caption: 'Mortal Combat',
        link: '/cube/mortalcombat',
      },
      {
        thumbnail: 'https://cards.scryfall.io/art_crop/front/3/2/32865e68-5842-4f17-b2ea-4ffa743b511f.jpg?1562858255',
        caption: 'Intro Cube',
        link: '/cube/intro',
      },
      {
        thumbnail: 'https://cards.scryfall.io/art_crop/front/1/8/1825a719-1b2a-4af9-9cd2-7cb497cd0317.jpg?1662524843',
        caption: "jesseb34r's cube",
        link: '/cube/jesseb34r',
      },
    ],
  },
  {
    name: 'Followed Cubes',
    blurb: 'Latest from people you follow',
    section: [
      {
        thumbnail: 'https://cards.scryfall.io/art_crop/front/1/c/1c707e5b-c510-4aaa-a6f1-4ad244087ab3.jpg?1562051911',
        caption: 'good cars',
        link: '/cube/car',
      },
      {
        thumbnail:
          'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/b/0/b0e90b22-6f43-4e9a-a236-f33191768813.jpg?1562932337',
        caption: 'Unpowered Fair Stuff',
        link: '/cube/unpowered_fair_stuff',
      },
      {
        thumbnail:
          'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/7/2/726ce95b-bc4d-4c34-a8e1-b4c6c28accc9.jpg?1562778128',
        caption: 'Degenerate Micro Cube',
        link: '/cube/degenerate-micro-cube',
      },
    ],
  },
];

export default homePageCards;
