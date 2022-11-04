// eslint-disable-next-line import/no-extraneous-dependencies
import carddb from '@cubeartisan/server/serverjs/cards.js';

import cubefixture from '@cubeartisan/client/__tests__/fixtures/examplecube.js';
import { createDraft, getDraftFormat } from '@cubeartisan/client/drafting/createdraft.js';
import { makeFilter } from '@cubeartisan/client/filtering/FilterCards.js';

describe('getDraftFormat', () => {
  let exampleCube;

  it('returns the default format if params are < 0', () => {
    const params = {
      id: -1,
      seats: 4,
      packs: 3,
      cards: 2,
    };
    const format = getDraftFormat(params, exampleCube);
    const expectedFormat = [
      ['*', '*'], // pack 1 (* is any card)
      ['*', '*'], // pack 2
      ['*', '*'], // pack 3
    ];
    expectedFormat.custom = false;
    expectedFormat.multiples = false;

    expect(format).toEqual(expectedFormat);
    expect(format.custom).toBe(false);
    expect(format.multiples).toBe(false);
  });

  describe('returns a custom format if params are > 0', () => {
    let params;
    beforeAll(() => {
      params = { id: 0, seats: 8 }; // packs and cards determined by custom format
      exampleCube = {};
      exampleCube.draft_formats = [];
      exampleCube.draft_formats[0] = {}; // mock
    });

    const expectedFilters = (...args) => {
      const expectedFormat = [];
      args.forEach((filterText) => {
        if (filterText !== null) {
          ({ filter: filterText } = makeFilter(filterText));
        }
        expectedFormat.push([filterText]);
      });
      return { sealed: false, trash: 0, filters: expectedFormat };
    };

    describe.each([
      [
        'example filters - 1 pack, 1 card',
        '[{ sealed: false, trash: 0, filters: ["rarity:Mythic,tag:New,identity>1"] }]', // filter JSON
        false, // multiples
        [[expectedFilters('rarity:Mythic', 'tag:New', 'identity>1')]],
      ],
      [
        'example filters - 1 pack, 2 cards, allow multiples',
        '[{ sealed: false, trash: 0, filters: ["rarity:Mythic,tag:New,identity>1", "tag:mytag"] }]', // filter JSON
        true, // multiples
        [[expectedFilters('rarity:Mythic', 'tag:New', 'identity>1'), expectedFilters('tag:mytag')]],
      ],
      [
        'backwards compatible tags',
        '[{ sealed: false, trash: 0, filters: { ["mytag,*,*"] }]', // filter JSON
        false, // multiples
        [[expectedFilters('tag:mytag', null, null)]],
      ],
      [
        'mixed filters and tags with multiple packs with different card counts',
        '[{ sealed: false, trash: 0, filters: ["rarity:Mythic,mytag"] }, { sealed: false, trash: 0, filters: ["*"] }, { sealed: false, trash: 0, filters: ["rarity:mythic,rarity:common","*"] }]', // filter JSON
        false, // multiples
        [
          [expectedFilters('rarity:Mythic', 'tag:mytag')], // pack 1
          [[[null]]], // pack 2
          [expectedFilters('rarity:Mythic', 'rarity:common'), [[null]]], // pack 3
        ],
      ],
    ])('%s', (_, packsFormat, multiples, expected) => {
      test(`returns expected format`, () => {
        exampleCube.draft_formats[params.id].packs = packsFormat;
        exampleCube.draft_formats[params.id].multiples = multiples;
        // NOTE: Because format array als incudes properties (which we aren't testing in this test)
        // we need to convert to json to compare safely.
        // See https://github.com/facebook/jest/issues/8475
        const formatJSON = JSON.stringify(getDraftFormat(params, exampleCube));
        const expectedJSON = JSON.stringify(expected);
        expect(formatJSON).toEqual(expectedJSON);
      });

      test(`returned has correct multiples value`, () => {
        exampleCube.draft_formats[params.id].packs = packsFormat;
        exampleCube.draft_formats[params.id].multiples = multiples;
        expect(getDraftFormat(params, exampleCube).multiples).toEqual(multiples);
      });

      test(`returned format is marked as custom`, () => {
        exampleCube.draft_formats[params.id].packs = packsFormat;
        exampleCube.draft_formats[params.id].multiples = multiples;
        expect(getDraftFormat(params, exampleCube).custom).toEqual(true);
      });
    });
  });
});

