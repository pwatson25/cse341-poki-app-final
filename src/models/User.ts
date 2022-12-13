const { ObjectId } = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  identifier: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  locale: { type: String, required: true },
  picture: { type: String },
  pokemon: [
    {
      type: Schema.Types.ObjectId,
      ref: "pokemon",
    },
  ],
  itemInventory: [
    {
      type: Schema.Types.ObjectId,
      ref: "item",
    },
  ],
});

module.exports = model("users", userSchema);
