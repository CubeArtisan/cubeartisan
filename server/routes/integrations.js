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
const DEFAULT_BASICS = [
  "56719f6a-1a6c-4c0a-8d21-18f7d7350b68",
  "b2c6aa39-2d2a-459c-a555-fb48ba993373",
  "bc71ebf6-2056-41f7-be35-b2e5c34afa99",
  "b34bb2dc-c1af-4d77-b0b3-a0fb342a5fc6",
  "a3fb7228-e76b-4e96-a40e-20b5fed75685",
];

const importDraftLogHandler = async (req, res) => {
  const draftLog = new DraftLog();
  if (req.body.apiKey !== API_KEY) {
    return res.status(401).send({ success: 'false' });
  }
  draftLog.players = req.body.players;
  draftLog.basics = req.body.basics ?? DEFAULT_BASICS;
  await draftLog.save();
  return res.status(201).send({ success: 'true', id: draftLog.id, timestamp: draftLog.createdAt });
};
export const importDraftLog = wrapAsyncApi(importDraftLogHandler);

export default importDraftLog;
