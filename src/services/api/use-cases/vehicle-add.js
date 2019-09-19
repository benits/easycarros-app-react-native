const yup = require('yup');
const storage = require('../storage/vehicles');

const schema = yup.object().shape({
  plate: yup
    .string()
    .matches(/^[a-zA-Z0-9]{7}$/, {
      message: 'Should be a valid vehicle plate: XXX0000 ou XXX0X000',
    })
    .required(),
});

const sanitize = ({ plate }) => ({
  plate: String(plate)
    .trim()
    .replace(/\W/g, ''),
});

async function addVehicle({ plate = '' }) {
  const data = sanitize({ plate });
  await schema.validate(data);

  return storage.add(data);
}

module.exports = addVehicle;
