import mongoose from 'mongoose';

// Blog schema
const cubeAnalyticSchema = mongoose.Schema({
  cube: {
    type: String,
    required: true,
  },
  cards: {
    type: [
      {
        cardName: String,
        picks: Number,
        passes: Number,
        elo: Number,
        mainboards: Number,
        sideboards: Number,
      },
    ],
    default: [],
  },
});

cubeAnalyticSchema.index({
  cube: 1,
});

export default mongoose.model('CubeAnalytic', cubeAnalyticSchema);
