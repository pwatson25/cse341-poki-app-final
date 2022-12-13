const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moveSchema = new Schema({
  name: String,
  accuracy: Number,
  effect_chance: Number,
  pp: Number,
  priority: Number,
  power: Number,
  contest_combos: [
    {
      normal: [
        {
          user_after: [
            {
              user_before: {
                name: String,
                url: String,
              },
            },
          ],
        },
      ],
      super: [
        {
          user_after: {
            user_before: [
              {
                name: String,
                url: String,
              },
            ],
          },
        },
      ],
    },
  ],
  contest_type: [
    {
      name: String,
      url: String,
    },
  ],
  contest_effect: [
    {
      url: String,
    },
  ],
  damage_class: [
    {
      name: String,
      url: String,
    },
  ],
  effect_entries: [
    {
      effect: String,
      language: [
        {
          name: String,
          url: String,
        },
      ],
      short_effect: String,
    },
  ],
  effect_changes: [
    {
      effect: String,
      language: [
        {
          name: String,
          url: String,
        },
      ],
      short_effect: String,
    },
  ],
  learned_by_pokemon: [
    {
      name: String,
      url: String,
    },
  ],
  generation: [
    {
      name: String,
      url: String,
    },
  ],
  machines: [
    {
      name: String,
      url: String,
    },
  ],
  meta: [
    {
      ailment: [
        {
          name: String,
          url: String,
        },
      ],
      ailment_chance: Number,
      category: [
        {
          name: String,
          url: String,
        },
      ],
      crit_rate: Number,
      drain: Number,
      flinch_chance: Number,
      healing: Number,
      max_hits: Number,
      max_turns: Number,
      min_hits: Number,
      min_turns: Number,
      stat_chance: Number,
    },
  ],
  past_values: [
    {
      name: String,
      url: String,
    },
  ],
  stat_changes: [
    {
      name: String,
      url: String,
    },
  ],
  super_contest_effect: [
    {
      url: String,
    },
  ],
  target: [
    {
      name: String,
      url: String,
    },
  ],
  type: [
    {
      name: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model("move", moveSchema);
