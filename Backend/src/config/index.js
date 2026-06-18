/**
 * Configuration Index
 * Load appropriate config based on environment
 */

const nodeEnv = process.env.NODE_ENV || 'development';

const config = {
  development: require('./development.config'),
  production: require('./production.config'),
};

module.exports = config[nodeEnv] || config.development;
