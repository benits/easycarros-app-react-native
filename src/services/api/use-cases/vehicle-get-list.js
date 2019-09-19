const storage = require('../storage/vehicles');

async function getList() {
  return storage.scan();
}

module.exports = getList;
