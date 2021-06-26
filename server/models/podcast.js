import mongoose from 'mongoose';

// Blog schema
const podcastSchema = mongoose.Schema({
  title: String,
  description: String,
  url: String,
  rss: String,
  owner: String,
  image: String,
  date: Date,
  username: {
    type: String,
    default: 'User',
  },
  status: {
    type: String,
    enum: ['draft', 'inReview', 'published'],
  },
});

podcastSchema.index({
  owner: 1,
});

export default mongoose.model('Podcast', podcastSchema);
