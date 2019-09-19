import test from 'ava';
import cuid from 'cuid';
import { createStorage } from './vehicles';

test.beforeEach(t => {
  const directory = `vehicle-data-${cuid()}`;

  Object.assign(t.context, {
    subject: createStorage({ directory }),
  });
});

test.afterEach.always(async t => {
  const { subject } = t.context;

  subject.dangerouslySelfDestroy();
});

test('Should add a vehicle', async t => {
  const { subject } = t.context;
  const data = {
    id: cuid(),
    plate: 'AAA1111',
  };

  await subject.add(data);

  const actual = await subject.get(data.id);
  const expected = data;

  t.deepEqual(actual, expected);
});

test('Should assign the .id property before adding the data to the storage and return it', async t => {
  const { subject } = t.context;

  const data = await subject.add({
    plate: 'AAA1111',
  });

  const actual = await subject.get(data.id);
  const expected = data;

  t.truthy(actual.id);
  t.is(actual.plate, expected.plate);
});

test('Should remove a previously added vehicle', async t => {
  const { subject } = t.context;
  const data = {
    id: cuid(),
    plate: 'AAA1111',
  };

  await subject.add(data);
  await subject.remove(data.id);

  await t.throwsAsync(subject.get(data.id));
});

test('Should return all existing vehicles', async t => {
  const { subject } = t.context;
  const dataList = [
    {
      id: cuid(),
      plate: 'AAA1111',
    },
    {
      id: cuid(),
      plate: 'BBB1212',
    },
  ];

  await Promise.all(dataList.map(item => subject.add(item)));

  const actual = await subject.scan();
  const expected = dataList;

  t.deepEqual(actual, expected);
});
