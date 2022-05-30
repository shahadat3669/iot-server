const express = require('express');
const Gpio = require('pigpio').Gpio;
const router = express.Router();
let led;
const fun = (pin, loadOption, alert) => {
  switch(loadOption) {
    case 'digitalRead':
    case 'pwmRead':
      led = new Gpio(pin, {mode: Gpio.INPUT, alert: true});
      break;
    case 'digitalWrite':
    case 'pwmWrite':
      led = new Gpio(pin, {mode: Gpio.OUTPUT, alert: true});
      break;
    default:
      return
  }
  return led;
}

const fun2 = (pin, loadOption, alert) => {
  switch(loadOption) {
    case 'digitalRead':
    case 'pwmRead':
      led = new Gpio(pin, {mode: Gpio.INPUT, alert: true});
      break;
    case 'digitalWrite':
    case 'pwmWrite':
      led = new Gpio(pin, {mode: Gpio.OUTPUT, alert: true});
      break;
    default:
      return
  }
  return led;
}

 
router.post('/', async (req, res) => {
  try {
    const {value} = req.body;
    // const led = new Gpio(4, {mode: Gpio.OUTPUT, alert: true});
    const loadOption = 'digitalRead';
    const news = fun(21, loadOption, true);
    console.log(news);
    console.log( "From " ,news.digitalRead());
    // news.digitalWrite(value);
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
    console.log(error);
    return res.status(500).json({
      message: 'Error occurred. Please Try again.',
      error: error,
    });
  }
});
module.exports = router;