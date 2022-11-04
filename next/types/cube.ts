import type { Types } from 'mongoose';

import type { Card, CardStatus, CardWithoutDetails } from '@cubeartisan/next/types/card';

export type Step = {
  action: 'pass' | 'pick' | 'trash' | 'pickrandom' | 'trashrandom',
  amount: number | null,
};

export type PackSpec = {
  slots: string[],
  steps: Step[] | null,
};

export type DraftFormat = {
  title: string,
  markdown: string,
  packs: PackSpec[],
  defaultSeats: number,
  multiples: boolean,
};

export type TagColor = {
  tag: string,
  color: string | null,
};

export type Tag = {
  id: number,
  text: string,
};

export type GenericCube<C, ID> = {
  name: string,
  shortID: string,
  owner: ID,
  isListed: boolean,
  privatePrices: boolean,
  isFeatured: boolean,
  overrideCategory: boolean,
  categoryOverride: string,
  categoryPrefixes: string[],
  cards: C[],
  maybe: C[],
  tag_colors: Tag[],
  defaultDraftFormat: number,
  numDecks: number,
  description: string | null,
  image_uri: string | null,
  image_artist: string | null,
  image_name: string | null,
  owner_name: string | null,
  date_updated: string | null,
  updated_string: string | null,
  type: string | null,
  raw_desc: string,
  default_sorts: [string, string, string, string] | null,
  default_show_unsorted: boolean | null,
  card_count: number,
  draft_formats: DraftFormat[],
  users_following: ID[],
  defaultStatus: CardStatus,
  defaultPrinting: 'first' | 'recent',
  disableNotifications: boolean,
  basics: string[],
  tags: string[],
  cardOracles: string[],
  keywords: string[],
  categories: string[],
};

export type MongoCube = GenericCube<CardWithoutDetails, Types.ObjectId>;

export type Cube = GenericCube<Card, string> & { _id: string };
