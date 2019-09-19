const process = require('process');
const createJwt = require('./create-jwt');

const {
  JWT_SECRET = 'easycarros-frontend-challenge',
  JWT_DURATION = '30d',
} = process.env;

module.exports = createJwt({ secret: JWT_SECRET, duration: JWT_DURATION });
