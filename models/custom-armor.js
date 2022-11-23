const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const armorSchema = new Schema({
  name: String,
  armorType: String,
  ac: Number,
  dexBonus: String,
  stealthDis: Boolean,
  cost: Number,
  costType: {
    type: String,
    enum: ["cp", "sp", "ep", "gp", "pp"],
  },
  weight: Number,
  strengthRqr: Number,
  description: String,
  creator_id: { type: String, required: true },
});

module.exports = mongoose.model("CustomArmor", armorSchema);
