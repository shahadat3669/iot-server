const express = require('express');
const Gpio = require('pigpio').Gpio;
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const {value} = req.body;
    console.log(value);
    const led = new Gpio(4, {mode: Gpio.OUTPUT});
    led.digitalWrite(value);
    // led.pwmWrite(value)
    //     const { name, icon, devicesCount = 0 } = req.body;
    //     const roomExist = await roomModel.exists({ name: name.toLowerCase() });
    //     if (roomExist) {
    //       return res.status(409).json({ message: 'Room name already in use.' });
    //     }
    //     const newRoom = await roomModel.create({
    //       name: name.toLowerCase(),
    //       icon,
    //       devicesCount,
    //     });npm install nodemon --save-dev
        res.status(201).json({
            message: "success",
            value: value,
        });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred. Please Try again.',
      error: error,
    });
  }
});
module.exports = router;