describe('createDraft', () => {
  let draft;
  let format;
  let cards;
  let seats;
  beforeAll(() => {
    draft = {};
    format = [];
    cards = [];
    seats = 8;
  });

  it('returns an error if no cards supplied', () => {
    cards = [];
    expect(() => {
      createDraft(format, cards, seats, { username: 'user', _id: 0 });
    }).toThrow(/no cards/);
  });

  it('returns an error if no bots supplied', () => {
    cards = ['mockcard'];
    expect(() => {
      createDraft(format, cards, seats, { username: 'user', _id: 0 });
    }).toThrow(/no bots/);
  });

  it('returns an error if seats < 2', () => {
    cards = ['mockcards'];
    expect(() => {
      createDraft(format, cards, 1, { username: 'user', _id: 0 });
    }).toThrow(/invalid seats/);
    expect(() => {
      createDraft(format, cards, null, { username: 'user', _id: 0 });
    }).toThrow(/invalid seats/);
    expect(() => {
      createDraft(format, cards, -1, { username: 'user', _id: 0 });
    }).toThrow(/invalid seats/);
  });

  describe('', () => {
    let exampleCube;
    beforeAll(async () => {
      exampleCube = JSON.parse(JSON.stringify(cubefixture.exampleCube));
      exampleCube.draft_formats = [];
      exampleCube.draft_formats[0] = {}; // mock
      await carddb.initializeCardDb('__tests__/fixtures', true);
      exampleCube.cards.forEach((card) => {
        card.details = carddb.cardFromId(card.cardID);
      });
    });

    it('sets the intitial state of the draft', () => {
      cards = exampleCube.cards.slice();
      format = getDraftFormat({ id: -1, packs: 1, cards: 15, seats }, exampleCube);
      createDraft(format, cards, 8, { username: 'user', _id: 0 });
      expect(draft.pickNumber).toEqual(1);
      expect(draft.packNumber).toEqual(1);
      expect(draft).toHaveProperty('packs');
      expect(draft).toHaveProperty('packs');
      expect(draft).toHaveProperty('bots');
      // CoreMongooseArray causing trouble, so we check length and use stringify
      expect(draft.bots.length).toEqual(1);
      const initialStateJSON = JSON.stringify(draft.initial_state);
      const packsJSON = JSON.stringify(draft.packs);
      expect(initialStateJSON).toEqual(packsJSON);
    });

    it('fails if it runs out of cards in a standard draft', () => {
      cards = exampleCube.cards.slice();
      seats = 8;
      // cube only contains 65 cards, so 8 * 1 * 15 = 120, should run out if multiples = false
      format = getDraftFormat({ id: -1, packs: 1, cards: 15, seats }, exampleCube);
      expect(() => {
        createDraft(format, cards, seats, { username: 'user', _id: 0 });
      }).toThrow(/not enough cards/);
    });

    it('fails if it runs out of cards in a custom draft', () => {
      cards = exampleCube.cards.slice();
      seats = 8;
      // cube only contains 65 cards, so 8 * 2 * 5 = 80, should run out if multiples = false
      exampleCube.draft_formats[0].packs = [
        { slots: ['*', '*', '*', '*', '*'], steps: null },
        { slots: ['*', '*', '*', '*', '*'], steps: null },
      ];
      expect(() => {
        format = getDraftFormat({ id: 0 }, exampleCube);
        createDraft(format, cards, seats, { username: 'user', _id: 0 });
      }).toThrow(/not enough cards/);
    });

    it.only('fails if it runs out of filtered cards in a custom draft', () => {
      cards = exampleCube.cards.slice();
      seats = 6;
      // cube only contains 65 cards, so 6 * 5 = 30 > 13 blue cards, should run out if multiples = false
      exampleCube.draft_formats[0].packs = [
        {
          slots: ['c>=u', 'c>=u', 'c:u', 'c:u', 'c:u'],
          steps: null,
        },
        {
          slots: ['*', '*', '*', '*'],
          steps: null,
        },
      ];
      exampleCube.draft_formats[0].multiples = true;
      format = getDraftFormat({ id: 0 }, exampleCube);
      expect(() => {
        createDraft(format, cards, seats, { username: 'user', _id: 0 });
      }).not.toThrow(/not enough cards/);
      exampleCube.draft_formats[0].multiples = false;
      format = getDraftFormat({ id: 0 }, exampleCube);
      expect(() => {
        createDraft(format, cards, seats, { username: 'user', _id: 0 });
      }).toThrow(/not enough cards/);
    });
  });
});
