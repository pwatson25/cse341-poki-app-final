const graphql = require("graphql");
const {
  createImportSpecifier,
  isExternalModuleReference,
} = require("typescript");
const Item = require("../../models/item.js");

async function getOneItem(root, args, context, info) {
  try {
    let foundItem = await Item.findOne({
      _id: args.id,
    });
    return foundItem;
  } catch (err) {
    throw err;
  }
}

async function getAllItems(root, args, context, info) {
  try {
    const result = await Item.find();
    return result;
  } catch (err) {
    throw err;
  }
}

async function addOneItem(root, args, context, info) {
  try {
    const item = new Item({
      //   populate the mongoDB item with args provided by the user
      name: args.name,
      cost: args.cost,
      fling_power: args.fling_power,
      fling_effect: args.fling_effect,
      attributes: args.attributes,
      effect_entries: args.effect_entries,
      held_by_pokemon: args.held_by_pokemon,
      baby_trigger_for: args.baby_trigger_for,
      machines: args.machines,
    });
    // Save the new item
    const newItem = await item.save();
    // return the new item to the user so they can see it
    return { ...newItem._doc, _id: newItem.id };
  } catch (err) {
    throw err;
  }
}

async function updateOneItem(root, args, context, info) {
  try {
    const formerItem = await Item.findById(args.id);
    // "args" stores the user input, use it to update Item's properties

    // VALIDATION
    // (graphql validates type automatically, we just need to check additional restrictions and determine which fields can/can't be updated)
    // Currently, this just checks if the user added anything to any field.

    let newName;
    if (!args.name) {
      newName = formerItem.name;
    }
    let newCost;
    if (!args.cost) {
      newCost = formerItem.cost;
    }
    let newFling_power;
    if (!args.name) {
      newFling_power = formerItem.fling_power;
    }
    let newFling_effect;
    if (!args.name) {
      newFling_effect = formerItem.fling_effect;
    }
    let newAttributes;
    if (!args.name) {
      newAttributes = formerItem.attributes;
    }
    let newEffect_entries;
    if (!args.name) {
      newEffect_entries = formerItem.effect_entries;
    }
    let newHeld_by_pokemon;
    if (!args.name) {
      newHeld_by_pokemon = formerItem.held_by_pokemon;
    }
    let newBaby_trigger_for;
    if (!args.name) {
      newBaby_trigger_for = formerItem.baby_trigger_for;
    }
    let newMachines;
    if (!args.name) {
      newMachines = formerItem.machines;
    }

    // after validation, find the item and update it.
    const updatedItem = await Item.findByIdAndUpdate(args.id, {
      // properties of Item to be updated
      name: newName,
      cost: newCost,
      fling_power: newFling_power,
      fling_effect: newFling_effect,
      attributes: newAttributes,
      effect_entries: newEffect_entries,
      held_by_pokemon: newHeld_by_pokemon,
      baby_trigger_for: newBaby_trigger_for,
      machines: newMachines,
    });
    return {
      // what do we want the user to have returned? The commented out code returns various fields to the user
      ...updatedItem._doc,
    };
  } catch (err) {
    throw err;
  }
}

async function removeOneItem(root, args, context, info) {
  try {
    const item = await Item.findById(args.id);
    const deletedItem = await Item.findByIdAndDelete(args.id);
    return {
      ...deletedItem._doc,
      _id: deletedItem.id,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getOneItem,
  getAllItems,
  addOneItem,
  updateOneItem,
  removeOneItem,
};
