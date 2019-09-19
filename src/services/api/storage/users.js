const cuid = require('cuid');
const userFixtures = require('./users.fixtures');

let users = { ...userFixtures };

async function get(id) {
  const user = users[id];

  if (!user) {
    throw Object.assign(new Error('User not found'), { code: 'NotFoundError' });
  }

  return user;
}

async function getByEmail(email) {
  const user = Object.values(users).find(data => data.email === email);

  if (!user) {
    throw Object.assign(new Error('User not found'), { code: 'NotFoundError' });
  }

  return user;
}

async function add({ id = cuid(), email, password }) {
  Object.assign(users, {
    [id]: {
      id,
      email,
      password,
    },
  });

  return { id, email, password };
}

async function remove(id) {
  delete users[id];

  return { id };
}

async function clear() {
  users = { ...userFixtures };
}

module.exports = {
  get,
  getByEmail,
  add,
  remove,
  clear,
};
