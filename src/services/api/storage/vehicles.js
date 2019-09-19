const process = require('process');
const level = require('level');
const cuid = require('cuid');
const _ = require('highland');
const rimraf = require('rimraf');

function createStorage({ directory }) {
  const db = level(directory);

  async function add({ id = cuid(), plate }) {
    await db.put(id, JSON.stringify({ id, plate }));
    return { id, plate };
  }

  async function remove(id) {
    await db.del(id);
    return { id };
  }

  async function get(id) {
    try {
      const data = await db.get(id);
      return JSON.parse(data);
    } catch (err) {
      if (err.type) {
        err.code = err.type;
      }

      throw err;
    }
  }

  async function scan() {
    return _(db.createValueStream())
      .map(str => JSON.parse(str))
      .collect()
      .toPromise(Promise);
  }

  function dangerouslySelfDestroy() {
    rimraf.sync(directory);
  }

  return {
    add,
    remove,
    get,
    scan,
    dangerouslySelfDestroy,
  };
}

const { VEHICLE_DATA_STORAGE_DIR = './.data-vehicles' } = process.env;

module.exports = createStorage({ directory: VEHICLE_DATA_STORAGE_DIR });
module.exports.createStorage = createStorage;
