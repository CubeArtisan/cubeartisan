import type {
  Card,
  CardFace,
  CardImages,
  CardSource,
  ManaSymbol,
  RelatedCard,
  ScryfallBorderColor,
  ScryfallCardFinish,
  ScryfallCardFrame,
  ScryfallCardSecurityStamp,
  ScryfallFrameEffect,
  ScryfallGame,
  ScryfallLegalities,
  ScryfallLegality,
} from '@cubeartisan/carddb';
import type { SchemaDefinition } from 'mongoose';

import patchArray from '@cubeartisan/cubeartisan/models/shared/patch';
import type {
  CardFinish,
  CardMetadata,
  CardStatus,
  CardWithoutDetails,
  Color,
  CubeDbCard,
} from '@cubeartisan/cubeartisan/types/card';
import type { Patch } from '@cubeartisan/cubeartisan/types/patch';

export const oldCardSchema: SchemaDefinition<CardWithoutDetails> = {
  addedTmsp: Date,
  cardID: String,
  cmc: Number,
  colors: { type: [{ type: String, enum: ['W', 'U', 'B', 'R', 'G'] as Color[] }] },
  finish: {
    type: String,
    enum: ['Foil', 'Non-foil'] as CardFinish[],
  },
  imgBackUrl: String,
  imgUrl: String,
  name: String,
  notes: String,
  rarity: String,
  status: {
    type: String,
    enum: ['Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied'] as CardStatus[],
  },
  tags: [String],
  type_line: String,
};

const finishSchema = {
  type: String,
  enum: ['foil', 'nonfoil', 'etched'] as ScryfallCardFinish[],
};

export const cardMetadataSchema: SchemaDefinition<CardMetadata> = {
  tags: [String],
  price: {
    type: Number,
    default: null,
  },
  notes: {
    type: String,
    default: '',
  },
  addedTmsp: String,
  finish: finishSchema,
  status: {
    type: String,
    enum: ['Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied'] as CardStatus[],
    default: 'Not Owned' as CardStatus,
  },
};

export const cardMetadataPatchSchema: SchemaDefinition<Patch<CardMetadata>> = {
  tags: patchArray(String, String),
  price: {
    type: Number,
    default: null,
  },
  notes: {
    type: String,
    default: '',
  },
  addedTmsp: String,
  finish: finishSchema,
  status: {
    type: String,
    enum: ['Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied'] as CardStatus[],
    default: 'Not Owned' as CardStatus,
  },
};

const manaSymbol = {
  type: String,
  enum: [
    'W',
    'U',
    'B',
    'R',
    'G',
    'C',
    'W/U',
    'U/B',
    'B/R',
    'R/G',
    'G/W',
    'W/B',
    'U/R',
    'B/G',
    'R/W',
    'G/U',
    '2/W',
    '2/U',
    '2/B',
    '2/R',
    '2/G',
    'P',
    'W/P',
    'U/P',
    'B/P',
    'R/P',
    'G/P',
    'W/U/P',
    'U/B/P',
    'B/R/P',
    'R/G/P',
    'G/W/P',
    'W/B/P',
    'U/R/P',
    'B/G/P',
    'R/W/P',
    'G/U/P',
    'S',
    '0',
    '½',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '100',
    '1000000',
    '∞',
    'X',
    'Y',
    'Z',
    'HW',
    'HR',
  ] as ManaSymbol[],
};

const colors = {
  type: String,
  enum: ['W', 'U', 'B', 'R', 'G'] as Color[],
};

const frameEffectsSchema = {
  type: String,
  enum: [
    'colorshifted',
    'companion',
    'compasslanddfc',
    'convertdfc',
    'devoid',
    'draft',
    'etched',
    'extendedart',
    'fandfc',
    'fullart',
    'inverted',
    'legendary',
    'lesson',
    'miracle',
    'mooneldrazidfc',
    'nyxtouched',
    'originpwdfc',
    'shatteredglass',
    'showcase',
    'snow',
    'sunmoondfc',
    'textless',
    'tombstone',
    'upsidedowndfc',
    'waxingandwaningmoondfc',
  ] as ScryfallFrameEffect[],
};

