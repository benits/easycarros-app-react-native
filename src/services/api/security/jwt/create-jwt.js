const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyAsync = promisify(jwt.verify);
const signAsync = promisify(jwt.sign);
const omitUndefined = obj =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value === undefined ? acc : Object.assign(acc, { [key]: value }),
    {}
  );

function isDateLike(expr) {
  if (expr instanceof Date) {
    return true;
  }

  const coerced = new Date(expr);

  if (Number.isNaN(coerced.getTime())) {
    return false;
  }

  return true;
}

function jwtNumericDateToJsDate(numericDate) {
  return new Date(numericDate * 1000);
}

function diffInSeconds(current, another) {
  return Math.floor((another - current) / 1000);
}

function createJwt({ secret, defaultExpiresIn = '7d' }) {
  return {
    async sign(
      data,
      {
        expiresIn = defaultExpiresIn,
        notBefore,
        audience,
        issuer,
        currentDate = new Date(),
      } = {}
    ) {
      const options = omitUndefined({
        expiresIn: isDateLike(expiresIn)
          ? diffInSeconds(currentDate, new Date(expiresIn))
          : expiresIn,
        notBefore: isDateLike(notBefore)
          ? diffInSeconds(currentDate, new Date(notBefore))
          : notBefore,
        audience,
        issuer,
      });

      return signAsync(data, secret, options);
    },

    async verify(
      token,
      {
        audience,
        issuer,
        ignoreExpiration = false,
        ignoreNotBefore = false,
      } = {}
    ) {
      const options = omitUndefined({
        audience,
        issuer,
        ignoreExpiration,
        ignoreNotBefore,
      });

      const { nbf, iat, exp, ...payload } = await verifyAsync(
        token,
        secret,
        options
      );

      return omitUndefined({
        ...payload,
        expiresIn: exp && jwtNumericDateToJsDate(exp),
        notBefore: nbf && jwtNumericDateToJsDate(nbf),
        issuedAt: iat && jwtNumericDateToJsDate(iat),
      });
    },
  };
}

module.exports = createJwt;
