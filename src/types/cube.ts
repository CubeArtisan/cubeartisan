import type { Types } from 'mongoose';

import type { Card, CardStatus, CardWithoutDetails } from '@cubeartisan/cubeartisan/types/card';
import type { Patch } from '@cubeartisan/cubeartisan/types/patch';

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

type CardTypes = Card | CardWithoutDetails | Patch<Card>;

export type CubeCards<C extends CardTypes> = {
  cards: C[];
  maybe: C[];
  boards: Board<C>[];
  unlimitedCards: C[];
};

type IdTypes = Types.ObjectId | string;

export type CubeIds<ID extends IdTypes> = {
  owner: ID;
  users_following: ID[];
};

export type GenericCube<C extends CardTypes, ID extends IdTypes> = BaseCube & CubeCards<C> & CubeIds<ID>;

export type MongoCube = GenericCube<CardWithoutDetails, Types.ObjectId>;

export type Cube = GenericCube<Card, string> & { _id: string };

type UnpatchableCubeProperties = 'basics' | 'maybe' | 'numDecks' | 'users_following' | 'owner_name' | 'date_updated';

export type CubePatch = Patch<Omit<GenericCube<CardWithoutDetails, string>, UnpatchableCubeProperties>>;

export type MongoCubeChange = {
  version: number;
  cubeId: Types.ObjectId;
  date_updated: string;
  parent: Types.ObjectId;
} & CubePatch;
