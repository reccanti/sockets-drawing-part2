var socketio = require('socket.io');
var io = socketio();

var count = 0;


/**
 * This function handles an increment event on the socket
 */
function onIncrement(socket) {
    socket.on("incrementCount", function(data) {
        count++;
        io.sockets.in("room1").emit("updatePara", { val: count });
    });
}


/**
 * This function handles the initialization of the socket.io connection
 */
io.sockets.on("connection", function(socket) {
    socket.join("room1");
    onIncrement(socket);
    
});

module.exports = io;