const stepsSchema = [
  {
    action: {
      type: String,
      enum: ['pass', 'pick', 'trash', 'pickrandom', 'trashrandom'],
    },
    amount: {
      type: Number,
      default: null,
    },
  },
];

export default stepsSchema;
