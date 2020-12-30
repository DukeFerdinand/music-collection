import { gql } from 'apollo-server-cloud-functions';

export const Album = gql`
  type Album {
    id: ID!
    name: String!
    albumArt: String!
    songCount: Int
    # Link to artist later
    artist: String!
  }

  input AlbumInput {
    name: String!
    albumArt: String!
    songCount: Int
    # Link to artist later
    artist: String!
  }

  type Query {
    album: Album!
    albums: [Album!]!
  }
`;
