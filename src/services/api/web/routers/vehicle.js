const { Router } = require('express');
const authorizationMiddleware = require('../middlewares/authorization');
const withStatusCode = require('../util/with-status-code');
const addVehicle = require('../../use-cases/vehicle-add');
const removeVehicle = require('../../use-cases/vehicle-remove');
const getVehicleList = require('../../use-cases/vehicle-get-list');

const router = Router();

router.use(authorizationMiddleware);

router.post('/', async (req, res, next) => {
  const { plate } = req.body || {};

  try {
    const vehicle = await addVehicle({ plate });
    return res.json({
      data: vehicle,
    });
  } catch (err) {
    return next(withStatusCode(400, err));
  }
});

router.get('/', async (req, res, next) => {
  try {
    const vehicleList = await getVehicleList();
    return res.json({
      data: vehicleList,
    });
  } catch (err) {
    return next(withStatusCode(500, err));
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await removeVehicle({ id });
    return res.status(204).end();
  } catch (err) {
    const statusCode = err.code === 'NotFoundError' ? 404 : 500;
    return next(withStatusCode(statusCode, err));
  }
});

module.exports = router;
