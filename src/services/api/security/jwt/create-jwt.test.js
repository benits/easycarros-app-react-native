import test from 'ava';
import subject from './create-jwt';

function almostEqual(t, input, expected, delta) {
  t.true(Math.abs(expected - input) < delta);
}

test.beforeEach(t => {
  Object.assign(t.context, {
    jwt: subject({ secret: 'dummySecret' }),
  });
});

test(`
  [sign]
  Should properly convert Javscript dates to JWT NumericDate.
`, async t => {
  const { jwt } = t.context;
  const payload = { dummy: 'data' };
  const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const notBefore = new Date(Date.now() - 1 * 60 * 1000);
  const currentDate = new Date();

  const token = await jwt.sign(payload, {
    expiresIn,
    notBefore,
    currentDate,
  });

  const decoded = await jwt.verify(token);

  almostEqual(t, decoded.expiresIn, expiresIn, 5000);
  almostEqual(t, decoded.notBefore, notBefore, 5000);
  almostEqual(t, decoded.issuedAt, currentDate, 5000);
});

test(`
  [sign]
  Should properly convert ISO-8601 string dates to JWT NumericDate.
`, async t => {
  const { jwt } = t.context;
  const payload = { dummy: 'data' };
  const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const notBefore = new Date(Date.now() - 1 * 60 * 1000);
  const currentDate = new Date();

  const token = await jwt.sign(payload, {
    expiresIn: expiresIn.toISOString(),
    notBefore: notBefore.toISOString(),
    currentDate,
  });

  const decoded = await jwt.verify(token);

  almostEqual(t, decoded.expiresIn, expiresIn, 5000);
  almostEqual(t, decoded.notBefore, notBefore, 5000);
  almostEqual(t, decoded.issuedAt, currentDate, 5000);
});

test(`
  [sign]
  Should properly convert Javscript dates with milliseconds to JWT NumericDate.
`, async t => {
  const { jwt } = t.context;
  const payload = { dummy: 'data' };
  const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000 + 133);
  const notBefore = new Date(Date.now() - 1 * 60 * 1000 + 133);
  const currentDate = new Date();

  const token = await jwt.sign(payload, {
    expiresIn,
    notBefore,
    currentDate,
  });

  const decoded = await jwt.verify(token);

  almostEqual(t, decoded.expiresIn, expiresIn, 5000);
  almostEqual(t, decoded.notBefore, notBefore, 5000);
  almostEqual(t, decoded.issuedAt, currentDate, 5000);
});

test(`
  [sign]
  Should passthrough zeit/ms expressions.
`, async t => {
  const { jwt } = t.context;
  const payload = { dummy: 'data' };
  const expiresIn = '24h';
  const notBefore = '-1h';
  const currentDate = new Date();

  const token = await jwt.sign(payload, {
    expiresIn,
    notBefore,
    currentDate,
  });

  const decoded = await jwt.verify(token);

  almostEqual(
    t,
    decoded.expiresIn,
    new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
    1000
  );
  almostEqual(
    t,
    decoded.notBefore,
    new Date(currentDate.getTime() - 60 * 60 * 1000),
    1000
  );
  almostEqual(t, decoded.issuedAt, currentDate, 5000);
});
