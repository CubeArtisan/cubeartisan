import Cube from '@cubeartisan/server/models/cube.js';
import { buildIdQuery } from '@cubeartisan/server/serverjs/cubefn.js';
import { ensureAuth, wrapAsyncApi } from '@cubeartisan/server/routes/middleware.js';

const followCubeHandler = async (req, res) => {
  const { user } = req;
  const cube = await Cube.findOne(buildIdQuery(req.params.id));
  if (!cube) {
    req.flash('danger', 'Cube not found');
    res.status(404).send({
      success: 'false',
    });
  }

  if (!cube.users_following.some((id) => id.equals(user._id))) {
    cube.users_following.push(user._id);
  }
  if (!user.followed_cubes.some((id) => id.equals(cube._id))) {
    user.followed_cubes.push(cube._id);
  }

  await Promise.all([user.save(), cube.save()]);

  res.status(200).send({
    success: 'true',
  });
};
export const followCube = [ensureAuth, wrapAsyncApi(followCubeHandler)];

const unfollowCubeHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id), 'users_following');
  if (!cube) {
    req.flash('danger', 'Cube not found');
    res.status(404).send({
      success: 'false',
    });
  }

  const { user } = req;
  cube.users_following = cube.users_following.filter((id) => !req.user._id.equals(id));
  user.followed_cubes = user.followed_cubes.filter((id) => !id.equals(cube._id));

  await Promise.all([user.save(), cube.save()]);

  res.status(200).send({
    success: 'true',
  });
};
export const unfollowCube = [ensureAuth, wrapAsyncApi(unfollowCubeHandler)];
