const {
  createImportSpecifier,
  isExternalModuleReference,
} = require("typescript");
const Move = require("../../models/move.js");

async function getOneMove(root, args, context, info) {
  try {
    let foundMove = await Move.findOne({
      _id: args.id,
    });
    return foundMove;
  } catch (err) {
    throw err;
  }
}

async function getAllMoves(root, args, context, info) {
  try {
    const result = await Move.find();
    return result;
  } catch (err) {
    throw err;
  }
}

async function addOneMove(root, args, context, info) {
  try {
    const move = new Move({
      // populate the mongoDB item with args
      name: args.name,
      accuracy: args.accuracy,
      effect_chance: args.effect_chance,
      pp: args.pp,
      priority: args.priority,
      power: args.power,
      contest_combos: args.contest_combos,
      contest_type: args.contest_type,
      contest_effect: args.contest_effect,
      damage_class: args.damage_class,
      effect_entries: args.effect_entries,
      effect_changes: args.effect_changes,
      learned_by_pokemon: args.learned_by_pokemon,
      generation: args.generation,
      machines: args.machines,
      meta: args.meta,
      past_values: args.past_values,
      stat_changes: args.stat_changes,
      super_contest_effect: args.super_contest_effect,
      target: args.target,
      type: args.type,
    });
    const newMove = await move.save();
    return { ...newMove._doc, _id: newMove.id };
  } catch (err) {
    throw err;
  }
}

async function updateOneMove(root, args, context, info) {
  try {
    const formerMove = await Move.findById(args.id);
    // "args" stores the user input, use it to update Item's properties

    // VALIDATION
    // (graphql validates type automatically, we just need to check additional restrictions and determine which fields can/can't be updated)
    let newName;
    if (!args.name) {
      newName = formerMove.name;
    }
    let newAccuracy;
    if (!args.accuracy) {
      newAccuracy = formerMove.accuracy;
    }
    let newEffect_chance;
    if (!args.effect_chance) {
      newEffect_chance = formerMove.effect_chance;
    }
    let newPp;
    if (!args.pp) {
      newPp = formerMove.pp;
    }
    let newPriority;
    if (!args.priority) {
      newPriority = formerMove.priority;
    }
    let newPower;
    if (!args.power) {
      newPower = formerMove.power;
    }
    let newContest_combos;
    if (!args.contest_combos) {
      newContest_combos = formerMove.contest_combos;
    }
    let newContest_type;
    if (!args.contest_type) {
      newContest_type = formerMove.contest_type;
    }
    let newContest_effect;
    if (!args.contest_effect) {
      newContest_effect = formerMove.contest_effect;
    }
    let newDamage_class;
    if (!args.damage_class) {
      newDamage_class = formerMove.damage_class;
    }
    let newEffect_entries;
    if (!args.effect_entries) {
      newEffect_entries = formerMove.effect_entries;
    }
    let newEffect_changes;
    if (!args.effect_changes) {
      newEffect_changes = formerMove.effect_changes;
    }
    let newLearned_by_pokemon;
    if (!args.learned_by_pokemon) {
      newLearned_by_pokemon = formerMove.learned_by_pokemon;
    }
    let newGeneration;
    if (!args.generation) {
      newGeneration = formerMove.generation;
    }
    let newMachines;
    if (!args.machines) {
      newMachines = formerMove.machines;
    }
    let newMeta;
    if (!args.meta) {
      newMeta = formerMove.meta;
    }
    let newPast_values;
    if (!args.past_values) {
      newPast_values = formerMove.past_values;
    }
    let newStat_changes;
    if (!args.stat_changes) {
      newStat_changes = formerMove.stat_changes;
    }
    let newSuper_contest_effect;
    if (!args.super_contest_effect) {
      newSuper_contest_effect = formerMove.super_contest_effect;
    }
    let newTarget;
    if (!args.target) {
      newTarget = formerMove.target;
    }
    let newType;
    if (!args.type) {
      newType = formerMove.type;
    }

    // after validation, find the item and update it.
    const updatedMove = await Move.findByIdAndUpdate(args.id, {
      // properties of Item to be updated
      name: newName,
      accuracy: newAccuracy,
      effect_chance: newEffect_chance,
      pp: newPp,
      priority: newPriority,
      power: newPower,
      contest_combos: newContest_combos,
      contest_type: newContest_type,
      contest_effect: newContest_effect,
      damage_class: newDamage_class,
      effect_entries: newEffect_entries,
      effect_changes: newEffect_changes,
      learned_by_pokemon: newLearned_by_pokemon,
      generation: newGeneration,
      machines: newMachines,
      meta: newMeta,
      past_values: newPast_values,
      stat_changes: newStat_changes,
      super_contest_effect: newSuper_contest_effect,
      target: newTarget,
      type: newType,
    });
    return {
      // what do we want the user to have returned? The commented out code returns various fields to the user
      ...updatedMove._doc,
      // id: updatedGear.id,
      // name: updatedGear.name,
      // cost: updatedGear.cost,
      // costType: updatedGear.costType,
      // weight: updatedGear.weight,
      // description: updatedGear.description,
    };
  } catch (err) {
    throw err;
  }
}

async function removeOneMove(root, args, context, info) {
  try {
    const move = await Move.findById(args.id);
    const deletedMove = await Move.findByIdAndDelete(args.id);
    return {
      ...deletedMove._doc,
      _id: deletedMove.id,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getOneMove,
  getAllMoves,
  addOneMove,
  updateOneMove,
  removeOneMove,
};
