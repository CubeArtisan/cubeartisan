import type { ProtectedUser, PublicUser } from '@cubeartisan/next/types/user';

export const getDefaultPublicUser = (): PublicUser => ({
  username: '',
  username_lower: '',
  about: '',
  image: 'https://img.scryfall.com/cards/art_crop/front/0/c/0c082aa8-bf7f-47f2-baf8-43ad253fd7d7.jpg?1562826021',
  image_name: 'Ambush Viper',
  artist: 'Allan Pollack',
  theme: 'default',
});

export const getDefaultProtectedUser = (): ProtectedUser => ({
  ...getDefaultPublicUser(),
  email: '',
  confirmed: false,
  hide_tag_colors: false,
  followed_cubes: [],
  users_following: [],
  notifications: [],
  roles: [],
  _id: '',
});
