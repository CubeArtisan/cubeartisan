const patchArray = <T, U>(originalSchema: T, patchSchema: U) => [
  {
    action: {
      type: String,
      enum: ['add', 'remove', 'update', 'copy', 'move'],
    },
    index: Number,
    value: originalSchema,
    patch: patchSchema,
    dest: Number,
  },
];

export default patchArray;
