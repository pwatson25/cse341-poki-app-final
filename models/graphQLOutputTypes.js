const graphql = require("graphql");
const { createImportSpecifier } = require("typescript");

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
  name: "Details",
  fields: () => ({
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const EffectEntriesType = new GraphQLObjectType({
  name: "EffectEntriesType",
  fields: () => ({
    effect: { type: GraphQLString },
    language: { type: DetailsType },
    short_effect: { type: GraphQLString },
  }),
});

const ContestCombosType = new GraphQLObjectType({
  name: "ContestCombosType",
  fields: () => ({
    normal: { type: ContestCombosTypeDetail },
    super: { type: ContestCombosTypeDetail },
  }),
});

const ContestCombosTypeDetail = new GraphQLObjectType({
  name: "ContestCombosTypeDetail",
  fields: () => ({
    user_after: { type: UserAfterBeforeType },
    user_after: { type: UserAfterBeforeType },
  }),
});

const UserAfterBeforeType = new GraphQLObjectType({
  name: "UserAfterBeforeType",
  fields: () => ({
    user_before: { type: DetailsType },
    user_before: { type: DetailsType },
  }),
});

const ConetstEffectType = new GraphQLObjectType({
  name: "ConetstEffectType",
  fields: () => ({
    url: { type: GraphQLString },
  }),
});

const MoveMetaType = new GraphQLObjectType({
  name: "MoveMetaType",
  fields: () => ({
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
  }),
});

// PokemonType helper types
const MoveListType = new GraphQLObjectType({
  name: "MoveListType",
  fields: () => ({
    move: { type: DetailsType },
  }),
});

const PokemonAbilitiesType = new GraphQLObjectType({
  name: "Pokemon_abilities_list_item",
  fields: () => ({
    ability: { type: DetailsType },
    is_hidden: { type: GraphQLBoolean },
    slot: { type: GraphQLInt },
  }),
});

const ItemListType = new GraphQLObjectType({
  name: "Pokemon_held_item",
  fields: () => ({
    item: { type: DetailsType },
  }),
});

const PokemonSpeciesType = new GraphQLObjectType({
  name: "Pokemon_species",
  fields: () => ({
    slot: { type: GraphQLInt },
    type: { type: DetailsType },
  }),
});

module.exports = {
  DetailsType,
  EffectEntriesType,
  ContestCombosType,
  ContestCombosTypeDetail,
  UserAfterBeforeType,
  ConetstEffectType,
  MoveMetaType,
  MoveListType,
  PokemonAbilitiesType,
  ItemListType,
  PokemonSpeciesType,
};
