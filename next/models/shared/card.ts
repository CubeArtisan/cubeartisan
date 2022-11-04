import type { CardFinish, CardStatus, CardWithoutDetails, Color } from '../../types/card';
import type { SchemaDefinition } from 'mongoose';

const cardSchema: SchemaDefinition<CardWithoutDetails> = {
  addedTmsp: Date,
  cardID: String,
  cmc: {
    type: Number,
    min: 0,
    default: null,
  },
  colorCategory: {
    type: String,
    default: null,
  },
  colors: {
    type: [{ type: String, enum: ['W', 'U', 'B', 'R', 'G'] as Color[] }],
    default: null,
  },
  finish: {
    type: String,
    default: 'Non-foil',
    enum: ['Foil', 'Non-foil'] as CardFinish[],
  },
  imgBackUrl: String,
  imgUrl: String,
  index: {
    type: Number,
    default: null,
  },
  isUnlimited: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: null,
  },
  notes: {
    type: String,
    default: "",
  },
  rarity: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: 'Not Owned',
    enum: ['Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied'] as CardStatus[],
  },
  tags: [
    {
      type: String,
      minlength: 1,
    },
  ],
  type_line: {
    type: String,
    default: null,
  },
};

export default cardSchema;
