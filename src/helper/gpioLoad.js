const Gpio = require('pigpio').Gpio;

let fireSensor;
let gasSensor;
gasSensor = new Gpio(37, { mode: Gpio.INPUT, alert: true });
gasSensor.on('alert', (level, tick) => {
  console.log(level, 'From gasSensor', tick);
});
fireSensor = new Gpio(38, { mode: Gpio.INPUT, alert: true });
fireSensor.on('alert', (level, tick) => {
  console.log(level, 'From fireSensor', tick);
});
// const sensorConfig = (name, pin) => {
//   switch (name) {
//     case 'Fire Sensor':
//       fireSensor = new Gpio(pin, { mode: Gpio.INPUT, alert: true });
//       fireSensor.on('alert', (level, tick) => {
//         console.log(level, 'From fireSensor', tick);
//       });

//       break;
//     case 'Gas Sensor':
//       gasSensor = new Gpio(pin, { mode: Gpio.INPUT, alert: true });
//       gasSensor.on('alert', (level, tick) => {
//         console.log(level, 'From gasSensor', tick);
//       });
//       break;
//     default:
//       return;
//   }
// };



// module.exports = {
//   fireSensor,
//   gasSensor,
//   sensorConfig,
// };
