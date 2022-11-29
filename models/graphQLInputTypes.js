const graphql = require('graphql');
const { createImportSpecifier } = require('typescript');
const appConfig = require('../config/app');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
} = graphql;

const DetailsInputType = new graphql.GraphQLInputObjectType({
  name: 'DetailsInput',
  fields: () => ({
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const EffectEntriesInputType = new graphql.GraphQLInputObjectType({
  name: 'EffectEntriesInputType',
  fields: () => ({
    effect: { type: GraphQLString },
    language: { type: DetailsInputType },
    short_effect: { type: GraphQLString },
  }),
});

const ContestCombosInputType = new graphql.GraphQLInputObjectType({
  name: 'ContestCombosInputType',
  fields: () => ({
    normal: { type: ContestCombosInputTypeDetail },
    super: { type: ContestCombosInputTypeDetail },
  }),
});

const ContestCombosInputTypeDetail = new graphql.GraphQLInputObjectType({
  name: 'ContestCombosInputTypeDetail',
  fields: () => ({
    user_after: { type: UserAfterBeforeInputType },
    user_after: { type: UserAfterBeforeInputType },
  }),
});

const UserAfterBeforeInputType = new graphql.GraphQLInputObjectType({
  name: 'UserAfterBeforeInputType',
  fields: () => ({
    user_before: { type: DetailsInputType },
    user_before: { type: DetailsInputType },
  }),
});

const ConetstEffectInputType = new graphql.GraphQLInputObjectType({
  name: 'ConetstEffectInputType',
  fields: () => ({
    url: { type: GraphQLString },
  }),
});

const MoveMetaInputType = new graphql.GraphQLInputObjectType({
  name: 'MoveMetaInputType',
  fields: () => ({
    ailment: { type: DetailsInputType },
    ailment_chance: { type: GraphQLInt },
    category: { type: DetailsInputType },
    crit_rate: { type: GraphQLInt },
    drain: { type: GraphQLInt },
    flinch_chance: { type: GraphQLInt },
    healing: { type: GraphQLInt },
    max_hits: { type: GraphQLInt },
    max_turns: { type: GraphQLInt },
    min_hits: { type: GraphQLInt },
    min_turns: { type: GraphQLInt },
    stat_chance: { type: GraphQLInt },
  }),
});

// PokemonType helper types
const MoveListInputType = new graphql.GraphQLInputObjectType({
  name: 'MoveListInputType',
  fields: () => ({
    move: { type: DetailsInputType },
  }),
});

const PokemonAbilitiesInputType = new graphql.GraphQLInputObjectType({
  name: 'PokemonAbilitiesListItemInput',
  fields: () => ({
    ability: { type: DetailsInputType },
    is_hidden: { type: GraphQLBoolean },
    slot: { type: GraphQLInt },
  }),
});

const ItemListInputType = new graphql.GraphQLInputObjectType({
  name: 'PokemonHeldItemInput',
  fields: () => ({
    item: { type: DetailsInputType },
  }),
});

const PokemonSpeciesInputType = new graphql.GraphQLInputObjectType({
  name: 'PokemonSpeciesInput',
  fields: () => ({
    slot: { type: GraphQLInt },
    species_type: { type: DetailsInputType },
  }),
});

module.exports = {
  DetailsInputType,
  EffectEntriesInputType,
  ContestCombosInputType,
  ContestCombosInputTypeDetail,
  UserAfterBeforeInputType,
  ConetstEffectInputType,
  MoveMetaInputType,
  MoveListInputType,
  PokemonAbilitiesInputType,
  ItemListInputType,
  PokemonSpeciesInputType,
};
