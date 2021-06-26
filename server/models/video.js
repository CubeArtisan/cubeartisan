import mongoose from 'mongoose';

// Blog schema
const videoSchema = mongoose.Schema({
  title: String,
  body: String,
  short: String,
  url: String,
  owner: String,
  date: Date,
  image: String,
  imagename: String,
  artist: String,
  status: {
    type: String,
    enum: ['draft', 'inReview', 'published'],
  },
  username: {
    type: String,
    default: 'User',
  },
});

videoSchema.index({
  owner: 1,
  date: -1,
});

videoSchema.index({
  date: -1,
});

videoSchema.index({
  status: 1,
  date: -1,
});

export default mongoose.model('Video', videoSchema);
