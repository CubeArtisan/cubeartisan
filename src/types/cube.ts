import type { Types } from 'mongoose';

import type { Card, CardStatus, CardWithoutDetails } from '@cubeartisan/cubeartisan/types/card';

export type Step = {
  action: 'pass' | 'pick' | 'trash' | 'pickrandom' | 'trashrandom';
  amount: number | null;
};

export type PackSpec = {
  slots: string[];
  steps: Step[] | null;
};

export type DraftFormat = {
  title: string;
  markdown: string;
  packs: PackSpec[];
  defaultSeats: number;
  multiples: boolean;
};

export type TagColor = {
  tag: string;
  color: string;
};

export type Tag = {
  id: number;
  text: string;
};

export type Board<C> = {
  name: string;
  shortID: string;
  cards: C[];
};

export type BaseCube = {
  name: string;
  shortID: string;
  isListed: boolean;
  privatePrices: boolean;
  overrideCategory: boolean;
  categoryOverride: string;
  categoryPrefixes: string[];
  tag_colors: Tag[];
  defaultDraftFormat: number;
  numDecks: number;
  description: string | null;
  image_uri: string | null;
  image_artist: string | null;
  image_name: string | null;
  owner_name: string | null;
  date_updated: string | null;
  type: string | null;
  default_sorts: [string, string, string, string] | null;
  default_show_unsorted: boolean;
  card_count: number;
  draft_formats: DraftFormat[];
  defaultStatus: CardStatus;
  defaultPrinting: 'first' | 'recent';
  disableNotifications: boolean;
  basics: string[];
  tags: string[];
  cardOracles: string[];
  keywords: string[];
  categories: string[];
};

export type CubeCards<C> = {
  cards: C[];
  maybe: C[];
  boards: Board<C>[];
};

export type CubeIds<ID> = {
  owner: ID;
  users_following: ID[];
};

export type GenericCube<C, ID> = BaseCube & CubeCards<C> & CubeIds<ID>;

export type MongoCube = GenericCube<CardWithoutDetails, Types.ObjectId>;

export type Cube = GenericCube<Card, string> & { _id: string };
