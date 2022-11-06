import type { HydratedDocument } from 'mongoose';

import type { MongoUser } from '@cubeartisan/next/types/user';

export interface RequestLogger {
  // eslint-disable-next-line no-unused-vars
  error: (err: Error, meta?: object) => void;
  // eslint-disable-next-line no-unused-vars
  warn: (err: Error, meta?: object) => void;
  // eslint-disable-next-line no-unused-vars
  info: (message: string, meta: object) => void;
  // eslint-disable-next-line no-unused-vars
  debug: (message: string, meta: object) => void;
}

declare module 'next' {
  interface NextApiRequest {
    isAuthenticated: () => boolean;
    logout: () => void;
    uuid: string;
    logger: RequestLogger;
    session: any;
    user: HydratedDocument<MongoUser> | null;
  }
}
