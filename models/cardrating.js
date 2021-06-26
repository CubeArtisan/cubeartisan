import mongoose from 'mongoose';

// Cube schema
const cardRatingSchema = mongoose.Schema({
  value: Number,
  elo: Number,
  picks: Number,
  name: String,
  embedding: [Number],
});

cardRatingSchema.index({
  name: 1,
});

cardRatingSchema.index({
  elo: -1,
});

export default mongoose.model('CardRating', cardRatingSchema);
