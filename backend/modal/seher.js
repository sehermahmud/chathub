const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SeherSchema = new Schema({
  seher: { type: String, required: false },
});

const Seher = mongoose.model('Seher', SeherSchema);

module.exports = Seher;