const borderColorSchema = {
  type: String,
  enum: ['black', 'white', 'borderless', 'silver', 'gold'] as ScryfallBorderColor[],
};

const frameSchema = {
  type: String,
  enum: ['1993', '1997', '2003', '2015', 'future'] as ScryfallCardFrame[],
};

const securityStampSchema = {
  type: String,
  enum: ['oval', 'triangle', 'acorn', 'circle', 'arena', 'heart'] as ScryfallCardSecurityStamp[],
};

const cardImagesSchema: SchemaDefinition<CardImages> = {
  small: String,
  normal: String,
  large: String,
  png: String,
  borderCrop: String,
  artCrop: String,
};

// TODO: Fill in
const cardFaceSchema: SchemaDefinition<CardFace> = {
  name: String,
  manaCost: [manaSymbol],
  images: cardImagesSchema,
  cmc: Number,
  colorIndicator: [colors],
  colors: [colors],
  layout: String,
  loyalty: String,
  oracleText: String,
  power: String,
  producedMana: [
    {
      type: String,
      enum: ['W', 'U', 'B', 'R', 'G', 'C'],
    },
  ],
  toughness: String,
  typeLine: String,
  flavorText: String,
  illustrationId: String,
  printedName: String,
  printedText: String,
  printedTypeLine: String,
  watermark: String,
  artist: String,
  attractionLights: [Number],
  borderColor: borderColorSchema,
  flavorName: String,
  frameEffects: frameEffectsSchema,
  frame: frameSchema,
  fullArt: Boolean,
  highresImage: Boolean,
  storySpotlight: Boolean,
  textless: Boolean,
  securityStamp: securityStampSchema,
};

const cardFacePatchSchema: SchemaDefinition<Patch<CardFace>> = {
  name: String,
  manaCost: patchArray(manaSymbol, manaSymbol),
  images: cardImagesSchema,
  cmc: Number,
  colorIndicator: patchArray(colors, colors),
  colors: patchArray(colors, colors),
  layout: String,
  loyalty: String,
  oracleText: String,
  power: String,
  producedMana: patchArray(['W', 'U', 'B', 'R', 'G', 'C'], ['W', 'U', 'B', 'R', 'G', 'C']),
  toughness: String,
  typeLine: String,
  flavorText: String,
  illustrationId: String,
  printedName: String,
  printedText: String,
  printedTypeLine: String,
  watermark: String,
  artist: String,
  attractionLights: patchArray(Number, Number),
  borderColor: borderColorSchema,
  flavorName: String,
  frameEffects: frameEffectsSchema,
  frame: frameSchema,
  fullArt: Boolean,
  highresImage: Boolean,
  storySpotlight: Boolean,
  textless: Boolean,
  securityStamp: securityStampSchema,
};

const legalitySchema = {
  type: String,
  enum: ['legal', 'not_legal', 'restricted', 'banned'] as ScryfallLegality[],
};

const legalitiesSchema: SchemaDefinition<ScryfallLegalities> = {
  standard: legalitySchema,
  future: legalitySchema,
  historic: legalitySchema,
  gladiator: legalitySchema,
  pioneer: legalitySchema,
  explorer: legalitySchema,
  modern: legalitySchema,
  legacy: legalitySchema,
  pauper: legalitySchema,
  vintage: legalitySchema,
  penny: legalitySchema,
  commander: legalitySchema,
  brawl: legalitySchema,
  historicbrawl: legalitySchema,
  alchemy: legalitySchema,
  paupercommander: legalitySchema,
  duel: legalitySchema,
  oldschool: legalitySchema,
  premodern: legalitySchema,
};

const relatedCardSchema: SchemaDefinition<RelatedCard> = {
  id: String,
  kind: {
    type: String,
    enum: ['token', 'meld_part', 'meld_result', 'combo_piece'],
  },
};

const relatedCardPatchSchema: SchemaDefinition<Patch<RelatedCard>> = relatedCardSchema;

