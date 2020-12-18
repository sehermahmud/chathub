const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SafinSchema = new Schema({
  safin: { type: String, required: false },
});

const Safin = mongoose.model('Safin', SafinSchema);

module.exports = Safin;
