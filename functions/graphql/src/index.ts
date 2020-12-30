import { ApolloServer, gql } from 'apollo-server-cloud-functions';
import { mergeResolvers, mergeTypeDefs } from 'graphql-tools';

import { Album } from './api/Album/Album';
import { User } from './api/User/User';

// Construct a schema, using GraphQL schema language
const demoDefs = gql`
  type Query {
    hello: String
    custom: String!
  }
`;

// Provide resolver functions for your schema fields
const demoResolvers = {
  Query: {
    hello: () => {
      console.log('Hello Query');
      return 'Hello world!';
    },
    custom: () => {
      console.log('Custom Query');
      return 'Hello, Google Cloud!';
    },
  },
};

const typeDefs = mergeTypeDefs([User, Album, demoDefs]);

const resolvers = mergeResolvers([demoResolvers]);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
