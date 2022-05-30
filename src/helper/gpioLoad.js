const Gpio = require('pigpio').Gpio;
const led = new Gpio(pin, {  alert: true});
led.mode(Gpio.INPUT)
const led2 = new Gpio(pin, {mode: Gpio.INPUT, alert: true});