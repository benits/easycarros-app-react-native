// eslint-disable-next-line no-unused-vars
function errorHandlerMiddleware(err, req, res, next) {
  const { message, errors = [], statusCode = 500 } = err;
  const detailsMixin = errors.length > 0 ? { details: errors } : {};

  const serializedError = {
    message,
    ...detailsMixin,
  };

  res.status(statusCode).send({ error: serializedError });
}

module.exports = errorHandlerMiddleware;
