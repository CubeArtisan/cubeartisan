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
import type { ClientRequest, IncomingMessage } from 'http';
import process from 'process';

import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';
import { DnsInstrumentation } from '@opentelemetry/instrumentation-dns';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import opentelemetry from '@opentelemetry/sdk-node';
import { SocketIoInstrumentation } from 'opentelemetry-instrumentation-socket.io';
import winston, { createLogger, format } from 'winston';

const consoleFormat = format.prettyPrint();
const transports = [new winston.transports.Console({ format: consoleFormat })];

const logger = createLogger({
  level: 'info',
  format: winston.format.json(),
  exitOnError: false,
  transports,
});

if (process.env.TELMETRY === 'true') {
  const traceExporter = new TraceExporter({
    projectId: 'cubeartisan',
  });
  const requestToPath = (request: IncomingMessage | ClientRequest): string => {
    // eslint-disable-next-line no-restricted-syntax
    if ('url' in request && request.url) {
      const url = new URL(request.url);
      return url.pathname;
    }
    // eslint-disable-next-line no-restricted-syntax
    if ('path' in request) {
      return request.path;
    }
    return 'Unknown';
  };
  const httpInstrumentation = new HttpInstrumentation({
    requestHook: (span, request) => {
      span.setAttributes({
        name: `${request.method} ${requestToPath(request)}`,
      });
    },

    // Re-assign the root span's attributes
    startIncomingSpanHook: (request) => ({
      name: `${request.method} ${requestToPath(request)}`,
      'request.path': `${requestToPath(request)}`,
    }),
  });

  const sdk = new opentelemetry.NodeSDK({
    autoDetectResources: true,
    traceExporter,
    instrumentations: [
      httpInstrumentation,
      new WinstonInstrumentation({}),
      new SocketIoInstrumentation({
        filterHttpTransport: {
          httpInstrumentation,
        },
      }),
      new DnsInstrumentation({}),
      new MongoDBInstrumentation({
        enhancedDatabaseReporting: true,
      }),
    ],
  });
  (async () => {
    // Start the opentelemetry server.
    await sdk
      .start()
      .then(async () => {
        logger.info('Telemetry started.');
      })
      .catch((error) => winston.error('Error initializing tracing', error));
    process.on('SIGTERM', async () => {
      try {
        await sdk.shutdown();
        logger.info('SDK shut down successfully');
      } catch (err) {
        winston.error('Error shutting down SDK', err);
      } finally {
        process.exit(0);
      }
    });
  })();
}

export default logger;
