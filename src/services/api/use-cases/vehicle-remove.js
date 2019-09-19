const yup = require('yup');
const storage = require('../storage/vehicles');

const schema = yup.object().shape({
  id: yup.string().required(),
});

const sanitize = ({ id }) => ({
  id: String(id).trim(),
});

async function remove({ id }) {
  const data = sanitize({ id });
  await schema.validate(data);

  return storage.remove(data.id);
}

module.exports = remove;
