var socketio = require('socket.io');
var io = socketio();
var uuid = require("node-uuid");
var moment = require("moment");

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
        drawStack.sort(compareTimestamp);
        io.sockets.in("room1").emit("draw", {
            images: drawStack,
        });
    });  
}

// compare to objects by their timestamp
function compareTimestamp(a, b) {
    console.log(a);
    var momenta = moment(a.timestamp);
    var momentb = moment(b.timestamp);
    if (momenta.diff(momentb) < 0) {
        return -1;
    }
    else if (momenta.diff(momentb) > 1) {
        return 1;
    }
    else {
        return 0;
    }
}

/**
 * This function handles the initialization of the socket.io connection
 */
io.sockets.on("connection", function(socket) {
    socket.join("room1");
    generateClientId(socket);
    addToDrawStack(socket);    
});

module.exports = io;