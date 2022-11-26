const graphql = require("graphql");
const {
  createImportSpecifier,
  isExternalModuleReference,
} = require("typescript");
const appConfig = require("../config/app");
const Item = require("../models/item.js");
const Move = require("../models/move.js");
const Pokemon = require("../models/pokemon.js");

const inputTypes = require("../models/graphQLInputTypes.js");
const outputTypes = require("../models/graphQLOutputTypes.js");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
} = graphql;

// These must be used when making new base types
const {
  DetailsType,
  EffectEntriesType,
  ContestCombosType,
  // ContestCombosTypeDetail,
  // UserAfterBeforeType,
  ConetstEffectType,
  MoveMetaType,
  MoveListType,
  PokemonAbilitiesType,
  ItemListType,
  PokemonSpeciesType,
} = outputTypes;

// These must be used when making a new Mutation method.
const {
  DetailsInputType,
  EffectEntriesInputType,
  ContestCombosInputType,
  ConetstEffectInputType,
  MoveMetaInputType,
  MoveListInputType,
  PokemonAbilitiesInputType,
  ItemListInputType,
  PokemonSpeciesInputType,
} = inputTypes;

// Types representing the collections
const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cost: { type: GraphQLInt },
    fling_power: { type: GraphQLInt },
    fling_effect: { type: DetailsType },
    attributes: { type: DetailsType },
    effect_entries: { type: EffectEntriesType },
    held_by_pokemon: { type: DetailsType },
    baby_trigger_for: { type: DetailsType },
    machines: { type: DetailsType },
  }),
});

const MoveType = new GraphQLObjectType({
  name: "Move",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    accuracy: { type: GraphQLInt },
    effect_chance: { type: GraphQLInt },
    pp: { type: GraphQLInt },
    priority: { type: GraphQLInt },
    power: { type: GraphQLInt },
    contest_combos: { type: ContestCombosType },
    contest_type: { type: DetailsType },
    contest_effect: { type: ConetstEffectType },
    damage_class: { type: DetailsType },
    effect_entries: { type: EffectEntriesType },
    effect_changes: { type: EffectEntriesType },
    learned_by_pokemon: { type: DetailsType },
    generation: { type: DetailsType },
    machines: { type: DetailsType },
    meta: { type: MoveMetaType },
    past_values: { type: DetailsType },
    stat_changes: { type: DetailsType },
    super_contest_effect: { type: ConetstEffectType },
    target: { type: DetailsType },
    type: { type: DetailsType },
  }),
});

const PokemonType = new GraphQLObjectType({
  name: "Pokemon",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    base_experience: { type: GraphQLInt },
    height: { type: GraphQLInt },
    is_default: { type: GraphQLBoolean },
    order: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    abilities: { type: PokemonAbilitiesType },
    forms: { type: DetailsType },
    held_items: { type: ItemListType },
    location_area_encounters: { type: GraphQLString },
    moves: { type: GraphQLList(MoveListType) },
    past_types: { type: PokemonSpeciesType },
    species: { type: DetailsType },
    types: { type: PokemonSpeciesType },
  }),
});

// root query is used to perform READ operations
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "All GET-type queries.",
  fields: {
    getOneItem: {
      description: "Find one item. Requires the item's ID",
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        try {
          let foundItem = await Item.findOne({
            _id: args.id,
          });
          return foundItem;
        } catch (err) {
          throw err;
        }
      },
    },
    getOneMove: {
      description: "Find one move. Requires the move's ID",
      type: MoveType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        try {
          let foundMove = await Move.findOne({
            _id: args.id,
          });
          return foundMove;
        } catch (err) {
          throw err;
        }
      },
    },
    getOnePokemon: {
      description: "Find one pokemon. Requires the pokemon's ID",
      type: PokemonType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        try {
          let foundPokemon = await Pokemon.findOne({
            _id: args.id,
          });
          return foundPokemon;
        } catch (err) {
          throw err;
        }
      },
    },
    getAllItems: {
      description: "Returns all items.",
      type: new graphql.GraphQLList(ItemType),
      resolve: async (root, args, context, info) => {
        try {
          const result = await Item.find();
          return result;
        } catch (err) {
          throw err;
        }
      },
    },
    getAllMoves: {
      description: "Returns all moves.",
      type: new graphql.GraphQLList(MoveType),
      resolve: async (root, args, context, info) => {
        try {
          const result = await Move.find();
          return result;
        } catch (err) {
          throw err;
        }
      },
    },
    getAllPokemon: {
      description: "Returns all Pokemon",
      type: new graphql.GraphQLList(PokemonType),
      resolve: async (root, args, context, info) => {
        try {
          const result = await Pokemon.find();
          return result;
        } catch (err) {
          throw err;
        }
      },
    },
  },
});

