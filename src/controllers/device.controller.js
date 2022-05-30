const deviceModel = require('../models/device.model');
const roomModel = require('../models/room.model');
const Gpio = require('pigpio').Gpio;
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
    if(type === 'sensor' && value === 1){
      switchStatus = true
    }
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
exports.allDevices = async ( ) => {
  try {
    const devices = await deviceModel.find();
    return devices;
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
    const { name, icon, switchStatus, controlType, value, type, room, gpio, loadOption } =
      req.body;
      const oldDevice = await deviceModel.findById(id);
     if(oldDevice.switchStatus !== switchStatus || oldDevice.value !== value && type === 'load' ){
      switch(loadOption) {
        case 'digitalRead':
         
          break;
        case 'digitalWrite':
          console.log(switchStatus)
          const led = new Gpio(gpio, {mode: Gpio.OUTPUT});
            led.digitalWrite(switchStatus);
          break;
        case 'pwmRead':
           
          break;
        case 'pwmWrite':
          const led4 = new Gpio(gpio, {mode: Gpio.OUTPUT});
          if(switchStatus){
            led4.pwmWrite(value)
          }else{
            led4.pwmWrite(0)
          }
          break;
        default:
          return
      }
     }
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
