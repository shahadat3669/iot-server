const deviceModel = require('../models/device.model');
const roomModel = require('../models/room.model');

exports.create = async (req, res) => {
  const {
    name,
    icon,
    switchStatus,
    value,
    type,
    gpio,
    volt,
    loadOption,
    controlType,
    room
  } = req.body;
  try {
    console.log(req.body);
    const newDevice = await deviceModel.create({
      name,
      icon,
      controlType: controlType === 'switch' ? null : controlType,
      value,
      type,
      gpio,
      volt,
      loadOption,
      room,
      switchStatus
    });

    await roomModel
      .findByIdAndUpdate(
        room,
        {
          $inc: { devicesCount: 1 },
          $addToSet: {
            devices: newDevice._id
          }
        },
        {
          new: true
        }
      )
      .populate('devices');

    res.status(201).json({
      device: newDevice
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
    const devices = await deviceModel.find();
    res.status(200).json({
      devices: devices
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.'
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const device = await deviceModel.findById(id);
    res.status(200).json({
      device
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
    const { name, icon, switchStatus, controlType, value, type, room } =
      req.body;
    const device = await deviceModel.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        value,
        switchStatus,
        controlType,
        type,
        room
      },
      {
        new: true
      }
    );
    res.status(200).json({
      device
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.',
      error: error
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const device = await deviceModel.findByIdAndDelete(id);
    res.status(200).json({
      device
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.'
    });
  }
};
