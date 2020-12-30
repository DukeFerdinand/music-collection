export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  album: Album;
  albums: Array<Album>;
  hello?: Maybe<Scalars['String']>;
  custom: Scalars['String'];
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['ID'];
  name: Scalars['String'];
  albumArt: Scalars['String'];
  songCount?: Maybe<Scalars['Int']>;
  artist: Scalars['String'];
};

export type AlbumInput = {
  name: Scalars['String'];
  albumArt: Scalars['String'];
  songCount?: Maybe<Scalars['Int']>;
  artist: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}
