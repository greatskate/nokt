exports.loadRoutes = function loadRoutes(app){

}
exports.loadSocket = function loadSocket(io){
  io.on('connection',socket=>{
    socket.on('disconnect', () => {
    })
  })

}
