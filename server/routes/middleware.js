import csurf from 'csurf';
import { validationResult } from 'express-validator';
import onFinished from 'on-finished';
import uuid from 'uuid/v4';

import User from '@hypercube/server/models/user';
import winston from '@hypercube/server/serverjs/winstonConfig';

export const setCorsUnrestricted = (_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
};

export const requestLogging = (req, res, next) => {
  req.uuid = uuid();

  req.logger = {
    error: (err) => {
      // err.requst = req;
      winston.error({
        message: err.message,
        stack: err.stack,
        request: req,
      });
    },
    info: (message) => winston.info(message),
  };

  res.locals.requestId = req.uuid;
  res.startTime = Date.now();
  onFinished(res, (_err, finalRes) => {
    winston.info({
      level: 'info',
      type: 'request',
      remoteAddr: req.ip,
      requestId: req.uuid,
      method: req.method,
      path: req.path,
      status: finalRes.statusCode,
      length: finalRes.getHeader('content-length'),
      elapsed: Date.now() - finalRes.startTime,
    });
  });
  next();
};

export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('danger', 'Please login to view this content');
  return res.redirect('/user/login');
};

export const ensureRole = (role) => (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'Please login to view this content');
    return res.redirect('/user/login');
  }

  return User.findById(req.user.id, (_err, user) => {
    if (user.roles && user.roles.includes(role)) {
      return next();
    }
    return res.redirect('/404');
  });
};

export const csrfProtection = [
  csurf(),
  (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    return next();
  },
];

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
  res.setTimeout(60 * 1000, () => {
    const err = new Error('Service Unavailable');
    err.status = 503;
    next(err);
  });
  next();
};
