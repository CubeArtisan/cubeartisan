const mongoose = require('mongoose');

const cardSchema = require('./shared/cardSchema');
const stepsSchema = require('./shared/stepsSchema');
const CURRENT_SCHEMA_VERSION = require('./migrations/draftMigrations').slice(-1)[0].version;

// Details on each pack, how to draft and what's in it.
const Pack = {
  cards: [
    {
      type: Number,
      min: 0,
    },
  ],
  steps: stepsSchema,
};

// data for each seat, human or bot
const Seat = {
  bot: [String], // null bot value means human player
  name: String,
  userid: String,
  drafted: [[[Number]]], // organized draft picks
  sideboard: [[[Number]]], // organized draft picks
  pickorder: [Number], // cards this player picked in order of when they were picked
  trashorder: [Number], // cards this player trashed in order of when they were trashed
  packbacklog: [Pack],
};

// Cube schema
const draftSchema = mongoose.Schema({
  basics: {
    Plains: cardSchema,
    Island: cardSchema,
    Swamp: cardSchema,
    Mountain: cardSchema,
    Forest: cardSchema,
    Wastes: cardSchema,
  },
  cards: [cardSchema],
  cube: String,
  initial_state: [[Pack]],
  seats: [Seat],
  unopenedPacks: [[Pack]],
  schemaVersion: {
    type: Number,
  },
});

draftSchema.pre('save', () => {
  this.schemaVersion = CURRENT_SCHEMA_VERSION;
});
const Draft = mongoose.model('Draft', draftSchema);
Draft.CURRENT_SCHEMA_VERSION = CURRENT_SCHEMA_VERSION;

module.exports = Draft;
