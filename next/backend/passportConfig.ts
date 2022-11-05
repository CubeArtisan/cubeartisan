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
import bcrypt from 'bcryptjs';
import type { Document, Types } from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';

import { findUser } from '@cubeartisan/next/backend/user';
import User from '@cubeartisan/next/models/user';
import type { MongoUser } from '@cubeartisan/next/types/user';

export default function (passport) {
  // Local Strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await findUser(username);
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username',
        });
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, {
        message: 'Incorrect password',
      });
    }),
  );

  passport.serializeUser((user: Document<MongoUser>, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string | Types.ObjectId, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
