import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  // TODO: Pull this from ENV
  uri: 'http://localhost:8080',
  cache: new InMemoryCache(),
});
