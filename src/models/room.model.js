const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  icon: { type: String },
  devicesCount: { type: Number },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Devices'
    }
  ]
});

module.exports = mongoose.model('Rooms', roomSchema);
