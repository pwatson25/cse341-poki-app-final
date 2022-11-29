const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id: Number,
  name: String,
  cost: Number,
  fling_power: Number,
  fling_effect: {
    name: String,
    url: String,
  },
  attributes: [
    {
      name: String,
      url: String,
    },
  ],
  effect_entries: {
    effect: String,
    language: {
      name: String,
      url: String,
    },
    short_effect: String,
  },
  held_by_pokemon: {
    name: String,
    url: String,
  },
  baby_trigger_for: {
    name: String,
    url: String,
  },
  machines: {
    name: String,
    url: String,
  },
});

module.exports = mongoose.model('item', itemSchema);
