import type { Schema } from "mongoose";

export type Role = 'Admin'

export type Theme = 'dark' | 'light' | 'default'

export type GenericNotification<ID> = {
  user_from: ID,
  user_from_name: string,
  url: string,
  date: Date,
  text: string,
};

export type PublicUser = {
  username: string,
  username_lower: string,
  about: string,
  image: string,
  artist: string,
};

export type GenericProtectedUser<ID> = {
  email: string,
  confirmed: boolean,
  hide_tag_colors: boolean,
  followed_cubes: ID[],
  notifications: GenericNotification<ID>[],
  roles: Role[],
};

export type PrivateUser<ID> = {
  password: string,
  followed_users: ID[],
  edit_token: string,
  old_notifications: GenericNotification<ID>[],
};

export type MongoUser = PublicUser & GenericProtectedUser<Schema.Types.ObjectId> & PrivateUser<Schema.Types.ObjectId>;

export type User = GenericProtectedUser<string>
