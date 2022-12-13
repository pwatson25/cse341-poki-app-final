const graphql = require('graphql');
const {
  createImportSpecifier,
  isExternalModuleReference,
} = require('typescript');
const appConfig = require('../config/app');
const Item = require('../models/item.js');
const Move = require('../models/move.js');
const Pokemon = require('../models/pokemon.js');
const User = require('../models/User.js');

const inputTypes = require('../models/graphQLInputTypes.js');
const outputTypes = require('../models/graphQLOutputTypes.js');

const itemResolvers = require('./resolvers/itemResolvers');
const moveResolvers = require('./resolvers/moveResolvers');
const pokemonResolvers = require('./resolvers/pokemonResolvers');
const userResolvers = require('./resolvers/userResolvers');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  y,
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
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cost: { type: GraphQLInt },
    fling_power: { type: GraphQLInt },
    fling_effect: { type: GraphQLList(DetailsType) },
    attributes: { type: GraphQLList(DetailsType) },
    effect_entries: { type: GraphQLList(EffectEntriesType) },
    held_by_pokemon: { type: GraphQLList(DetailsType) },
    baby_trigger_for: { type: GraphQLList(DetailsType) },
    machines: { type: GraphQLList(DetailsType) },
  }),
});

const MoveType = new GraphQLObjectType({
  name: 'Move',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    accuracy: { type: GraphQLInt },
    effect_chance: { type: GraphQLInt },
    pp: { type: GraphQLInt },
    priority: { type: GraphQLInt },
    power: { type: GraphQLInt },
    contest_combos: { type: GraphQLList(ContestCombosType) },
    contest_type: { type: GraphQLList(DetailsType) },
    contest_effect: { type: GraphQLList(ConetstEffectType) },
    damage_class: { type: GraphQLList(DetailsType) },
    effect_entries: { type: GraphQLList(EffectEntriesType) },
    effect_changes: { type: GraphQLList(EffectEntriesType) },
    learned_by_pokemon: { type: GraphQLList(DetailsType) },
    generation: { type: GraphQLList(DetailsType) },
    machines: { type: GraphQLList(DetailsType) },
    meta: { type: GraphQLList(MoveMetaType) },
    past_values: { type: GraphQLList(DetailsType) },
    stat_changes: { type: GraphQLList(DetailsType) },
    super_contest_effect: { type: GraphQLList(ConetstEffectType) },
    target: { type: GraphQLList(DetailsType) },
    type: { type: GraphQLList(DetailsType) },
  }),
});

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    base_experience: { type: GraphQLInt },
    height: { type: GraphQLInt },
    is_default: { type: GraphQLBoolean },
    order: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    abilities: { type: GraphQLList(PokemonAbilitiesType) },
    forms: { type: GraphQLList(DetailsType) },
    held_items: { type: GraphQLList(ItemListType) },
    location_area_encounters: { type: GraphQLString },
    moves: { type: GraphQLList(MoveListType) },
    past_types: { type: GraphQLList(PokemonSpeciesType) },
    species: { type: DetailsType },
    types: { type: GraphQLList(PokemonSpeciesType) },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    identifier: { type: GraphQLString },
    email: { type: GraphQLString },
    givenName: { type: GraphQLString },
    familyName: { type: GraphQLString },
    locale: { type: GraphQLString },
    picture: { type: GraphQLString },
    pokemon: { type: GraphQLList(PokemonType) },
    itemInventory: { type: GraphQLList(ItemType) },
  }),
});

