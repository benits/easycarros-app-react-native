const withStatusCode = (statusCode, err) =>
  Object.create(err, {
    statusCode: {
      value: statusCode,
      enumerable: true,
    },
  });

module.exports = withStatusCode;
