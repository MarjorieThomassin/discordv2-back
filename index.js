require('dotenv').config();

// init the express app
const express = require('express');
const cors = require('cors');
const connection = require('./db-config');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(`connected to database with threadId :  ${connection.threadId}`);
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`server is listening on ${port}`);
  }
});

app.use('/uploads', express.static('uploads'));

const routes = require('./routes');

app.use(routes);

module.exports = app;
