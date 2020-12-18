const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  chat: { type: String, required: false },
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
