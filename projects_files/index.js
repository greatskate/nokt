const express = require('express')
var bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io');


var routes = require("./routes");

var session = require("express-session")({
    secret: 'tejeijirenenenfefne',
    resave: true,
    saveUninitialized: true,
   cookie: { maxAge: 6000000 }}
);

const cookeParser =  require('cookie-parser');
const expressValidator =  require('express-validator') ;

var cors = require('cors');

// our localhost port

const port = process.env.PORT;
const origin = process.env.ORIGIN;
const origin_port = process.env.ORIGIN_PORT;

const app = express();
app.use(session);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cors({credentials: true, origin: "http://"+origin+":"+origin_port}));

const server = app.listen(port, () => console.log(`Listening on port ${port}`));


const io = socketIO(server).use(sharedsession(session,{
    autoSave:true
  }));
app.io = io;

routes.loadRoutes(app);
routes.loadSocket(io);


// This is what the socket.io syntax is like, we will work this later
module.exports = app;
