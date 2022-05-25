const roomModel = require('../models/room.model');
exports.create = async (req, res) => {
  try {
    const { name, icon, devicesCount = 0 } = req.body;
    const roomExist = await roomModel.exists({ name: name.toLowerCase() });
    if (roomExist) {
      return res.status(409).json({ message: 'Room name already in use.' });
    }
    const newRoom = await roomModel.create({
      name: name.toLowerCase(),
      icon,
      devicesCount
    });
    res.status(201).json({
      room: newRoom
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
    const rooms = await roomModel.find().populate('devices');
    res.status(200).json({
      rooms: rooms
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
    const room = await roomModel.findById(id);
    res.status(200).json({
      room
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
    const { name, icon, devicesCount } = req.body;
    const room = await roomModel.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        devicesCount
      },
      {
        new: true
      }
    );
    res.status(200).json({
      room
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.'
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const room = await roomModel.findByIdAndDelete(id);
    res.status(200).json({
      room
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.'
    });
  }
};

exports.findAllDevices = async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.id).populate('devices');
    res.status(200).json({
      room: room
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.',
      error: error
    });
  }
};
