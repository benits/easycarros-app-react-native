const { Bearer } = require('permit');
const withStatusCode = require('../util/with-status-code');
const authorize = require('../../use-cases/authorize');

const permit = new Bearer();

async function authorizationMiddleware(req, res, next) {
  const token = permit.check(req);
  if (!token) {
    permit.fail(res);
    return next(
      Object.assign(new Error('Authentication required!'), { statusCode: 401 })
    );
  }

  try {
    const { id, email } = await authorize({ token });
    req.user = { id, email };
    return next();
  } catch (err) {
    permit.fail(res);
    return next(withStatusCode(401, err));
  }
}

module.exports = authorizationMiddleware;
