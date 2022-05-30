const express = require('express');
const cors = require('cors');

const authRoute = require('./routes/auth.route');
const roomRoute = require('./routes/room.route');
const deviceRoute = require('./routes/device.route');
const testRouter = require('./routes/test.router');
const deviceController = require('./controllers/device.controller');
const sensorController = require('./controllers/sensor.controller');

const corsOptions = {
  origin: '*'
};
let item = 5;
 

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/rooms', roomRoute);
app.use('/api/v1/devices', deviceRoute);
app.use('/api/v1/sensors', sensorController);
app.use('/test', testRouter);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to smart home api application.' });
});
 
// eslint-disable-next-line no-unused-vars
app.use(function (error, req, res, next) {
  // eslint-disable-next-line no-console
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
});

module.exports = app;
