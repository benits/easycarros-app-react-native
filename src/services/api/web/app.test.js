import test from 'ava';
import cuid from 'cuid';
import request from 'supertest';
import rimraf from 'rimraf';
import proxyquire from 'proxyquire';
import userFixtures from '../storage/users.fixtures';
import authenticate from '../use-cases/authenticate';

test.beforeEach(async t => {
  const vehicleDataStorageDir = `data-vehicles-${cuid()}`;

  const app = proxyquire('./app', {
    process: {
      env: {
        VEHICLE_DATA_STORAGE_DIR: vehicleDataStorageDir,
      },
      '@global': true,
    },
  });
  const user = Object.values(userFixtures)[0];
  const token = await authenticate(user);

  Object.assign(t.context, { app, token, vehicleDataStorageDir });
});

test.afterEach.always(async t => {
  const { vehicleDataStorageDir } = t.context;

  rimraf.sync(vehicleDataStorageDir);
});

test('[POST /auth] Should return status 200 and a token when credentials are valid', async t => {
  const { app } = t.context;
  const user = Object.values(userFixtures)[0];
  const { status, body } = await request(app)
    .post('/auth')
    .send({ email: user.email, password: user.password });

  t.is(status, 200);
  t.truthy(body.data.token);
});

test('[POST /auth] Should return status 401 and an error description when credentials are invalid', async t => {
  const { app } = t.context;
  const { status, body } = await request(app)
    .post('/auth')
    .send({ email: 'invalid email', password: 'invalid password' });

  t.is(status, 401);
  t.truthy(body.error);
});

test('[POST /auth] Should return status 401 and an error description when email is valid, but password is invalid', async t => {
  const user = Object.values(userFixtures)[0];
  const { app } = t.context;
  const { status, body } = await request(app)
    .post('/auth')
    .send({ email: user.email, password: 'invalid password' });

  t.is(status, 401);
  t.truthy(body.error);
});

test('[POST /auth] Should return status 401 and an error description when email and password are missing', async t => {
  const { app } = t.context;
  const { status, body } = await request(app)
    .post('/auth')
    .send({});

  t.is(status, 401);
  t.truthy(body.error);
});

test('[POST /vehicle] Should return status 401 and an error description when token is invalid', async t => {
  const { app } = t.context;

  const { status, body } = await request(app)
    .post('/vehicle')
    .set('Authorization', `Bearer invalid`)
    .send({ plate: 'AAA1111' });

  t.is(status, 401);
  t.truthy(body.error);
});

test('[POST /vehicle] Should return status 200 and the created vehicle when valid plate is provided', async t => {
  const { app, token } = t.context;

  const { status, body } = await request(app)
    .post('/vehicle')
    .set('Authorization', `Bearer ${token}`)
    .send({ plate: 'AAA1111' });

  t.is(status, 200);
  t.truthy(body.data.id);
});

test('[POST /vehicle] Should return status 400 and a validation error when plate is invalid', async t => {
  const { app, token } = t.context;

  const { status, body } = await request(app)
    .post('/vehicle')
    .set('Authorization', `Bearer ${token}`)
    .send({ plate: 'this is invalid!!!' });

  t.is(status, 400);
  t.truthy(body.error);
});

test('[POST /vehicle] Should return status 400 and a validation error when plate is missing', async t => {
  const { app, token } = t.context;

  const { status, body } = await request(app)
    .post('/vehicle')
    .set('Authorization', `Bearer ${token}`)
    .send({});

  t.is(status, 400);
  t.truthy(body.error);
});

test('[POST /vehicle] Should return status 401 and an error when authorization token is missing', async t => {
  const { app } = t.context;
  const { status, body } = await request(app)
    .post('/vehicle')
    .send({ plate: 'this is invalid!!!' });

  t.is(status, 401);
  t.truthy(body.error);
});

test('[GET /vehicle] Should return status 200 and the list of vehicles', async t => {
  const { app, token } = t.context;

  const plates = ['AAA1111', 'BBB1212'];
  const vehicleList = await Promise.all(
    plates.map(async plate => {
      const { body } = await request(app)
        .post('/vehicle')
        .set('Authorization', `Bearer ${token}`)
        .send({ plate });

      return body.data;
    })
  );

  const { status, body } = await request(app)
    .get(`/vehicle`)
    .set('authorization', `Bearer ${token}`);

  t.is(status, 200);
  t.deepEqual(body.data.sort(), vehicleList.sort());
});

test('[DELETE /vehicle/:id] Should return status 204 when vehicle previously exists', async t => {
  const { app, token } = t.context;

  const plates = ['AAA1111', 'BBB1212'];
  const vehicleList = await Promise.all(
    plates.map(async plate => {
      const { body } = await request(app)
        .post('/vehicle')
        .set('Authorization', `Bearer ${token}`)
        .send({ plate });

      return body.data;
    })
  );

  const { status } = await request(app)
    .del(`/vehicle/${vehicleList[0].id}`)
    .set('authorization', `Bearer ${token}`);

  t.is(status, 204);
});

test('[DELETE /vehicle/:id] Should return status 204 when vehicle does not exist', async t => {
  const { app, token } = t.context;

  const plates = ['AAA1111', 'BBB1212'];
  await Promise.all(
    plates.map(async plate => {
      const { body } = await request(app)
        .post('/vehicle')
        .set('Authorization', `Bearer ${token}`)
        .send({ plate });

      return body.data;
    })
  );

  const { status } = await request(app)
    .del(`/vehicle/dummy-id`)
    .set('authorization', `Bearer ${token}`);

  t.is(status, 204);
});
