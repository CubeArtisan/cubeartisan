import type { Card, ScryfallCardFinish } from '@cubeartisan/carddb';

import type { Patch } from '@cubeartisan/cubeartisan/types/patch';

export type Color = 'W' | 'U' | 'B' | 'R' | 'G';
export type CardFinish = 'Foil' | 'Non-foil';
export type CardStatus = 'Not Owned' | 'Ordered' | 'Owned' | 'Premium Owned' | 'Proxied';

export type CardLegalities = {
  Legacy: string;
  Modern: string;
  Standard: string;
  Pauper: string;
  Pioneer: string;
  Brawl: string;
  Historic: string;
  Commander: string;
  Penny: string;
  Vintage: string;
};

export type CardPrices = {
  usd: number | null;
  usd_foil: number | null;
  eur: number | null;
  tix: number | null;
};

export type CardDetails = {
  color_identity: Color[];
  set: string;
  set_name: string;
  foil: boolean;
  nonfoil: boolean;
  collector_number: string;
  released_at: string;
  reprint: boolean;
  promo: boolean;
  prices: CardPrices;
  elo: number;
  digital: boolean;
  isToken: boolean;
  border_color: string;
  name: string;
  name_lower: string;
  full_name: string;
  artist: string | null;
  scryfall_uri: string;
  rarity: string;
  oracle_text: string | null;
  _id: string;
  oracle_id: string;
  cmc: number;
  legalities: CardLegalities;
  parsed_cost: string[];
  colors: Color[] | null;
  type: string;
  full_art: boolean;
  language: string;
  mtgo_id: number | null;
  layout: string;
  tcgplayer_id: number | null;
  loyalty: string | null;
  power: string | null;
  toughness: string | null;
  image_small: string | null;
  image_normal: string | null;
  art_crop: string | null;
  image_flip: string | null;
  color_category: string;
  tokens: string[] | null;
  popularity: number;
  cubeCount: number;
  pickCount: number;
};

export type CardWithoutDetails = {
  addedTmsp: string;
  cardID: string;
  cmc: number | null;
  colorCategory: string | null;
  colors: Color[] | null;
  finish: CardFinish;
  imgBackUrl: string | null;
  imgUrl: string | null;
  name: string | null;
  notes: string;
  rarity: string | null;
  status: CardStatus;
  tags: string[];
  type_line: string | null;
};

export type OldCubeCard = CardWithoutDetails & { index: number };

export type CardMetadata = {
  tags: string[];
  price: number | null;
  notes: string;
  addedTmsp: string;
  finish: ScryfallCardFinish;
  status: CardStatus;
};

export type CubeDbCard = {
  sortingPatches: Patch<Card>[];
  metadata: CardMetadata;
} & ({ id: string } | { customCard: Card }) &
  Partial<OldCubeCard>;

export type CubeCard = Card & { metadata: CardMetadata; sortingCard: Card };
