const {
  createImportSpecifier,
  isExternalModuleReference,
} = require("typescript");
const Pokemon = require("../../models/pokemon.js");

async function getOnePokemon(root, args, context, info) {
  try {
    let foundPokemon = await Pokemon.findOne({
      _id: args.id,
    });
    return foundPokemon;
  } catch (err) {
    throw err;
  }
}

async function getAllPokemon(root, args, context, info) {
  try {
    const result = await Pokemon.find({});
    return result;
  } catch (err) {
    throw err;
  }
}

async function addOnePokemon(root, args, context, info) {
  try {
    const pokemon = new Pokemon({
      // populate the mongoDB item with args
      name: args.name,
      base_experience: args.base_experience,
      height: args.height,
      is_default: args.is_default,
      order: args.order,
      weight: args.weight,
      abilities: args.abilities,
      forms: args.forms,
      held_items: args.held_items,
      location_area_encounters: args.location_area_encounters,
      moves: args.moves,
      past_types: args.past_types,
      species: args.species,
      types: args.types,
    });
    const newPokemon = await pokemon.save();
    return { ...newPokemon._doc, _id: newPokemon.id };
  } catch (err) {
    throw err;
  }
}

async function updateOnePokemon(root, args, context, info) {
  try {
    const formerPokemon = await Pokemon.findById(args.id);
    // "args" stores the user input, use it to update Item's properties

    // for (const property in formerPokemon._doc) {
    //   console.log(`${property}: ${formerPokemon._doc[property]}`);
    // }
    // console.log(formerPokemon._doc);

    // VALIDATION
    // (graphql validates type automatically, we just need to check additional restrictions and determine which fields can/can't be updated)
    let newName;
    if (!args.name) {
      newName = formerPokemon.name;
    }
    let newBase_experience;
    if (!args.base_experience) {
      newBase_experience = formerPokemon.base_experience;
    }
    let newHeight;
    if (!args.height) {
      newHeight = formerPokemon.height;
    }
    let newIs_default;
    if (!args.is_default) {
      newIs_default = formerPokemon.is_default;
    }
    let newOrder;
    if (!args.order) {
      newOrder = formerPokemon.order;
    }
    let newWeight;
    if (!args.weight) {
      newWeight = formerPokemon.weight;
    }
    let newAbilities;
    if (!args.abilities) {
      newAbilities = formerPokemon.abilities;
    }
    let newForms;
    if (!args.forms) {
      newForms = formerPokemon.forms;
    }
    let newHeld_items;
    if (!args.held_items) {
      newHeld_items = formerPokemon.held_items;
    }
    let newLocation_area_encounters;
    if (!args.location_area_encounters) {
      newLocation_area_encounters = formerPokemon.location_area_encounters;
    }
    let newMoves;
    if (!args.moves) {
      newMoves = formerPokemon.moves;
    }
    let newPast_types;
    if (!args.past_types) {
      newPast_types = formerPokemon.past_types;
    }
    let newSpecies;
    if (!args.species) {
      newSpecies = formerPokemon.species;
    }
    let newTypes;
    if (!args.types) {
      newTypes = formerPokemon.types;
    }
    // after validation, find the item and update it.
    const updatedPokemon = await Pokemon.findByIdAndUpdate(args.id, {
      // properties of Item to be updated
      name: newName,
      base_experience: newBase_experience,
      height: newHeight,
      is_default: newIs_default,
      order: newOrder,
      weight: newWeight,
      abilities: newAbilities,
      forms: newForms,
      held_items: newHeld_items,
      location_area_encounters: newLocation_area_encounters,
      moves: newMoves,
      past_types: newPast_types,
      species: newSpecies,
      types: newTypes,
    });
    return {
      // what do we want the user to have returned? The commented out code returns various fields to the user
      ...updatedPokemon._doc,
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

async function removeOnePokemon(root, args, context, info) {
  try {
    const pokemon = await Pokemon.findById(args.id);
    const deletedPokemon = await Pokemon.findByIdAndDelete(args.id);
    return {
      ...deletedPokemon._doc,
      _id: deletedPokemon.id,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getOnePokemon,
  getAllPokemon,
  addOnePokemon,
  updateOnePokemon,
  removeOnePokemon,
};
