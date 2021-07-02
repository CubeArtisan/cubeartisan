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
import Cube from '@hypercube/server/models/cube';
import GridDraft from '@hypercube/server/models/gridDraft';
import { abbreviate, buildIdQuery } from '@hypercube/server/serverjs/cubefn';
import User from '@hypercube/server/models/user';
import CubeAnalytic from '@hypercube/server/models/cubeAnalytic';
import carddb from '@hypercube/server/serverjs/cards';
import render from '@hypercube/server/serverjs/render';
import generateMeta from '@hypercube/server/serverjs/meta';
import { getCubeDescription } from '@hypercube/client/utils/Util';
import { handleRouteError, wrapAsyncApi } from '@hypercube/server/serverjs/util';

const getGridDraftPage = async (req, res) => {
  try {
    const draft = await GridDraft.findById(req.params.id).lean();
    if (!draft) {
      req.flash('danger', 'Draft not found');
      return res.redirect('/404');
    }

    const cube = await Cube.findOne(buildIdQuery(draft.cube)).lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }

    const user = await User.findById(cube.owner);
    if (!user) {
      req.flash('danger', 'Owner not found');
      return res.redirect('/404');
    }

    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = Object.fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }

    // insert card details everywhere that needs them
    for (const card of draft.cards) {
      card.details = carddb.cardFromId(card.cardID);
      if (eloOverrideDict[card.details.name_lower]) {
        card.details.elo = eloOverrideDict[card.details.name_lower];
      }
    }

    return render(
      req,
      res,
      'GridDraftPage',
      {
        cube,
        initialDraft: draft,
      },
      {
        title: `${abbreviate(cube.name)} - Grift Draft`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Grid Draft: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/cube/griddraft/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const submitGridDraft = async (req, res) => {
  await GridDraft.updateOne(
    {
      _id: req.body._id,
    },
    req.body,
  );

  return res.status(200).send({
    success: 'true',
  });
};

const router = express.Router();
router.get('/:id', getGridDraftPage);
router.post('/:id', wrapAsyncApi(submitGridDraft));
