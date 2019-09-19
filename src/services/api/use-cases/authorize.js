const yup = require('yup');
const storage = require('../storage/users');
const jwt = require('../security/jwt');

const schema = yup.object().shape({
  token: yup.string().required(),
});

const sanitize = ({ token }) => ({ token });

async function authorize({ token = '' }) {
  const data = sanitize({ token });

  await schema.validate({ token });

  try {
    const payload = await jwt.verify(data.token);

    await storage.get(payload.id);

    return payload;
  } catch (err) {
    throw Object.assign(new Error('Invalid credentials'), {
      cause: err,
    });
  }
}

module.exports = authorize;
