import mongoose from 'mongoose';

// Deck schema
const reportSchema = mongoose.Schema({
  commentid: String,
  info: String,
  reason: String,
  reportee: String,
  timePosted: Date,
});

reportSchema.index({
  timePosted: -1,
});

reportSchema.index({
  commentid: 1,
});

export default mongoose.model('Report', reportSchema);
