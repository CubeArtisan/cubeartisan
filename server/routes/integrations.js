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
 */
import DraftLog from '@cubeartisan/server/models/draftLog.js';
import { wrapAsyncApi } from '@cubeartisan/server/routes/middleware.js';

const API_KEY = process.env.CUBEARTISAN_API_KEY;

const importDraftLogHandler = async (req, res) => {
  const draftLog = new DraftLog();
  if (req.body.apiKey !== API_KEY) {
    return res.status(401).send({ success: 'false' });
  }
  draftLog.players = req.body.players;
  if (req.body.basics) {
    draftLog.basics = req.body.basics;
  }
  await draftLog.save();
  return res.status(201).send({ success: 'true', id: draftLog.id, timestamp: draftLog.createdAt });
};
export const importDraftLog = wrapAsyncApi(importDraftLogHandler);

export default importDraftLog;
