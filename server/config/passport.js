import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcryptjs';
import { findOne, findById } from '@hypercube/server/models/user';

export default function (passport) {
  // Local Strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match username
      const query = {
        username_lower: username.toLowerCase(),
      };
      findOne(query, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username',
          });
        }

        // Match password
        return compare(password, user.password, (err2, isMatch) => {
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
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    findById(id, (err, user) => {
      done(err, user);
    });
  });
}
