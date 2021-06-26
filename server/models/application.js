import mongoose from 'mongoose';

// Deck schema
const applicationSchema = mongoose.Schema({
  userid: String,
  info: String,
  timePosted: Date,
});

export default mongoose.model('Application', applicationSchema);
