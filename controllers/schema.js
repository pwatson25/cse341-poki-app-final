const graphql = require("graphql");
const User = require("../models/user.js");
const Item = require("../models/item.js");
const Move = require("../models/move.js");
const Pokemon = require("../models/pokemon.js");
const appConfig = require("../config/config.env");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({}),
});
const MoveType = new GraphQLObjectType({
  name: "Move",
  fields: () => ({}),
});
const PokemonType = new GraphQLObjectType({
  name: "Pokemon",
  fields: () => ({}),
});
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({}),
});

// root query to get all gear, all armor, or one gear or one armor.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description:
    "All GET-type queries. All queries require an Authorization header of type: 'Authorization: Bearer xxxx.yyyy.zzzz'",
  fields: {
    getOneItem: {
      description: "",
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        // try {
        //   // check that the item exists for the user
        //   let foundGear = CustomGear.findOne({
        //     _id: args.id,
        //     creator_id: context.identifier,
        //   });
        //   return foundGear;
        // } catch (err) {
        //   throw err;
        // }
      },
    },
    getOneMove: {
      description: "",
      type: MoveType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        // try {
        //   // check that the item exists for the user
        //   let foundGear = CustomGear.findOne({
        //     _id: args.id,
        //     creator_id: context.identifier,
        //   });
        //   return foundGear;
        // } catch (err) {
        //   throw err;
        // }
      },
    },
    getOnePokemon: {
      description: "",
      type: PokemonType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        // try {
        //   // check that the item exists for the user
        //   let foundGear = CustomGear.findOne({
        //     _id: args.id,
        //     creator_id: context.identifier,
        //   });
        //   return foundGear;
        // } catch (err) {
        //   throw err;
        // }
      },
    },
    getAllItems: {
      description: "",
      type: new graphql.GraphQLList(ItemType),
      resolve: async (root, args, context, info) => {
        // return CustomGear.find({ creator_id: context.identifier });
      },
    },
    getAllMoves: {
      description: "",
      type: new graphql.GraphQLList(MoveType),
      resolve: async (root, args, context, info) => {
        // return CustomGear.find({ creator_id: context.identifier });
      },
    },
    getAllPokemon: {
      description: "",
      type: new graphql.GraphQLList(PokemonType),
      resolve: async (root, args, context, info) => {
        // return CustomGear.find({ creator_id: context.identifier });
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
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          const item = new Item({
            // populate the mongoDB item with args
            // name: args.name,
            // cost: args.cost,
            // costType: args.costType,
            // weight: args.weight,
            // description: args.description,
            // creator_id: context.identifier,
          });
          const newItem = await item.save();
          return { ...newItem._doc, _id: newItem.id };
        } catch (err) {
          throw err;
        }
      },
    },
    addOneMove: {
      description: "",
      type: MoveType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          const move = new Move({
            // populate the mongoDB item with args
            // name: args.name,
            // cost: args.cost,
            // costType: args.costType,
            // weight: args.weight,
            // description: args.description,
            // creator_id: context.identifier,
          });
          const newMove = await move.save();
          return { ...newMove._doc, _id: newMove.id };
        } catch (err) {
          throw err;
        }
      },
    },
    addOnePokemon: {
      description: "",
      type: PokemonType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          const pokemon = new Pokemon({
            // populate the mongoDB item with args
            // name: args.name,
            // cost: args.cost,
            // costType: args.costType,
            // weight: args.weight,
            // description: args.description,
            // creator_id: context.identifier,
          });
          const newPokemon = await pokemon.save();
          return { ...newPokemon._doc, _id: newPokemon.id };
        } catch (err) {
          throw err;
        }
      },
    },
    updateOneItem: {
      description: "",
      type: ItemType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          const formerItem = await Item.findById(args.id);

          // "args" stores the user input, use it to update Item's properties

          // validation (graphql validates type automatically,
          // we just need to check additional restrictions
          // and determine which fields can/can't be updated)

          // after validation, find the item and update it.
          const updatedItem = await Item.findByIdAndUpdate(args.id, {
            // properties of Item to be updated
            // name: newName,
            // cost: newCost,
            // costType: newCostType,
            // weight: newWeight,
            // description: newDesc,
          });

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
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          const formerMove = await Move.findById(args.id);

          // "args" stores the user input, use it to update Item's properties

          // validation (graphql validates type automatically,
          // we just need to check additional restrictions
          // and determine which fields can/can't be updated)

          // after validation, find the item and update it.
          const updatedMove = await Move.findByIdAndUpdate(args.id, {
            // properties of Item to be updated
            // name: newName,
            // cost: newCost,
            // costType: newCostType,
            // weight: newWeight,
            // description: newDesc,
          });

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
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          const formerPokemon = await Pokemon.findById(args.id);

          // "args" stores the user input, use it to update Item's properties

          // validation (graphql validates type automatically,
          // we just need to check additional restrictions
          // and determine which fields can/can't be updated)

          // after validation, find the item and update it.
          const updatedPokemon = await Pokemon.findByIdAndUpdate(args.id, {
            // properties of Item to be updated
            // name: newName,
            // cost: newCost,
            // costType: newCostType,
            // weight: newWeight,
            // description: newDesc,
          });

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
