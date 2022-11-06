import { withIronSessionApiRoute } from 'iron-session/next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createRouter } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import onFinished from 'on-finished';
import { v4 as uuid } from 'uuid';

import logger from '@cubeartisan/next/backend/logger';
import getMongoConnection from '@cubeartisan/next/backend/mongoConnection';
import User from '@cubeartisan/next/models/user';

// eslint-disable-next-line no-unused-vars
export type FunctionLike = (...args: any[]) => unknown;
export type ValueOrPromise<T> = T | Promise<T>;
export type NextHandler = () => ValueOrPromise<any>;
// eslint-disable-next-line no-unused-vars
export type Nextable<H extends FunctionLike> = (...args: [...Parameters<H>, NextHandler]) => ValueOrPromise<any>;

// eslint-disable-next-line no-unused-vars
export type ApiHandlerNoNext = (_req: NextApiRequest, _res: NextApiResponse) => ValueOrPromise<any>;
export type ApiHandler = ApiHandlerNoNext | Nextable<ApiHandlerNoNext>;

export const setCorsUnrestricted = (_req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
};

export const cacheResponse = (_req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  res.setHeader('Cache-Control', `public, max-age=${1 * 60 * 60}`); // 1 hour
  next();
};

export const cacheImmutableResponse = (_req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  res.setHeader('Cache-Control', `public, max-age=${24 * 60 * 60}, immutable`); // 24 hours
  return next();
};

export const ensureAuth = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  res.send({ success: false, message: 'Not Authenticated' });
  return null;
};

export type MiddlewareSettings = {
  extraMiddleware?: ApiHandler[];
};

const addLogger = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  req.uuid = uuid();

  const requestData = {
    requestId: req.uuid,
    method: req.method,
    path: req.url,
  };

  req.logger = {
    error: (err, meta) => {
      logger.error(err.message, {
        ...meta,
        message: err.message,
        stack: err.stack,
        ...requestData,
      });
    },
    warn: (err, meta) => {
      logger.warn(err.message, {
        ...meta,
        message: err.message,
        stack: err.stack,
        ...requestData,
      });
    },
    info: (message, meta) => logger.info(message, meta),
    debug: (message, meta) => logger.debug(message, meta),
  };

  // eslint-disable-next-line promise/prefer-await-to-callbacks
  onFinished(res, (err: Error | null, finalRes: NextApiResponse) => {
    if (err) {
      req.logger.warn(err, {
        type: 'request',
        status: finalRes.statusCode,
        length: finalRes.getHeader('content-length'),
        ...requestData,
      });
    } else {
      req.logger.info('', {
        type: 'request',
        status: finalRes.statusCode,
        length: finalRes.getHeader('content-length'),
        ...requestData,
      });
    }
  });
  next();
};

export const handler = {
  onNoMatch: (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end({ success: false, message: 'Route not found.' });
    res.end();
  },
  onError: (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
    req.logger.warn(err as Error);
    res.status(500).end({ success: false, message: 'Uncaught Internal server error' });
  },
};

export const requireDb = async (_req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
  await getMongoConnection();
  next();
};

export const addSession = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) =>
  withIronSessionApiRoute(
    async () => {
      if (req.session.id) {
        req.user = await User.findById(req.session.id);
      } else {
        req.user = null;
      }
      return next();
    },
    {
      password: process.env.SESSION_SECRET ?? '',
      cookieName: process.env.SESSION ?? '',
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      },
    },
  )(req, res);

export const setupMiddleware = ({ extraMiddleware = [] }: MiddlewareSettings = {}) => {
  let router = createRouter<NextApiRequest, NextApiResponse>();
  router = router.use(async (_req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    try {
      await next();
    } catch (errUnk) {
      const err = errUnk as Error;
      console.error(err.stack);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      res.end();
    }
    return null;
  });
  router = router.use(addLogger);
  router.use(requireDb);
  router.use(addSession);
  for (const middleware of extraMiddleware) {
    router = router.use(middleware);
  }
  return router;
};
