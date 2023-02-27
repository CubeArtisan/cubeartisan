import type { SchemaDefinition } from 'mongoose';

import type { Patch } from '@cubeartisan/cubeartisan/types/patch';

const patchArray = <T>(
  originalSchema: SchemaDefinition<T>,
  patchSchema: SchemaDefinition<Patch<T>>,
): SchemaDefinition<Patch<T[]>> => [
  {
    action: {
      type: String,
      enum: ['add', 'remove', 'update', 'copy', 'move'],
      required: true,
    },
    index: Number,
    value: originalSchema,
    patch: patchSchema,
    dest: Number,
  },
];

export default patchArray;
