const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://seher:seher123@chat0.2xxl8.mongodb.net/chat?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connected');
});

const ChatRouter = require('./routes/chat');
const MoreRouter = require('./routes/more');
const SafinRouter = require('./routes/safin');
const SeherRouter = require('./routes/seher');

app.use('/chating', ChatRouter);
app.use('/more', MoreRouter);
app.use('/safin', SafinRouter);
app.use('/seher', SeherRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
