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
// Load Environment Variables
import apm from 'elastic-apm-node/start.js';
import winston from 'winston';
import dotenv from 'dotenv';
import { ElasticsearchTransport } from 'winston-elasticsearch';

dotenv.config();

const linearFormat = winston.format((info) => {
  if (info.message) {
    if (info.message.type === 'request') {
      info.message = `request: ${info.message.path}`;
    } else if (info.level === 'error') {
      info.message = `${info.message} ${info.stack}`;
      delete info.stack;
      delete info.request;
    }
    delete info.type;
  }
  return info;
});

const consoleFormat = winston.format.combine(linearFormat(), winston.format.simple());
const transports = [new winston.transports.Console({ format: consoleFormat })];

if (process.env.ELASTICSEARCH_URL) {
  const transportOptions = {
    level: 'info',
    dataStream: true,
    clientOpts: {
      node: process.env.ELASTICSEARCH_URL,
      auth: {
        username: process.env.ELASTICSEARCH_USER,
        password: process.env.ELASTICSEARCH_PASSWORD,
      },
    },
    apm,
  };
  transports.push(new ElasticsearchTransport(transportOptions));
}

export const getApmCurrentTraceIds = () => apm.currentTraceIds;
export const logApmError = (err) => apm.captureError(err);

winston.configure({
  level: 'info',
  format: winston.format.json(),
  exitOnError: false,
  transports,
});
export default winston;
