export type TestCard = {
  name: string;
  color: 'W' | 'U' | 'B' | 'R' | 'G' | 'M' | 'C' | 'L';
  cmc: number;
  type: 'creature' | 'planeswalker' | 'instant' | 'sorcery' | 'enchantment' | 'artifact' | 'land';
};

const sortedCards: TestCard[][][][] = [
  [
    [
      [
        { name: 'Esper Sentinel', color: 'W', cmc: 1, type: 'creature' },
        { name: 'Giver of Runes', color: 'W', cmc: 1, type: 'creature' },
        { name: 'Mother of Runes', color: 'W', cmc: 1, type: 'creature' },
      ],
      [
        { name: 'Archivist of Oghma', color: 'W', cmc: 2, type: 'creature' },
        { name: 'Deep Gnome Terramancer', color: 'W', cmc: 2, type: 'creature' },
        { name: 'Lion Sash', color: 'W', cmc: 2, type: 'creature' },
      ],
      [
        { name: 'Monastery Mentor', color: 'W', cmc: 3, type: 'creature' },
        { name: 'Skyclave Apparition', color: 'W', cmc: 3, type: 'creature' },
      ],
      [{ name: 'Solitude', color: 'W', cmc: 5, type: 'creature' }],
    ],
    [[{ name: 'The Wandering Emperor', color: 'W', cmc: 4, type: 'planeswalker' }]],
    [
      [
        { name: 'Mana Tithe', color: 'W', cmc: 1, type: 'instant' },
        { name: 'Path to Exile', color: 'W', cmc: 1, type: 'instant' },
        { name: 'Swords to Plowshares', color: 'W', cmc: 1, type: 'instant' },
      ],
      [{ name: 'Fateful Absence', color: 'W', cmc: 2, type: 'instant' }],
    ],
    [
      [
        { name: 'Oust', color: 'W', cmc: 1, type: 'sorcery' },
        { name: 'Prismatic Ending', color: 'W', cmc: 1, type: 'sorcery' },
      ],
      [{ name: 'Winds of Abandon', color: 'W', cmc: 2, type: 'sorcery' }],
      [
        { name: "Council's Judgment", color: 'W', cmc: 3, type: 'sorcery' },
        { name: "Sevine's Reclamation", color: 'W', cmc: 3, type: 'sorcery' },
      ],
    ],
  ],
  [
    [
      [
        { name: 'A-Symmetry Sage', color: 'U', cmc: 1, type: 'creature' },
        { name: 'Delver of Secrets', color: 'U', cmc: 1, type: 'creature' },
      ],
      [
        { name: "Jace, Vryn's Prodigy", color: 'U', cmc: 2, type: 'creature' },
        { name: 'Ledger Shredder', color: 'U', cmc: 2, type: 'creature' },
        { name: 'Snapcaster Mage', color: 'U', cmc: 2, type: 'creature' },
      ],
      [
        { name: 'Brazen Borrower', color: 'U', cmc: 3, type: 'creature' },
        { name: 'Vendilion Clique', color: 'U', cmc: 3, type: 'creature' },
      ],
      [{ name: 'Ethereal Forager', color: 'U', cmc: 6, type: 'creature' }],
      [{ name: 'Murktide Regent', color: 'U', cmc: 8, type: 'creature' }],
    ],
    [
      [{ name: 'Narset, Parter of Veils', color: 'U', cmc: 3, type: 'planeswalker' }],
      [{ name: 'Jace, the Mind Sculptor', color: 'U', cmc: 4, type: 'planeswalker' }],
    ],
    [
      [
        { name: 'Brainstorm', color: 'U', cmc: 1, type: 'instant' },
        { name: 'Consider', color: 'U', cmc: 1, type: 'instant' },
        { name: 'Divert', color: 'U', cmc: 1, type: 'instant' },
        { name: 'Mental Note', color: 'U', cmc: 1, type: 'instant' },
        { name: 'Opt', color: 'U', cmc: 1, type: 'instant' },
        { name: 'Spell Pierce', color: 'U', cmc: 1, type: 'instant' },
        { name: 'Thought Scour', color: 'U', cmc: 1, type: 'instant' },
      ],
      [
        { name: 'Counterspell', color: 'U', cmc: 2, type: 'instant' },
        { name: 'Daze', color: 'U', cmc: 2, type: 'instant' },
        { name: 'Evasive Action', color: 'U', cmc: 2, type: 'instant' },
        { name: 'Mana Leak', color: 'U', cmc: 2, type: 'instant' },
        { name: 'Memory Lapse', color: 'U', cmc: 2, type: 'instant' },
        { name: 'Miscalculation', color: 'U', cmc: 2, type: 'instant' },
        { name: 'Remand', color: 'U', cmc: 2, type: 'instant' },
      ],
      [
        { name: "Archmages's Charm", color: 'U', cmc: 3, type: 'instant' },
        { name: 'Force of Negation', color: 'U', cmc: 3, type: 'instant' },
      ],
      [{ name: 'Force of Will', color: 'U', cmc: 5, type: 'instant' }],
    ],
    [
      [
        { name: 'Ponder', color: 'U', cmc: 1, type: 'sorcery' },
        { name: 'Preordain', color: 'U', cmc: 1, type: 'sorcery' },
        { name: 'Serum Visions', color: 'U', cmc: 1, type: 'sorcery' },
        { name: 'Sleight of Hand', color: 'U', cmc: 1, type: 'sorcery' },
      ],
    ],
    [[{ name: 'Shark Typhoon', color: 'U', cmc: 6, type: 'enchantment' }]],
  ],
  [
    [
      [
        { name: 'Dark Confidant', color: 'B', cmc: 2, type: 'creature' },
        { name: 'Dauthi Voidwalker', color: 'B', cmc: 2, type: 'creature' },
        { name: 'Tourach, Dread Cantor', color: 'B', cmc: 2, type: 'creature' },
      ],
      [
        { name: 'Plague Engineer', color: 'B', cmc: 3, type: 'creature' },
        { name: 'Sedgemoor Witch', color: 'B', cmc: 3, type: 'creature' },
      ],
      [{ name: 'Uchuulon', color: 'B', cmc: 4, type: 'creature' }],
      [{ name: 'Tasigur, the Golden Fang', color: 'B', cmc: 6, type: 'creature' }],
      [{ name: 'Gurmag Angler', color: 'B', cmc: 7, type: 'creature' }],
    ],
    [
      [
        { name: 'Liliana of the Veil', color: 'B', cmc: 3, type: 'planeswalker' },
        { name: 'Liliana, the Last Hope', color: 'B', cmc: 3, type: 'planeswalker' },
      ],
    ],
    [
      [
        { name: 'Cling to Dust', color: 'B', cmc: 1, type: 'instant' },
        { name: 'Fatal Push', color: 'B', cmc: 1, type: 'instant' },
        { name: 'Ghastly Demise', color: 'B', cmc: 1, type: 'instant' },
        { name: 'Vendetta', color: 'B', cmc: 1, type: 'instant' },
      ],
      [{ name: 'Eliminate', color: 'B', cmc: 2, type: 'instant' }],
      [{ name: 'Snuff Out', color: 'B', cmc: 4, type: 'instant' }],
    ],
    [
      [
        { name: "Bloodchief's Thirst", color: 'B', cmc: 1, type: 'sorcery' },
        { name: 'Dread Fugue', color: 'B', cmc: 1, type: 'sorcery' },
        { name: 'Duress', color: 'B', cmc: 1, type: 'sorcery' },
        { name: 'Inquisition of Kozilek', color: 'B', cmc: 1, type: 'sorcery' },
        { name: 'Reanimate', color: 'B', cmc: 1, type: 'sorcery' },
        { name: 'Thoughtseize', color: 'B', cmc: 1, type: 'sorcery' },
      ],
      [
        { name: 'Collective Brutality', color: 'B', cmc: 2, type: 'sorcery' },
        { name: 'Hymn to Tourach', color: 'B', cmc: 2, type: 'sorcery' },
        { name: "Night's Whisper", color: 'B', cmc: 2, type: 'sorcery' },
      ],
      [
        { name: 'Painful Truths', color: 'B', cmc: 3, type: 'sorcery' },
        { name: 'Toxic Deluge', color: 'B', cmc: 3, type: 'sorcery' },
      ],
    ],
    [[{ name: 'Bitterblossom', color: 'B', cmc: 2, type: 'enchantment' }]],
  ],
  [
    [
      [
        { name: "Dragon's Rage Channeler", color: 'R', cmc: 1, type: 'creature' },
        { name: 'Grim Lavamancer', color: 'R', cmc: 1, type: 'creature' },
        { name: 'Ragavan, Nimble Pilferer', color: 'R', cmc: 1, type: 'creature' },
      ],
      [
        { name: 'Dreadhorde Arcanist', color: 'R', cmc: 2, type: 'creature' },
        { name: 'Krark, the Thumbless', color: 'R', cmc: 2, type: 'creature' },
        { name: 'Young Pyromancer', color: 'R', cmc: 2, type: 'creature' },
      ],
      [
        { name: 'Bonecrusher Giant', color: 'R', cmc: 3, type: 'creature' },
        { name: 'Seasoned Pyromancer', color: 'R', cmc: 3, type: 'creature' },
      ],
      [{ name: 'Fury', color: 'R', cmc: 5, type: 'creature' }],
    ],
    [
      [
        { name: 'Burst Lightning', color: 'R', cmc: 1, type: 'instant' },
        { name: 'Lava Dart', color: 'R', cmc: 1, type: 'instant' },
        { name: 'Lightning Bolt', color: 'R', cmc: 1, type: 'instant' },
        { name: 'Unholy Heat', color: 'R', cmc: 1, type: 'instant' },
      ],
      [{ name: 'Delayed Blast Fireball', color: 'R', cmc: 3, type: 'instant' }],
    ],
    [
      [
        { name: 'Chain Lightning', color: 'R', cmc: 1, type: 'sorcery' },
        { name: 'Flame Slash', color: 'R', cmc: 1, type: 'sorcery' },
        { name: 'Forked Bolt', color: 'R', cmc: 1, type: 'sorcery' },
      ],
      [{ name: 'Reckless Impulse', color: 'R', cmc: 2, type: 'sorcery' }],
    ],
    [[{ name: 'Fable of the Mirror-Breaker', color: 'R', cmc: 3, type: 'enchantment' }]],
  ],
  [
    [
      [
        { name: 'Birds of Paradise', color: 'G', cmc: 1, type: 'creature' },
        { name: 'Ignoble Hierarch', color: 'G', cmc: 1, type: 'creature' },
        { name: 'Noble Hierarch', color: 'G', cmc: 1, type: 'creature' },
      ],
      [
        { name: 'Jolrael, Mwonvuli Recluse', color: 'G', cmc: 2, type: 'creature' },
        { name: 'Scavenging Ooze', color: 'G', cmc: 2, type: 'creature' },
        { name: 'Tarmogoyf', color: 'G', cmc: 2, type: 'creature' },
      ],
      [{ name: 'Endurance', color: 'G', cmc: 3, type: 'creature' }],
      [{ name: 'Thrun, the Last Troll', color: 'G', cmc: 4, type: 'creature' }],
    ],
    [
      [
        { name: 'Abundant Harvest', color: 'G', cmc: 1, type: 'sorcery' },
        { name: "Green Sun's Zenith", color: 'G', cmc: 1, type: 'sorcery' },
      ],
    ],
    [
      [
        { name: 'Abundant Growth', color: 'G', cmc: 1, type: 'enchantment' },
        { name: 'Utopia Sprawl', color: 'G', cmc: 1, type: 'enchantment' },
      ],
      [{ name: 'Sylvan Library', color: 'G', cmc: 2, type: 'enchantment' }],
    ],
  ],
  [
    [
      [
        { name: 'Baleful Strix', color: 'M', cmc: 2, type: 'creature' },
        { name: 'Chevill, Bane of Monsters', color: 'M', cmc: 2, type: 'creature' },
        { name: 'Ice-Fang Coatl', color: 'M', cmc: 2, type: 'creature' },
        { name: "Kroxa, Titan of Death's Hunger", color: 'M', cmc: 2, type: 'creature' },
        { name: 'Priest of Fell Rites', color: 'M', cmc: 2, type: 'creature' },
        { name: 'Sprite Dragon', color: 'M', cmc: 2, type: 'creature' },
        { name: 'Territorial Kavu', color: 'M', cmc: 2, type: 'creature' },
        { name: 'Tidehollow Sculler', color: 'M', cmc: 2, type: 'creature' },
      ],
      [
        { name: 'General Ferrous Rokiric', color: 'M', cmc: 3, type: 'creature' },
        { name: 'Leovold, Emissary of Trest', color: 'M', cmc: 3, type: 'creature' },
        { name: 'Shardless Agent', color: 'M', cmc: 3, type: 'creature' },
      ],
      [
        { name: 'Bloodbraid Elf', color: 'M', cmc: 4, type: 'creature' },
        { name: 'Omnath, Locus of Creation', color: 'M', cmc: 4, type: 'creature' },
        { name: 'Zyym, Mesmeric Lord', color: 'M', cmc: 4, type: 'creature' },
      ],
      [{ name: 'Niv-Mizzet Reborn', color: 'M', cmc: 5, type: 'creature' }],
    ],
    [
      [{ name: 'Wrenn and Six', color: 'M', cmc: 2, type: 'planeswalker' }],
      [
        { name: 'Daretti, Ingenious Iconoclast', color: 'M', cmc: 3, type: 'planeswalker' },
        { name: 'Grist, the Hunger Tide', color: 'M', cmc: 3, type: 'planeswalker' },
        { name: 'Kaito Shizuki', color: 'M', cmc: 3, type: 'planeswalker' },
        { name: 'Oko, Thief of Crowns', color: 'M', cmc: 3, type: 'planeswalker' },
        { name: 'Teferi, Time Raveler', color: 'M', cmc: 3, type: 'planeswalker' },
      ],
      [{ name: 'Teferi, Hero of Dominaria', color: 'M', cmc: 5, type: 'planeswalker' }],
    ],
    [
      [
        { name: 'Abrupt Decay', color: 'M', cmc: 2, type: 'instant' },
        { name: "Assassin's Trophy", color: 'M', cmc: 2, type: 'instant' },
        { name: 'Drown in the Loch', color: 'M', cmc: 2, type: 'instant' },
        { name: "Eladamri's Call", color: 'M', cmc: 2, type: 'instant' },
        { name: 'Growth Spiral', color: 'M', cmc: 2, type: 'instant' },
        { name: 'Rip Apart', color: 'M', cmc: 2, type: 'instant' },
      ],
      [
        { name: 'Fire Covenant', color: 'M', cmc: 3, type: 'instant' },
        { name: "Kaya's Guile", color: 'M', cmc: 3, type: 'instant' },
        { name: "Kolaghan's Command", color: 'M', cmc: 3, type: 'instant' },
      ],
    ],
    [
      [
        { name: "Angrath's Rampage", color: 'M', cmc: 2, type: 'sorcery' },
        { name: 'Dreadbore', color: 'M', cmc: 2, type: 'sorcery' },
        { name: 'Expressive Iteration', color: 'M', cmc: 2, type: 'sorcery' },
        { name: "Gerrard's Verdict", color: 'M', cmc: 2, type: 'sorcery' },
      ],
      [{ name: 'Supreme Verdict', color: 'M', cmc: 4, type: 'sorcery' }],
      [{ name: 'Bring to Light', color: 'M', cmc: 5, type: 'sorcery' }],
    ],
  ],
  [
    [
      [{ name: 'Deathrite Shaman', color: 'C', cmc: 1, type: 'creature' }],
      [{ name: 'Lurrus of the Dream-Den', color: 'C', cmc: 3, type: 'creature' }],
    ],
    [
      [{ name: 'Manamorphose', color: 'C', cmc: 2, type: 'instant' }],
      [{ name: 'Dismember', color: 'C', cmc: 3, type: 'instant' }],
    ],
    [
      [{ name: 'Damn', color: 'C', cmc: 2, type: 'sorcery' }],
      [{ name: 'Lingering Souls', color: 'C', cmc: 3, type: 'sorcery' }],
    ],
  ],
];

export const testCubeSorted = {
  id: 'mortalcombat',
  name: 'Mortal Combat',
  author: 'jesseb34r',
  banner: "url('https://cards.scryfall.io/art_crop/front/f/1/f1d9cfce-1507-4cdf-9d58-6ebaf44e72e3.jpg?1562557622')",
  description: () => (
    <ul>
      <li>4 packs of 18 cards are to be drafted by 8 players</li>
      <li>First picks are double picks (like double masters)</li>
      <li>Last pick is burned</li>
      <li>First mulligan is free</li>
    </ul>
  ),
  boards: [
    {
      name: 'main',
      cards: sortedCards,
    },
    {
      name: 'maybe',
      cards: [],
    },
  ],
};
