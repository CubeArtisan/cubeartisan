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
import express from 'express';
import render from '@cubeartisan/server/serverjs/render';
import { ensureAuth, ensureRole, csrfProtection } from '@cubeartisan/server/routes/middleware';
import { redirect, wrapAsyncApi } from '@cubeartisan/server/serverjs/util';
import carddb from '@cubeartisan/server/serverjs/cards';
import Package from '@cubeartisan/server/models/package';
import User from '@cubeartisan/server/models/user';

const PAGE_SIZE = 20;

export const getPackages = async (req, res, filter) => {
  try {
    if (!['votes', 'date'].includes(req.params.sort)) {
      return res.status(400).send({
        success: 'false',
        message: 'Invalid Sort, please use either "votes" or "date"',
        packages: [],
        total: 0,
      });
    }

    if (req.params.filter && req.params.filter.length > 0) {
      filter = {
        $and: [
          filter,
          {
            $or: req.params.filter
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

const submitPackage = async (req, res) => {
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

  const poster = await User.findById(req.user.id);
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

const upvotePackage = async (req, res) => {
  const pack = await Package.findById(req.params.id);
  const user = await User.findById(req.user.id);

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

const downvotePackage = async (req, res) => {
  const pack = await Package.findById(req.params.id);
  const user = await User.findById(req.user.id);

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

const approvePackage = async (req, res) => {
  const pack = await Package.findById(req.params.id);

  pack.approved = true;

  await pack.save();

  return res.status(200).send({
    success: 'true',
  });
};

const unapprovePackage = async (req, res) => {
  const pack = await Package.findById(req.params.id);

  pack.approved = false;

  await pack.save();

  return res.status(200).send({
    success: 'true',
  });
};

const deletePackage = async (req, res) => {
  await Package.deleteOne({ _id: req.params.id });

  return res.status(200).send({
    success: 'true',
  });
};

const viewPackage = async (req, res) => {
  const pack = await Package.findById(req.params.id);

  return render(req, res, 'PackagePage', {
    pack,
  });
};

const router = express.Router();
router.use(csrfProtection);
router.get('/packages/approved/:page/:sort/:direction/:filter', async (req, res) =>
  getPackages(req, res, { approved: true }),
);
router.get('/packages/pending/:page/:sort/:direction/:filter', async (req, res) =>
  getPackages(req, res, { approved: false }),
);
router.get('/packages/approved/:page/:sort/:direction', async (req, res) => getPackages(req, res, { approved: true }));
router.get('/packages/pending/:page/:sort/:direction', async (req, res) => getPackages(req, res, { approved: false }));
router.post('/package/', ensureAuth, wrapAsyncApi(submitPackage));
router.get('/package/', redirect('/packages'));
router.post('/package/:id/vote', ensureAuth, wrapAsyncApi(upvotePackage));
router.delete('/package/:id/vote', ensureAuth, wrapAsyncApi(downvotePackage));
router.post('/package/:id/approve', ensureRole('Admin'), wrapAsyncApi(approvePackage));
router.delete('/package/:id/approve', ensureRole('Admin'), wrapAsyncApi(unapprovePackage));
router.delete('/package/:id', ensureRole('Admin'), wrapAsyncApi(deletePackage));
router.get('/package/:id', wrapAsyncApi(viewPackage));
export default router;
