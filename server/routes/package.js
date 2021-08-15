/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import { render } from '@cubeartisan/server/serverjs/render.js';
import { ensureAuth, ensureRole, wrapAsyncApi, wrapAsyncPage } from '@cubeartisan/server/routes/middleware.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import Package from '@cubeartisan/server/models/package.js';
import User from '@cubeartisan/server/models/user.js';

const PAGE_SIZE = 20;
const ALLOWED_SORTS = ['votes', 'date'];

export const getPackages = async (req, res, filter) => {
  try {
    if (!ALLOWED_SORTS.includes(req.params.sort)) {
      return res.status(400).send({
        success: 'false',
        message: 'Invalid Sort, please use either "votes" or "date"',
        packages: [],
        total: 0,
      });
    }

    if ((req.query.filter?.length ?? 0) > 0) {
      filter = {
        $and: [
          filter,
          {
            $or: req.query.filter
              .toLowerCase()
              .split(' ')
              .map((f) => ({ keywords: f })),
          },
        ],
      };
    }

    const total = await Package.countDocuments(filter);

    const sort = {};
    sort[req.params.sort] = req.params.direction;

    const packages = await Package.find(filter)
      .sort(sort)
      .skip(Math.max(req.params.page, 0) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();
    return res.status(200).send({
      success: 'true',
      packages,
      total,
    });
  } catch (err) {
    req.logger.error(err);
    return res.status(500).send({
      success: 'false',
      packages: [],
      total: 0,
    });
  }
};

export const getApprovedPackages = async (req, res) => getPackages(req, res, { approved: true });
export const getPendingPackages = async (req, res) => getPackages(req, res, { approved: false });
export const getAllPackages = async (req, res) => getPackages(req, res, {});

const submitPackageHandler = async (req, res) => {
  const { cards, packageName } = req.body;

  if (typeof packageName !== 'string' || packageName.length === 0) {
    return res.status(400).send({
      success: 'false',
      message: 'Please provide a name for your new package.',
    });
  }

  if (!Array.isArray(cards) || cards.length < 2) {
    return res.status(400).send({
      success: 'false',
      message: 'Please provide more than one card for your package.',
    });
  }

  if (cards.length > 100) {
    return res.status(400).send({
      success: 'false',
      message: 'Packages cannot be more than 100 cards.',
    });
  }

  if (!req.user) {
    return res.status(400).send({
      success: 'false',
      message: 'You must be logged in to create a package.',
    });
  }

  const poster = await User.findById(req.user._id);
  if (!poster) {
    return res.status(400).send({
      success: 'false',
      message: 'You must be logged in to create a package.',
    });
  }

  const pack = new Package();

  pack.title = packageName;
  pack.date = new Date();
  pack.userid = poster._id;
  pack.username = poster.username;
  pack.cards = cards;
  pack.keywords = packageName
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .split(' ');

  for (const card of cards) {
    pack.keywords.push(
      ...carddb
        .cardFromId(card)
        .name_lower.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
        .split(' '),
    );
  }

  // make distinct
  pack.keywords = pack.keywords.filter((value, index, self) => self.indexOf(value) === index);

  await pack.save();

  return res.status(200).send({
    success: 'true',
  });
};
export const submitPackage = [ensureAuth, wrapAsyncApi(submitPackageHandler)];

const upvotePackageHandler = async (req, res) => {
  const pack = await Package.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (!pack.voters.includes(user._id)) {
    pack.voters.push(user._id);
    pack.votes += 1;
    await pack.save();
  }

  return res.status(200).send({
    success: 'true',
    votes: pack.votes,
  });
};
export const upvotePackage = [ensureAuth, wrapAsyncApi(upvotePackageHandler)];

const downvotePackageHandler = async (req, res) => {
  const pack = await Package.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (pack.voters.includes(user._id)) {
    pack.voters = pack.voters.filter((uid) => !user._id.equals(uid));
    pack.votes -= 1;
    await pack.save();
  }

  return res.status(200).send({
    success: 'true',
    votes: pack.votes,
  });
};
export const downvotePackage = [ensureAuth, wrapAsyncApi(downvotePackageHandler)];

const approvePackageHandler = async (req, res) => {
  const pack = await Package.findById(req.params.id);

  pack.approved = true;

  await pack.save();

  return res.status(200).send({
    success: 'true',
  });
};
export const approvePackage = [ensureRole('Admin'), wrapAsyncApi(approvePackageHandler)];

const unapprovePackageHandler = async (req, res) => {
  const pack = await Package.findById(req.params.id);

  pack.approved = false;

  await pack.save();

  return res.status(200).send({
    success: 'true',
  });
};
export const unapprovePackage = [ensureRole('Admin'), wrapAsyncApi(unapprovePackageHandler)];

const deletePackageHandler = async (req, res) => {
  await Package.deleteOne({ _id: req.params.id });

  return res.status(200).send({
    success: 'true',
  });
};
export const deletePackage = [ensureRole('Admin'), wrapAsyncApi(deletePackageHandler)];

const viewPackageHandler = async (req, res) => {
  const pack = await Package.findById(req.params.id);

  return render(req, res, 'PackagePage', {
    pack,
  });
};
export const viewPackage = wrapAsyncPage(viewPackageHandler);
