const port = 8080;
const socketio = require('socket.io')(port);

var routes = require("./routes");


const init = () => {
	console.log(`Now listening on port : ${port}.`);
	routes.loadSocket(socketio);
}

init();
