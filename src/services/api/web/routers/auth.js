const { Router } = require('express');
const authenticate = require('../../use-cases/authenticate');
const withStatusCode = require('../util/with-status-code');

const router = Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body || {};

  try {
    const token = await authenticate({ email, password });

    return res.json({
      data: {
        token,
      },
    });
  } catch (err) {
    return next(withStatusCode(401, err));
  }
});

module.exports = router;
