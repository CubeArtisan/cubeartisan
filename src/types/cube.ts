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
  id: string;
  markdown: string;
  packs: PackSpec[];
  defaultSeats: number;
  multiples: boolean;
};

export type TagColor = {
  tag: string;
  color: string;
};

export type Board<C> = {
  name: string;
  id: string;
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
  tag_colors: TagColor[];
  defaultDraftFormat: number;
  numDecks: number;
  description: string | null;
  image_uri: string | null;
  image_artist: string | null;
  image_name: string | null;
  owner_name: string | null;
  date_created: string;
  date_updated: string;
  type: string | null;
  default_sorts: string[];
  default_show_unsorted: boolean;
  draft_formats: DraftFormat[];
  defaultStatus: CardStatus;
  defaultPrinting: 'first' | 'recent';
  disableNotifications: boolean;
  basics: string[];
  keywords: string[];
  categories: string[];
};

export type CubeCards<C> = {
  cards: C[];
  maybe: C[];
  boards: Board<C>[];
  unlimitedCards: C[];
};

export type CubeIds<ID> = {
  owner: ID;
  users_following: ID[];
};

export type GenericCube<C, ID> = BaseCube & CubeCards<C> & CubeIds<ID>;

export type MongoCube = GenericCube<CardWithoutDetails, Types.ObjectId>;

export type Cube = GenericCube<Card, string> & { _id: string };

export type GenericRemoval = {
  action: 'remove';
  id: string;
  index: number;
};

export type GenericUpdate<T> = {
  action: 'update';
  index: number;
  item: T;
};

export type GenericAddition<T> = {
  action: 'add';
  item: T;
};

export type GenericChange<T> = GenericRemoval | GenericAddition<T> | GenericUpdate<T>;

export type CardChange = GenericChange<CardWithoutDetails>;

export type BoardRemoval = GenericRemoval;

export type BoardUpdate = {
  action: 'update';
  name?: string;
  id: string;
  index: number;
  updates: CardChange[];
};

export type BoardAddition = GenericAddition<Board<CardWithoutDetails>>;

export type BoardChange = BoardAddition | BoardUpdate | BoardRemoval;

export type FormatChange = GenericChange<DraftFormat>;

export type TagRemoval = {
  action: 'remove';
  tag: string;
  index: number;
};

export type TagUpdate = {
  action: 'update';
  tag: string;
  index: number;
  color: string;
};

export type TagAddition = GenericAddition<TagColor>;

export type TagChange = TagRemoval | TagUpdate | TagAddition;

export type CubeArrayChanges = {
  draft_formats: FormatChange[];
  cards: CardChange[];
  boards: BoardUpdate[];
  unlimitedCards: CardChange[];
  tag_colors: TagChange[];
};

export type CubeNonArrayChanges = Omit<
  BaseCube,
  keyof CubeArrayChanges | 'basics' | 'maybe' | 'numDecks' | 'users_following' | 'owner_name' | 'date_updated'
>;

export type CubeChange = Partial<CubeNonArrayChanges & CubeArrayChanges>;

export type MongoCubeChange = { version: number; cubeId: Types.ObjectId; date_updated: string } & CubeChange;
