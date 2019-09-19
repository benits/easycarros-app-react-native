require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authRouter = require('./routers/auth');
const vehicleRouter = require('./routers/vehicle');

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: `http://${process.env.APP_HOST}:${process.env.APP_PORT}`, // Change .env to match your frontend configs
  })
);
app.use('/auth', authRouter);
app.use('/vehicle', vehicleRouter);
app.use(errorHandlerMiddleware);

module.exports = app;