// root query is used to perform READ operations
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'All GET-type queries.',
  fields: {
    getOneItem: {
      description: "Find one item. Requires the item's ID",
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        return itemResolvers.getOneItem(root, args, context, info);
      },
    },
    getOneMove: {
      description: "Find one move. Requires the move's ID",
      type: MoveType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        return moveResolvers.getOneMove(root, args, context, info);
      },
    },
    getOnePokemon: {
      description: "Find one pokemon. Requires the pokemon's ID",
      type: PokemonType,
      args: {
        id: { type: new graphql.GraphQLNonNull(GraphQLID) },
      },
      resolve: async (root, args, context, info) => {
        return pokemonResolvers.getOnePokemon(root, args, context, info);
      },
    },
    getOneUserPokemon: {
      description:
        "Find one pokemon from the user's stored pokemon. Requires the pokemon's ID",
      type: PokemonType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        return userResolvers.getOneUserPokemon(root, args, context, info);
      },
    },
    getOneUserItem: {
      description:
        "Find one item from the user's inventory. Requires the item's ID",
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        return userResolvers.getOneUserItem(root, args, context, info);
      },
    },
    getAllItems: {
      description: 'Returns all items.',
      type: new graphql.GraphQLList(ItemType),
      resolve: async (root, args, context, info) => {
        return itemResolvers.getAllItems(root, args, context, info);
      },
    },
    getAllMoves: {
      description: 'Returns all moves.',
      type: new graphql.GraphQLList(MoveType),
      resolve: async (root, args, context, info) => {
        return moveResolvers.getAllMoves(root, args, context, info);
      },
    },
    getAllPokemon: {
      description: 'Returns all Pokemon',
      type: new graphql.GraphQLList(PokemonType),
      resolve: async (root, args, context, info) => {
        return pokemonResolvers.getAllPokemon(root, args, context, info);
      },
    },
    getAllUserPokemon: {
      description: 'Returns all Pokemon the User owns',
      type: new graphql.GraphQLList(PokemonType),
      // type: UserType,
      resolve: async (root, args, context, info) => {
        return userResolvers.getAllUserPokemon(root, args, context, info);
      },
    },
    getAllUserItems: {
      description: 'Returns all Items the User owns',
      type: new graphql.GraphQLList(ItemType),
      // type: UserType,
      resolve: async (root, args, context, info) => {
        return userResolvers.getAllUserItems(root, args, context, info);
      },
    },
  },
});

