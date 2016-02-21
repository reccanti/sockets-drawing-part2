var socketio = require('socket.io');
var io = socketio();

/**
 * This function handles the initialization of the socket.io connection
 */
io.sockets.on("connection", function(socket) {
    //console.log(socket);
    socket.join("room1");
    io.sockets.in("room1").emit("updatePara", { data:"butts" });
});

module.exports = io;