const graphql = require('graphql');
const {
  createImportSpecifier,
  isExternalModuleReference,
} = require('typescript');
const appConfig = require('../config/app');
const Item = require('../models/item.js');
const Move = require('../models/move.js');
const Pokemon = require('../models/pokemon.js');

const inputTypes = require('../models/graphQLInputTypes.js');
const outputTypes = require('../models/graphQLOutputTypes.js');

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
      description: 'Returns all items.',
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
      description: 'Returns all moves.',
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
      description: 'Returns all Pokemon',
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
  name: 'Mutation',
  description: 'Used for making CREATE, PUT, and DELETE queries.',
  fields: {
    addOneItem: {
      description:
        'Add one item to the Items collection. All fields are required, except ID which is auto-generated. Returns the created item.',
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
        'Add one item to the Moves collection. All fields are required, except ID which is auto-generated. Returns the created move.',
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
        'Add one item to the Pokemons collection. All fields are required, except ID which is auto-generated. Returns the created pokemon.',
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
            newLocation_area_encounters =
              formerPokemon.location_area_encounters;
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
        'Deletes the specified Move from the Moves collection. Requires the ID.',
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
        'Deletes the specified Pokemon from the Pokemons collection. Requires the ID.',
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
