var socketio = require('socket.io');
var io = socketio();
var uuid = require("node-uuid");

var count = 0;


// generate a unique client id and send it to the client
function generateClientId(socket) {
    socket.on("requestId", function() {     
        var clientId = uuid.v4();
        socket.emit("getUniqueId", {
            id: clientId,
        });
    })
}

/**
 * This function handles the initialization of the socket.io connection
 */
io.sockets.on("connection", function(socket) {
    socket.join("room1");
    generateClientId(socket);
    //onIncrement(socket);
    
});

module.exports = io;