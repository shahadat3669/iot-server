const mongoose = require('mongoose');
const sensorSchema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  value: { type: Number },
  gpio: { type: Number },
  message: { type: String },
});
module.exports = mongoose.model('Sensors', sensorSchema);
