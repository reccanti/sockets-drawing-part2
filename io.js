var socketio = require('socket.io');
var io = socketio();
var uuid = require("node-uuid");

var drawStack = [];

var count = 0;


// generate a unique client id and send it to the client
function generateClientId(socket) {
    socket.on("requestId", function() {     
        var clientId = uuid.v4();
        socket.emit("getUniqueId", {
            id: clientId,
        });
        socket.emit("draw", {
            images: drawStack,
        });
    });
}

// adds an image to the draw stack
function addToDrawStack(socket) {
    socket.on("addToStack", function(data) {
        drawStack.push(data);
        io.sockets.in("room1").emit("draw", {
            images: drawStack,
        });
    });  
}


/**
 * This function handles the initialization of the socket.io connection
 */
io.sockets.on("connection", function(socket) {
    socket.join("room1");
    generateClientId(socket);
    addToDrawStack(socket);
    //onIncrement(socket);
    
});

module.exports = io;