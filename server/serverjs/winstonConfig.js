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
import elasticApmNode from 'elastic-apm-node';
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

let apm = null;
if (process.env.APM_SERVER_URL) {
  apm = elasticApmNode.start({
    serverUrl: process.env.APM_SERVER_URL,
    serviceName: 'Cube Cobra',
  });
  // eslint-disable-next-line
  console.log('Initialized APM', apm);
}
if (process.env.ELASTICSEARCH_URL) {
  const transportOptions = {
    level: 'info',
    indexPrefix: 'cubecobra',
    ensureMappingTemplate: true,
    mappingTemplate: {
      index_patterns: ['cubecobra-*'],
      settings: {
        number_of_shards: 1,
        number_of_replicas: 0,
        index: {
          refresh_interval: '5s',
        },
      },
      mappings: {
        _source: { enabled: true },
        properties: {
          '@timestamp': { type: 'date' },
          '@version': { type: 'keyword' },
          message: { type: 'text', index: true },
          severity: { type: 'keyword', index: true },
          fields: {
            dynamic: true,
            properties: {},
          },
        },
      },
    },
    clientOpts: { node: process.env.ELASTICSEARCH_URL },
  };
  if (apm) {
    transportOptions.apm = apm;
  }
  transports.push(new ElasticsearchTransport(transportOptions));
}

winston.configure({
  level: 'info',
  format: winston.format.json(),
  exitOnError: false,
  transports,
});
export default winston;
