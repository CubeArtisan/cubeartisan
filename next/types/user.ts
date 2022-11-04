import type { Types } from 'mongoose';

export type Role = 'Admin' | 'ContentCreator' | 'Patron';

export type Theme = 'dark' | 'light' | 'default';

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
  image_name: string,
  artist: string,
  theme: Theme,
};

export type GenericProtectedUser<ID> = {
  email: string,
  confirmed: boolean,
  hide_tag_colors: boolean,
  followed_cubes: ID[],
  users_following: ID[],
  notifications: GenericNotification<ID>[],
  roles: Role[],
};

export type PrivateUser<ID> = {
  password: string,
  followed_users: ID[],
  edit_token: string,
  old_notifications: GenericNotification<ID>[],
};

export type MongoUser = PublicUser & GenericProtectedUser<Types.ObjectId> & PrivateUser<Types.ObjectId>;

export type User = GenericProtectedUser<string>;
