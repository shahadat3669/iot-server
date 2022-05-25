const mongoose = require('mongoose');
const deviceSchema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  type: { type: String },
  controlType: { type: String },
  switchStatus: { type: Boolean },
  value: { type: Number },
  gpio: { type: Number },
  volt: { type: Number },
  loadOption: { type: String },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Rooms' }
});
module.exports = mongoose.model('Devices', deviceSchema);