// Mutation is used to perform Create Update and Delete operations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Used for making CREATE, PUT, and DELETE queries.',
  fields: {
    addOneItem: {
      description:
        'Add one item to the Items collection. Returns the created item.',
      type: ItemType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        fling_power: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        fling_effect: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        attributes: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        effect_entries: {
          type: new graphql.GraphQLNonNull(GraphQLList(EffectEntriesInputType)),
        },
        held_by_pokemon: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        baby_trigger_for: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        machines: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
      },
      resolve: async (root, args, context, info) => {
        return itemResolvers.addOneItem(root, args, context, info);
      },
    },
    addOneMove: {
      description:
        'Add one item to the Moves collection. Returns the created move.',
      type: MoveType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        accuracy: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        effect_chance: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        pp: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        priority: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        power: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        contest_combos: {
          type: new graphql.GraphQLNonNull(GraphQLList(ContestCombosInputType)),
        },
        contest_type: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        contest_effect: {
          type: new graphql.GraphQLNonNull(GraphQLList(ConetstEffectInputType)),
        },
        damage_class: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        effect_entries: {
          type: new graphql.GraphQLNonNull(GraphQLList(EffectEntriesInputType)),
        },
        effect_changes: {
          type: new graphql.GraphQLNonNull(GraphQLList(EffectEntriesInputType)),
        },
        learned_by_pokemon: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        generation: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        machines: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        meta: {
          type: new graphql.GraphQLNonNull(GraphQLList(MoveMetaInputType)),
        },
        past_values: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        stat_changes: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        super_contest_effect: {
          type: new graphql.GraphQLNonNull(GraphQLList(ConetstEffectInputType)),
        },
        target: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
        type: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
        },
      },
      resolve: async (root, args, context, info) => {
        return moveResolvers.addOneMove(root, args, context, info);
      },
    },
    addOnePokemon: {
      description:
        'Add one item to the Pokemons collection. Returns the created pokemon.',
      type: PokemonType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        base_experience: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        height: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        is_default: { type: new graphql.GraphQLNonNull(GraphQLBoolean) },
        order: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        abilities: {
          type: new graphql.GraphQLNonNull(
            GraphQLList(PokemonAbilitiesInputType)
          ),
        },
        forms: {
          type: new graphql.GraphQLNonNull(GraphQLList(DetailsInputType)),
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
        return pokemonResolvers.addOnePokemon(root, args, context, info);
      },
    },
    addOneUserPokemon: {
      description:
        "Add one item to the User's pokemon. Requires the ID of the desired pokemon.",
      type: UserType,
      args: {
        id: { type: new graphql.GraphQLNonNull(GraphQLID) },
      },
      resolve: async (root, args, context, info) => {
        return userResolvers.addOneUserPokemon(root, args, context, info);
      },
    },
    addOneUserItem: {
      description:
        "Add one item to the User's item inventory. Requires the ID of the desired item.",
      type: UserType,
      args: {
        id: { type: new graphql.GraphQLNonNull(GraphQLID) },
      },
      resolve: async (root, args, context, info) => {
        return userResolvers.addOneUserItem(root, args, context, info);
      },
    },
    updateOneItem: {
      description:
        'Update one item in the Items collection. Only the ID is required.',
      type: ItemType,
      args: {
        id: { type: graphql.GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        cost: { type: GraphQLInt },
        fling_power: { type: GraphQLInt },
        fling_effect: { type: GraphQLList(DetailsInputType) },
        attributes: { type: GraphQLList(DetailsInputType) },
        effect_entries: { type: GraphQLList(EffectEntriesInputType) },
        held_by_pokemon: { type: GraphQLList(DetailsInputType) },
        baby_trigger_for: { type: GraphQLList(DetailsInputType) },
        machines: { type: GraphQLList(DetailsInputType) },
      },
      resolve: async (root, args, context, info) => {
        return itemResolvers.updateOneItem(root, args, context, info);
      },
    },
    updateOneMove: {
      description:
        'Update one move in the Moves collection. Only the ID is required.',
      type: MoveType,
      args: {
        id: { type: graphql.GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        accuracy: { type: GraphQLInt },
        effect_chance: { type: GraphQLInt },
        pp: { type: GraphQLInt },
        priority: { type: GraphQLInt },
        power: { type: GraphQLInt },
        contest_combos: { type: GraphQLList(ContestCombosInputType) },
        contest_type: { type: GraphQLList(DetailsInputType) },
        contest_effect: { type: GraphQLList(ConetstEffectInputType) },
        damage_class: { type: GraphQLList(DetailsInputType) },
        effect_entries: { type: GraphQLList(EffectEntriesInputType) },
        effect_changes: { type: GraphQLList(EffectEntriesInputType) },
        learned_by_pokemon: { type: GraphQLList(DetailsInputType) },
        generation: { type: GraphQLList(DetailsInputType) },
        machines: { type: GraphQLList(DetailsInputType) },
        meta: { type: GraphQLList(MoveMetaInputType) },
        past_values: { type: GraphQLList(DetailsInputType) },
        stat_changes: { type: GraphQLList(DetailsInputType) },
        super_contest_effect: { type: GraphQLList(ConetstEffectInputType) },
        target: { type: GraphQLList(DetailsInputType) },
        type: { type: GraphQLList(DetailsInputType) },
      },
      resolve: async (root, args, context, info) => {
        return moveResolvers.updateOneMove(root, args, context, info);
      },
    },
    updateOnePokemon: {
      description:
        'Update one item in the Pokemons collection. Only the ID is required.',
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
        forms: { type: GraphQLList(DetailsInputType) },
        held_items: { type: GraphQLList(ItemListInputType) },
        location_area_encounters: { type: GraphQLString },
        moves: { type: GraphQLList(MoveListInputType) },
        past_types: { type: PokemonSpeciesInputType },
        species: { type: DetailsInputType },
        types: { type: PokemonSpeciesInputType },
      },
      resolve: async (root, args, context, info) => {
        return pokemonResolvers.updateOnePokemon(root, args, context, info);
      },
    },
    removeOneItem: {
      description:
        'Deletes the specified Item from the Items collection. Requires the ID.',
      type: ItemType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context, info) => {
        return itemResolvers.removeOneItem(parent, args, context, info);
      },
    },
    removeOneMove: {
      description:
        'Deletes the specified Move from the Moves collection. Requires the ID.',
      type: MoveType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context, info) => {
        return moveResolvers.removeOneMove(parent, args, context, info);
      },
    },
    removeOnePokemon: {
      description:
        'Deletes the specified Pokemon from the Pokemons collection. Requires the ID.',
      type: PokemonType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, context, info) => {
        return pokemonResolvers.removeOnePokemon(parent, args, context, info);
      },
    },
    removeOneUserPokemon: {
      description: "Removes one pokemon from the user's Pokemon",
      type: UserType,
      args: {
        id: { type: new graphql.GraphQLNonNull(GraphQLID) },
      },
      resolve: async (root, args, context, info) => {
        return userResolvers.removeOneUserPokemon(root, args, context, info);
      },
    },
    removeOneUserItem: {
      description: "Remove one item from the user's item inventory.",
      type: UserType,
      args: {
        id: { type: new graphql.GraphQLNonNull(GraphQLID) },
      },
      resolve: async (root, args, context, info) => {
        return userResolvers.removeOneUserItem(root, args, context, info);
      },
    },
  },
});

// create new schema with options query which defines the query we will allow users to use when they are making a request.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
