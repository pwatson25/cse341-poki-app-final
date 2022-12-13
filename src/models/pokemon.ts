const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: String,
  base_experience: Number,
  height: Number,
  is_default: Boolean,
  order: Number,
  weight: Number,
  abilities: [
    {
      ability: {
        name: String,
        url: String,
      },
      is_hidden: Boolean,
      slot: Number,
    },
  ],
  forms: [
    {
      name: String,
      url: String,
    },
  ],
  held_items: [
    {
      item: {
        name: String,
        url: String,
      },
    },
  ],
  location_area_encounters: String,
  moves: [
    {
      move: {
        name: String,
        url: String,
      },
    },
  ],
  past_types: [
    {
      slot: Number,
      type: {
        name: String,
        url: String,
      },
    },
  ],
  species: {
    name: String,
    url: String,
  },
  types: [
    {
      slot: Number,
      type: {
        name: String,
        url: String,
      },
    },
  ],
});

module.exports = mongoose.model("pokemon", pokemonSchema);
