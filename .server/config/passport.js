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
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '@cubeartisan/server/models/user.js';

export default function (passport) {
  // Local Strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match username
      const query = {
        username_lower: username.toLowerCase(),
      };
      User.findOne(query, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username',
          });
        }

        // Match password
        return bcrypt.compare(password, user.password, (err2, isMatch) => {
          if (err2) throw err2;
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, {
            message: 'Incorrect password',
          });
        });
      });
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
