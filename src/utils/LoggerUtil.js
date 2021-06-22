const pino = require('pino');

const LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL || 'trace';

/**
 * Logger Configuration
 */
const logger = pino({
  level: LOG_LEVEL,
  prettyPrint: {
    colorize: true,
  },
});

module.exports = logger;
