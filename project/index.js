const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

const db = require('./db');

const PORT = 8080;

const app = express();

const index = require('./routes/index')

app.use(cors());
app.use(bodyParser.json());
app.use(index);

const server = http.createServer(app);
db.create()
  .then(() => {
    console.log('Tables Sync');
  })
  .catch(() => {
    console.log('Table Already Sync');
  });
server.listen(PORT, () => {
    console.log(`[@]name listening on port ${PORT}!`);
  });
