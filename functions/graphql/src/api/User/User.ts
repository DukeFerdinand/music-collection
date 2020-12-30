import { gql } from 'apollo-server-cloud-functions';

export const User = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
  }

  input UserInput {
    email: String!
    password: String!
    name: String!
  }

  type Query {
    user: User!
  }
`;
