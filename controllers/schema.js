const graphql = require("graphql");
const { createImportSpecifier } = require("typescript");
const appConfig = require("../config/app");
const User = require("../models/user.js");
const Item = require("../models/item.js");
const Move = require("../models/move.js");
const Pokemon = require("../models/pokemon.js");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
} = graphql;

const DetailsType = new GraphQLObjectType({
  name: "DetailsType",
  fields: () => ({
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cost: { type: GraphQLInt },
    fling_power: { type: DetailsType },
    fling_effect: { type: DetailsType },
    attributes: { type: DetailsType },
    effect_entries: {
      effect: { type: GraphQLString },
      language: { type: DetailsType },
      short_effect: { type: GraphQLString },
    },
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
    contest_combos: {
      normal: {
        user_after: {
          user_before: { type: DetailsType },
          user_before: { type: DetailsType },
        },
      },
      super: {
        user_after: {
          user_before: { type: DetailsType },
          user_before: { type: DetailsType },
        },
      },
    },
    contest_type: { type: DetailsType },
    contest_effect: {
      url: { type: GraphQLString },
    },
    damage_class: { type: DetailsType },
    effect_entries: {
      effect: { type: GraphQLString },
      language: { type: DetailsType },
      short_effect: { type: GraphQLString },
    },
    effect_changes: {
      effect: { type: GraphQLString },
      language: { type: DetailsType },
      short_effect: { type: GraphQLString },
    },
    learned_by_pokemon: { type: DetailsType },
    generation: { type: DetailsType },
    machines: { type: DetailsType },
    meta: {
      ailment: { type: DetailsType },
      ailment_chance: { type: GraphQLInt },
      category: { type: DetailsType },
      crit_rate: { type: GraphQLInt },
      drain: { type: GraphQLInt },
      flinch_chance: { type: GraphQLInt },
      healing: { type: GraphQLInt },
      max_hits: { type: GraphQLInt },
      max_turns: { type: GraphQLInt },
      min_hits: { type: GraphQLInt },
      min_turns: { type: GraphQLInt },
      stat_chance: { type: GraphQLInt },
    },
    past_values: { type: DetailsType },
    stat_changes: { type: DetailsType },
    super_contest_effect: {
      url: { type: GraphQLString },
    },
    target: { type: DetailsType },
    type: { type: DetailsType },
  }),
});

const MoveListType = new GraphQLObjectType({
  name: "MoveListType",
  fields: () => ({
    move: { type: DetailsType },
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
    abilities: {
      ability: { type: DetailsType },
      is_hidden: { type: GraphQLBoolean },
      slot: { type: GraphQLInt },
    },
    forms: { type: DetailsType },
    held_items: {
      item: { type: DetailsType },
    },
    location_area_encounters: { type: GraphQLString },
    moves: { type: GraphQLList(MoveListType) },
    past_types: {
      slot: { type: GraphQLInt },
      type: { type: DetailsType },
    },
    species: { type: DetailsType },
    types: {
      slot: { type: GraphQLInt },
      type: { type: DetailsType },
    },
  }),
});
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    identifier: { type: GraphQLString },
    email: { type: GraphQLString },
    givenName: { type: GraphQLString },
    familyName: { type: GraphQLString },
    locale: { type: GraphQLString },
    picture: { type: GraphQLString },
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
          let foundItem = Item.findOne({
            _id: args.id,
          });
          return foundItem;
        } catch (err) {
          throw err;
        }
      },
    },
    getOneMove: {
      description: "Find one item. Requires the move's ID",
      type: MoveType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        try {
          let foundMove = Move.findOne({
            _id: args.id,
          });
          return foundMove;
        } catch (err) {
          throw err;
        }
      },
    },
    getOnePokemon: {
      description: "Find one item. Requires the pokemon's ID",
      type: PokemonType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        try {
          let foundPokemon = Pokemon.findOne({
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
        return Item.find({});
      },
    },
    getAllMoves: {
      description: "Returns all moves.",
      type: new graphql.GraphQLList(MoveType),
      resolve: async (root, args, context, info) => {
        return Move.find({});
      },
    },
    getAllPokemon: {
      description: "Returns all Pokemon",
      type: new graphql.GraphQLList(PokemonType),
      resolve: async (root, args, context, info) => {
        return Pokemon.find({});
      },
    },
  },
});

// Create Update Delete operations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description:
    "Used for making CREATE, PUT, and DELETE queries. All queries require an Authorization header of type: 'Authorization: Bearer xxxx.yyyy.zzzz'",
  fields: {
    addOneItem: {
      description: "",
      type: ItemType,
      args: {
        // name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        // cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        // weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          // const item = new Item({
          //   populate the mongoDB item with args
          //   name: args.name,
          //   cost: args.cost,
          //   costType: args.costType,
          //   weight: args.weight,
          //   description: args.description,
          //   creator_id: context.identifier,
          // });
          // const newItem = await item.save();
          // return { ...newItem._doc, _id: newItem.id };
        } catch (err) {
          throw err;
        }
      },
    },
    addOneMove: {
      description: "",
      type: MoveType,
      args: {
        // name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        // cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        // weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          // const move = new Move({
          // populate the mongoDB item with args
          // name: args.name,
          // cost: args.cost,
          // costType: args.costType,
          // weight: args.weight,
          // description: args.description,
          // creator_id: context.identifier,
          // });
          // const newMove = await move.save();
          // return { ...newMove._doc, _id: newMove.id };
        } catch (err) {
          throw err;
        }
      },
    },
    addOnePokemon: {
      description: "",
      type: PokemonType,
      args: {
        // name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        // cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        // weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          // const pokemon = new Pokemon({
          // populate the mongoDB item with args
          // name: args.name,
          // cost: args.cost,
          // costType: args.costType,
          // weight: args.weight,
          // description: args.description,
          // creator_id: context.identifier,
          // });
          // const newPokemon = await pokemon.save();
          // return { ...newPokemon._doc, _id: newPokemon.id };
        } catch (err) {
          throw err;
        }
      },
    },
    updateOneItem: {
      description: "",
      type: ItemType,
      args: {
        // name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        // cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        // weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // description: { type: new graphql.GraphQLNonNull(GraphQLString) },
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
      description: "",
      type: MoveType,
      args: {
        // name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        // cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        // weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // description: { type: new graphql.GraphQLNonNull(GraphQLString) },
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
      description: "",
      type: PokemonType,
      args: {
        // name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        // cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        // weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        // description: { type: new graphql.GraphQLNonNull(GraphQLString) },
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
      description: "",
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
      description: "",
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
      description: "",
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
