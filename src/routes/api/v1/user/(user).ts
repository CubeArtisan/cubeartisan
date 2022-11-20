import { APIEvent, json } from 'solid-start';

import { getUserFromRequest } from '@cubeartisan/cubeartisan/backend/user';

export const GET = async ({ request }: APIEvent) => {
  const user = await getUserFromRequest(request);
  if (user) {
    return json({
      success: true,
      user: {
        username: user.username,
        about: user.about,
        image: user.image,
        image_name: user.image_name,
        artist: user.artist,
        theme: user.theme,
        email: user.email,
        confirmed: user.confirmed,
        hide_tag_colors: user.hide_tag_colors,
        followed_cubes: user.followed_cubes,
        users_following: user.users_following,
        notifications: user.notifications,
        roles: user.roles,
      },
    });
  }
  return json({
    success: false,
  });
};
