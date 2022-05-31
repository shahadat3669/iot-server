const sensorModel = require('../models/sensor.model');
const gpioLoad = require('../helper/gpioLoad');
exports.create = async (req, res) => {
  const {
    name,
    icon,
    value,
    gpio,
    message,
  } = req.body;
  console.log(req.body);
  try {
    const newSensor = await sensorModel.create({
      name,
      icon,
      value,
      gpio,
      message
    });
    res.status(201).json({
      sensor: newSensor
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.',
      error: error
    });
  }
};
exports.findAll = async (req, res) => {
  try {
    const sensors = await sensorModel.find();

    // sensors.forEach(sensor => {
    //   gpioLoad.sensorConfig(sensor.name, sensor.gpio)
    // });
    res.status(200).json({
      sensors: sensors
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error occurred. Please Try again.'
    });
  }
};
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const sensor = await sensorModel.findById(id);
    res.status(200).json({
      sensor
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.'
    });
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, icon, value, gpio, message } =
      req.body;
    const oldSensor = await sensorModel.findById(id);
    const sensor = await sensorModel.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        gpio,
        value,
        message,
      },
      {
        new: true
      }
    );
    res.status(200).json({
      sensor
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error occurred. Please Try again.',
      error: error
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const sensor = await sensorModel.findByIdAndDelete(id);
    res.status(200).json({
      sensor
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.'
    });
  }
};
