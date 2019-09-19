import test from 'ava';
import cuid from 'cuid';
import subject from './users';

test.afterEach(() => {
  subject.clear();
});

test('Should add user', async t => {
  const data = {
    id: cuid(),
    email: 'foo@bar.com',
    password: 'fo0b4r',
  };

  await subject.add(data);

  const actual = await subject.get(data.id);
  const expected = data;

  t.deepEqual(actual, expected);
});

test('Should find a user by its email', async t => {
  const data = {
    id: cuid(),
    email: 'foo@barbaz.com',
    password: 'fo0b4r',
  };

  await subject.add(data);

  const actual = await subject.getByEmail(data.email);
  const expected = data;

  t.deepEqual(actual, expected);
});

test('Should remove an existing user', async t => {
  const data = {
    id: cuid(),
    email: 'foo@barbaz.com',
    password: 'fo0b4r',
  };

  await subject.add(data);
  await subject.remove(data.id);

  await t.throwsAsync(subject.get(data.id));
});