const gamesSchema = {
  type: String,
  enum: ['paper', 'arena', 'mtgo', 'astral', 'sega'] as ScryfallGame[],
};

export const cardSchema: SchemaDefinition<Card> = {
  id: String,
  source: {
    type: String,
    enum: ['scryfall', 'custom'] as CardSource[],
  },
  externalIds: {
    arenaId: Number,
    scryfallId: String,
    mtgoId: String,
    mtgoFoilId: String,
    multiverseIds: Number,
    tcgplayerId: Number,
    tcgplayerEtchedId: Number,
    cardmarketId: Number,
    oracleId: String,
  },
  cardFaces: cardFaceSchema,
  collectorNumber: String,
  colorIdentity: [colors],
  related: relatedCardSchema,
  legalities: legalitiesSchema,
  edhrecRank: Number,
  handModifier: String,
  lifeModifier: String,
  keywords: String,
  oversized: Boolean,
  pennyRank: Number,
  reserved: Boolean,
  booster: Boolean,
  digital: Boolean,
  finishes: [finishSchema],
  games: [gamesSchema],
  prices: {
    usd: { type: String, default: null },
    usd_foil: { type: String, default: null },
    usd_etched: { type: String, default: null },
    eur: { type: String, default: null },
    tix: { type: String, default: null },
  },
  promo: Boolean,
  promoTypes: String,
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'special', 'mythic', 'bonus'],
  },
  releasedAt: String,
  reprint: Boolean,
  setName: String,
  setType: String,
  set: String,
  setId: String,
  variation: Boolean,
  variationOf: String,
  preview: {
    previewed_at: String,
    source_uri: String,
    source: String,
  },
};

export const cardPatchSchema: SchemaDefinition<Patch<Card>> = {
  id: String,
  source: {
    type: String,
    enum: ['scryfall', 'custom'] as CardSource[],
  },
  externalIds: {
    arenaId: Number,
    scryfallId: String,
    mtgoId: String,
    mtgoFoilId: String,
    multiverseIds: patchArray(Number, Number),
    tcgplayerId: Number,
    tcgplayerEtchedId: Number,
    cardmarketId: Number,
    oracleId: String,
  },
  cardFaces: patchArray(cardFaceSchema, cardFacePatchSchema),
  collectorNumber: String,
  colorIdentity: patchArray(colors, colors),
  related: patchArray(relatedCardSchema, relatedCardPatchSchema),
  legalities: legalitiesSchema,
  edhrecRank: Number,
  handModifier: String,
  lifeModifier: String,
  keywords: patchArray(String, String),
  oversized: Boolean,
  pennyRank: Number,
  reserved: Boolean,
  booster: Boolean,
  digital: Boolean,
  finishes: patchArray(finishSchema, finishSchema),
  games: patchArray(gamesSchema, gamesSchema),
  prices: {
    usd: { type: String, default: null },
    usd_foil: { type: String, default: null },
    usd_etched: { type: String, default: null },
    eur: { type: String, default: null },
    tix: { type: String, default: null },
  },
  promo: Boolean,
  promoTypes: patchArray(String, String),
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'special', 'mythic', 'bonus'],
  },
  releasedAt: String,
  reprint: Boolean,
  setName: String,
  setType: String,
  set: String,
  setId: String,
  variation: Boolean,
  variationOf: String,
  preview: {
    previewed_at: String,
    source_uri: String,
    source: String,
  },
};

export const cubeDbCardSchema: SchemaDefinition<CubeDbCard> = {
  ...oldCardSchema,
  sortingPatches: [cardPatchSchema],
  metadata: cardMetadataSchema,
  id: String,
  customCard: cardSchema,
};

export const cubeDbCardPatchSchema: SchemaDefinition<Patch<CubeDbCard>> = {
  sortingPatches: [
    {
      action: {
        type: String,
        enum: ['add'],
        required: true,
      },
      index: Number,
      value: cardPatchSchema,
    },
  ],
  metadata: cardMetadataPatchSchema,
  id: String,
  customCard: cardSchema,
};
