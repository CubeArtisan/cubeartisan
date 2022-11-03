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
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
// import csurf from 'csurf';
import { validationResult } from 'express-validator';
import onFinished from 'on-finished';
import { v4 as uuid } from 'uuid';

import User from '@cubeartisan/server/models/user.js';

export const setCorsUnrestricted = (_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
};

export const cacheResponse = (_req, res, next) => {
  res.set('Cache-Control', `public, max-age=${1 * 60 * 60}`); // 1 hour
  next();
};

export const cacheImmutableResponse = (_req, res, next) => {
  res.set('Cache-Control', `public, max-age=${24 * 60 * 60}, immutable`); // 24 hours
  next();
};

export const requestLogging = (req, res, next) => {
  req.uuid = uuid();

  const requestData = {
    requestId: req.uuid,
    method: req.method,
    path: req.path,
  };

  req.logger = {
    error: (err) => {
      winston.error(err.message, {
        level: 'error',
        message: err.message,
        stack: err.stack,
        ...requestData,
      });
    },
    info: (message, meta) => winston.info(message, meta),
  };

  res.locals.requestId = req.uuid;
  res.startTime = Date.now();
  onFinished(res, (_err, finalRes) => {
    req.logger.info('', {
      level: 'info',
      type: 'request',
      status: finalRes.statusCode,
      length: finalRes.getHeader('content-length'),
      elapsed: Date.now() - finalRes.startTime,
      ...requestData,
    });
  });
  next();
};

// eslint-disable-next-line
export const csrfProtection = (req, res, next) => next();
// export const csrfProtection = [
//   csurf(),
//   (req, res, next) => {
//     res.locals.csrfToken = req.csrfToken();
//     return next();
//   },
// ];

export const ensureAuth = [
  // ...csrfProtection,
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash('danger', 'Please login to view this content');
    return res.redirect('/login');
  },
];

export const ensureRole = (role) => (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'Please login to view this content');
    return res.redirect('/login');
  }

  return User.findById(req.user._id, (_err, user) => {
    if (user.roles && user.roles.includes(role)) {
      return next();
    }
    return res.redirect('/404');
  });
};

export const flashValidationErrors = (req, _res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  req.validated = errors.isEmpty();

  for (const error of errors.array()) {
    req.flash('danger', error);
  }

  next();
};

export const jsonValidationErrors = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    res.status(400).send({
      success: 'false',
      errors: errors.array(),
    });
    req.validated = false;
    return;
  }

  req.validated = true;
  next();
};

export const timeoutMiddleware = (req, res, next) => {
  req.setTimeout(60 * 1000, () => {
    const err = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });
  res.setTimeout(300 * 1000, () => {
    const err = new Error('Response Timeout');
    err.status = 503;
    next(err);
  });
  next();
};

export const wrapAsyncApi = (route) => {
  const wrappedAsyncApi = async (req, res, next) => {
    try {
      return await route(req, res, next);
    } catch (err) {
      req.logger.error(err);
      try {
        return res.status(500).send({
          success: 'false',
          message: 'Internal server error',
        });
      } catch (err2) {
        return req.logger.error(err2);
      }
    }
  };
  return wrappedAsyncApi;
};

export const handleRouteError = (req, res, err, reroute) => {
  req.logger.error(err);
  try {
    req.flash('danger', err.message);
    res.redirect(reroute);
  } catch (err2) {
    req.logger.error(err2);
  }
};

export const wrapAsyncPage = (route) => {
  const wrappedAsyncPage = async (req, res, next) => {
    try {
      return await route(req, res, next);
    } catch (err) {
      return handleRouteError(req, res, err, '/404');
    }
  };
  return wrappedAsyncPage;
};
