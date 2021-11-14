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
import process from 'process';
import winston from 'winston';
import opentelemetry from '@opentelemetry/sdk-node';
import { SocketIoInstrumentation } from 'opentelemetry-instrumentation-socket.io';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';
import { MetricExporter } from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import { DnsInstrumentation } from '@opentelemetry/instrumentation-dns';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb';

if (process.env.TELMETRY == 'true') {
  const traceExporter = new TraceExporter({});
  const metricExporter = new MetricExporter({});
  const httpInstrumentation = new HttpInstrumentation();

  const sdk = new opentelemetry.NodeSDK({
    traceExporter,
    metricExporter,
    metricInterval: 60 * 1000, // 60 seconds
    instrumentations: [
      httpInstrumentation,
      new ExpressInstrumentation(),
      new WinstonInstrumentation({}),
      new SocketIoInstrumentation({
        filterHttpTransport: {
          httpInstrumentation,
        },
      }),
      new DnsInstrumentation({}),
      new MongoDBInstrumentation({
        enhancedDatabaseReporting: 'true',
      }),
    ],
  });

  // Start the opentelemetry server.
  sdk.start();
  process.on('SIGTERM', () => {
    sdk
      .shutdown()
      .then(
        () => winston.log('SDK shut down successfully'),
        (err) => winston.log('Error shutting down SDK', err),
      )
      .finally(() => process.exit(0));
  });
}

const linearFormat = winston.format((info) => {
  if (info.message) {
    if (info.message.type === 'request') {
      info.message = `request: ${info.message.path}`;
    } else if (info.level === 'error') {
      info.message = `${info.message} ${info.stack}`;
    }
  }
  return info;
});

const consoleFormat = winston.format.combine(linearFormat(), winston.format.simple());
const transports = [new winston.transports.Console({ format: consoleFormat })];

winston.configure({
  level: 'info',
  format: winston.format.json(),
  exitOnError: false,
  transports,
});
export default winston;
