// Load Environment Variables
import winston from 'winston';

require('dotenv').config();

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

winston.configure({
  level: 'info',
  format: winston.format.json(),
  exitOnError: false,
  transports: [new winston.transports.Console({ format: consoleFormat })],
});
export default winston;
