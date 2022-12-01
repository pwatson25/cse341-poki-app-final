const graphql = require("graphql");
const {
  createImportSpecifier,
  isExternalModuleReference,
} = require("typescript");
const User = require("../../models/User.js");

async function getOneUserPokemon(root, args, context, info) {
  try {
    let foundUser = await User.findOne({
      identifier: context.identifier,
    });

    for (let poke in foundUser.pokemon) {
      let stored_id = foundUser.pokemon[poke];
      if (stored_id == args.id) {
        return await Pokemon.findOne({ _id: stored_id });
      }
    }
  } catch (err) {
    throw err;
  }
}

async function getAllUserPokemon(root, args, context, info) {
  try {
    let foundUser = await User.findOne({
      identifier: context.identifier,
    });
    // console.log(foundUser.pokemon);

    let foundPokemon = [];
    for (let poke in foundUser.pokemon) {
      let stored_id = foundUser.pokemon[poke];
      foundPokemon.push(await Pokemon.findOne({ _id: stored_id }));
    }
    // console.log(foundPokemon);
    return foundPokemon;
  } catch (err) {
    throw err;
  }
}

async function addOneUserPokemon(root, args, context, info) {
  try {
    let foundUser = await User.findOne({
      identifier: context.identifier,
    });
    let foundPokemon = await Pokemon.findOne({ _id: args.id });
    foundUser.pokemon.push(foundPokemon);
    foundUser.save();
    return { ...foundUser.pokemon };
  } catch (err) {
    throw err;
  }
}

async function removeOneUserPokemon(root, args, context, info) {
  try {
    let foundUser = await User.findOne({
      identifier: context.identifier,
    });

    let ogList = foundUser.pokemon;
    let newPokemonList = ogList.filter(function (value, index, arr) {
      return value != args.id;
    });

    let itemsToRemove = ogList.filter(function (value, index, arr) {
      return value == args.id;
    });
    if (itemsToRemove.length > 1) {
      itemsToRemove.splice(0, 1);
      for (let i = 0; i < itemsToRemove.length; i++) {
        newPokemonList.push(itemsToRemove[i]);
      }
    }
    foundUser.pokemon = newPokemonList;
    foundUser.save();
    return { ...foundUser.pokemon };
  } catch (err) {
    throw err;
  }
}

async function getOneUserItem(root, args, context, info) {
  try {
    let foundUser = await User.findOne({
      identifier: context.identifier,
    });

    for (let item in foundUser.itemInventory) {
      let stored_id = foundUser.itemInventory[item];
      if (stored_id == args.id) {
        return await Item.findOne({ _id: stored_id });
      }
    }
  } catch (err) {
    throw err;
  }
}

async function getAllUserItems(root, args, context, info) {
  try {
    let foundUser = await User.findOne({
      identifier: context.identifier,
    });
    // console.log(foundUser.pokemon);

    let foundItems = [];
    for (let item in foundUser.itemInventory) {
      let stored_id = foundUser.itemInventory[item];
      foundItems.push(await Item.findOne({ _id: stored_id }));
    }
    // console.log(foundPokemon);
    return foundItems;
  } catch (err) {
    throw err;
  }
}

async function addOneUserItem(root, args, context, info) {
  try {
    let foundUser = await User.findOne({
      identifier: context.identifier,
    });
    let foundItem = await Item.findOne({ _id: args.id });
    foundUser.itemInventory.push(foundItem);
    foundUser.save();
    return { ...foundUser.itemInventory };
  } catch (err) {
    throw err;
  }
}

async function removeOneUserItem(root, args, context, info) {
  try {
    let foundUser = await User.findOne({
      identifier: context.identifier,
    });

    let ogList = foundUser.itemInventory;
    let newItemList = ogList.filter(function (value, index, arr) {
      return value != args.id;
    });

    let itemsToRemove = ogList.filter(function (value, index, arr) {
      return value == args.id;
    });
    if (itemsToRemove.length > 1) {
      itemsToRemove.splice(0, 1);
      for (let i = 0; i < itemsToRemove.length; i++) {
        newItemList.push(itemsToRemove[i]);
      }
    }
    foundUser.itemInventory = newItemList;
    foundUser.save();
    return { ...foundUser.itemInventory };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getOneUserPokemon,
  getAllUserPokemon,
  addOneUserPokemon,
  removeOneUserPokemon,
  getOneUserItem,
  getAllUserItems,
  addOneUserItem,
  removeOneUserItem,
};
