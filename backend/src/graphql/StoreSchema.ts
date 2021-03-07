import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { StoreFetchArguments, StoreRepository } from '../repository/StoreRepository';

const storeRepository = new StoreRepository();

const vehicleEnum = new GraphQLEnumType({
  name: 'Vehicle',
  description: 'What type of transport',
  values: {
    CAR: {
      value: 'car',
    },
    BIKE: {
      value: 'bike',
    },
    FOOT: {
      value: 'foot',
    },
  },
});

const travelInfoType = new GraphQLObjectType({
  name: 'TravelInfo',
  description: 'Information about travel times and distance to store.',
  fields: () => ({
    vehicle: {
      type: vehicleEnum,
    },
    distance: {
      type: GraphQLFloat,
      description: 'In meters.',
    },
    duration: {
      type: GraphQLFloat,
      description: 'In seconds.',
    },
  }),
});
const storeType = new GraphQLObjectType({
  name: 'Store',
  description: 'Store location and info',
  fields: () => ({
    uuid: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the store.',
    },
    city: {
      type: GraphQLString,
    },
    postalCode: {
      type: GraphQLString,
    },
    street: {
      type: GraphQLString,
    },
    street2: {
      type: GraphQLString,
    },
    street3: {
      type: GraphQLString,
    },
    addressName: {
      type: GraphQLString,
    },
    complexNumber: {
      type: GraphQLString,
    },
    showWarningMessage: {
      type: GraphQLBoolean,
    },
    todayOpen: {
      type: GraphQLString,
    },
    locationType: {
      type: GraphQLString,
    },
    collectionPoint: {
      type: GraphQLBoolean,
    },
    sapStoreID: {
      type: GraphQLString,
    },
    todayClose: {
      type: GraphQLString,
    },
    longitude: {
      type: GraphQLFloat,
    },
    latitude: {
      type: GraphQLFloat,
    },
    distance: {
      type: GraphQLFloat,
      description: 'Simple distance in meters',
    },
    travelInfo: {
      type: travelInfoType,
      description: 'Travel information (duration, real distance)',
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    stores: {
      type: new GraphQLList(storeType),
      args: {
        latitude: {
          description: 'If specified distance will be calculated.',
          type: GraphQLFloat,
        },
        longitude: {
          description: 'If specified distance will be calculated.',
          type: GraphQLFloat,
        },
        vehicle: {
          description: 'If passed, travel information will be available.',
          type: vehicleEnum,
        },
        limit: {
          description: 'If vehicle is specified, 5 is maximum.',
          type: GraphQLInt,
        },
      },
      resolve: (_source, args) => {
        return storeRepository.fetch({ ...args } as StoreFetchArguments);
      },
    },
  }),
});

export const StoreSchema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  types: [travelInfoType, storeType],
});
