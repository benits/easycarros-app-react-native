const yup = require('yup');
const storage = require('../storage/users');
const jwt = require('../security/jwt');

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});

const sanitize = ({ email, password }) => ({
  email,
  password,
});

const checkPasswordMatch = ({ inputPassword, userPassword }) => {
  if (inputPassword !== userPassword) {
    throw new Error('Invalid password');
  }
};

async function authenticate({ email = '', password = '' }) {
  const data = sanitize({ email, password });
  await schema.validate(data);

  try {
    const user = await storage.getByEmail(data.email);

    checkPasswordMatch({
      inputPassword: data.password,
      userPassword: user.password,
    });

    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload);
  } catch (err) {
    throw Object.assign(new Error('Invalid credentials'), { cause: err });
  }
}

module.exports = authenticate;
