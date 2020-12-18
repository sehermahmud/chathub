const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MoreSchema = new Schema({
  more: { type: String, required: false },
});

const More = mongoose.model('More', MoreSchema);

module.exports = More;