// Mutation is used to perform Create Update and Delete operations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Used for making CREATE, PUT, and DELETE queries.",
  fields: {
    addOneItem: {
      description:
        "Add one item to the Items collection. All fields are required, except ID which is auto-generated. Returns the created item.",
      type: ItemType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        fling_power: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        fling_effect: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        attributes: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        effect_entries: {
          type: new graphql.GraphQLNonNull(EffectEntriesInputType),
        },
        held_by_pokemon: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        baby_trigger_for: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        machines: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
      },
      resolve: async (root, args, context, info) => {
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
      },
    },
    addOneMove: {
      description:
        "Add one item to the Moves collection. All fields are required, except ID which is auto-generated. Returns the created move.",
      type: MoveType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        accuracy: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        effect_chance: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        pp: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        priority: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        power: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        contest_combos: {
          type: new graphql.GraphQLNonNull(ContestCombosInputType),
        },
        contest_type: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        contest_effect: {
          type: new graphql.GraphQLNonNull(ConetstEffectInputType),
        },
        damage_class: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        effect_entries: {
          type: new graphql.GraphQLNonNull(EffectEntriesInputType),
        },
        effect_changes: {
          type: new graphql.GraphQLNonNull(EffectEntriesInputType),
        },
        learned_by_pokemon: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        generation: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        machines: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        meta: {
          type: new graphql.GraphQLNonNull(MoveMetaInputType),
        },
        past_values: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        stat_changes: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        super_contest_effect: {
          type: new graphql.GraphQLNonNull(ConetstEffectInputType),
        },
        target: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        type: { type: new graphql.GraphQLNonNull(DetailsInputType) },
      },
      resolve: async (root, args, context, info) => {
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
      },
    },
    addOnePokemon: {
      description:
        "Add one item to the Pokemons collection. All fields are required, except ID which is auto-generated. Returns the created pokemon.",
      type: PokemonType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        base_experience: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        height: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        is_default: { type: new graphql.GraphQLNonNull(GraphQLBoolean) },
        order: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        abilities: {
          type: new graphql.GraphQLNonNull(PokemonAbilitiesInputType),
        },
        forms: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        held_items: {
          type: new graphql.GraphQLNonNull(GraphQLList(ItemListInputType)),
        },
        location_area_encounters: {
          type: new graphql.GraphQLNonNull(GraphQLString),
        },
        moves: {
          type: new graphql.GraphQLNonNull(GraphQLList(MoveListInputType)),
        },
        past_types: {
          type: new graphql.GraphQLNonNull(PokemonSpeciesInputType),
        },
        species: {
          type: new graphql.GraphQLNonNull(DetailsInputType),
        },
        types: {
          type: new graphql.GraphQLNonNull(PokemonSpeciesInputType),
        },
      },
      resolve: async (root, args, context, info) => {
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
      },
    },
    updateOneItem: {
      description:
        "Update one item in the Items collection. Only the ID is required.",
      type: ItemType,
      args: {
        id: { type: graphql.GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        cost: { type: GraphQLInt },
        fling_power: { type: GraphQLInt },
        fling_effect: { type: DetailsInputType },
        attributes: { type: DetailsInputType },
        effect_entries: { type: EffectEntriesInputType },
        held_by_pokemon: { type: DetailsInputType },
        baby_trigger_for: { type: DetailsInputType },
        machines: { type: DetailsInputType },
      },
      resolve: async (root, args, context, info) => {
        try {
          // const formerItem = await Item.findById(args.id);
          // "args" stores the user input, use it to update Item's properties
          // validation (graphql validates type automatically,
          // we just need to check additional restrictions
          // and determine which fields can/can't be updated)
          // after validation, find the item and update it.
          // const updatedItem = await Item.findByIdAndUpdate(args.id, {
          // properties of Item to be updated
          // name: newName,
          // cost: newCost,
          // costType: newCostType,
          // weight: newWeight,
          // description: newDesc,
          // });
          return {
            // what do we want the user to have returned? The commented out code returns various fields to the user
            // ...updatedGear._doc,
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
      },
    },
    updateOneMove: {
      description:
        "Update one move in the Moves collection. Only the ID is required.",
      type: MoveType,
      args: {
        id: { type: graphql.GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        accuracy: { type: GraphQLInt },
        effect_chance: { type: GraphQLInt },
        pp: { type: GraphQLInt },
        priority: { type: GraphQLInt },
        power: { type: GraphQLInt },
        contest_combos: { type: ContestCombosInputType },
        contest_type: { type: DetailsInputType },
        contest_effect: { type: ConetstEffectInputType },
        damage_class: { type: DetailsInputType },
        effect_entries: { type: EffectEntriesInputType },
        effect_changes: { type: EffectEntriesInputType },
        learned_by_pokemon: { type: DetailsInputType },
        generation: { type: DetailsInputType },
        machines: { type: DetailsInputType },
        meta: { type: MoveMetaInputType },
        past_values: { type: DetailsInputType },
        stat_changes: { type: DetailsInputType },
        super_contest_effect: { type: ConetstEffectInputType },
        target: { type: DetailsInputType },
        type: { type: DetailsInputType },
      },
      resolve: async (root, args, context, info) => {
        try {
          // const formerMove = await Move.findById(args.id);
          // "args" stores the user input, use it to update Item's properties
          // validation (graphql validates type automatically,
          // we just need to check additional restrictions
          // and determine which fields can/can't be updated)
          // after validation, find the item and update it.
          // const updatedMove = await Move.findByIdAndUpdate(args.id, {
          // properties of Item to be updated
          // name: newName,
          // cost: newCost,
          // costType: newCostType,
          // weight: newWeight,
          // description: newDesc,
          // });
          return {
            // what do we want the user to have returned? The commented out code returns various fields to the user
            // ...updatedGear._doc,
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
      },
    },
    updateOnePokemon: {
      description:
        "Update one item in the Pokemons collection. Only the ID is required.",
      type: PokemonType,
      args: {
        id: { type: graphql.GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        base_experience: { type: GraphQLInt },
        height: { type: GraphQLInt },
        is_default: { type: GraphQLBoolean },
        order: { type: GraphQLInt },
        weight: { type: GraphQLInt },
        abilities: { type: PokemonAbilitiesInputType },
        forms: { type: DetailsInputType },
        held_items: { type: GraphQLList(ItemListInputType) },
        location_area_encounters: { type: GraphQLString },
        moves: { type: GraphQLList(MoveListInputType) },
        past_types: { type: PokemonSpeciesInputType },
        species: { type: DetailsInputType },
        types: { type: PokemonSpeciesInputType },
      },
      resolve: async (root, args, context, info) => {
        try {
          // const formerPokemon = await Pokemon.findById(args.id);
          // "args" stores the user input, use it to update Item's properties
          // validation (graphql validates type automatically,
          // we just need to check additional restrictions
          // and determine which fields can/can't be updated)
          // after validation, find the item and update it.
          // const updatedPokemon = await Pokemon.findByIdAndUpdate(args.id, {
          // properties of Item to be updated
          // name: newName,
          // cost: newCost,
          // costType: newCostType,
          // weight: newWeight,
          // description: newDesc,
          // });
          return {
            // what do we want the user to have returned? The commented out code returns various fields to the user
            // ...updatedGear._doc,
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
      },
    },
    removeOneItem: {
      description:
        "Deletes the specified Item from the Items collection. Requires the ID.",
      type: ItemType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context, info) => {
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
      },
    },
    removeOneMove: {
      description:
        "Deletes the specified Move from the Moves collection. Requires the ID.",
      type: MoveType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context, info) => {
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
      },
    },
    removeOnePokemon: {
      description:
        "Deletes the specified Pokemon from the Pokemons collection. Requires the ID.",
      type: PokemonType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context, info) => {
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
      },
    },
  },
});

// create new schema with options query which defines the query we will allow users to use when they are making a request.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
