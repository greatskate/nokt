const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

const PORT = 8080;

const app = express();

const index = require('./routes/index')

app.set('views','routes/html');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(index);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`[@]name listening on port ${PORT}!`);
  });
