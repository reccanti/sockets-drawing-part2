var socket;
var countField;
var id;

window.addEventListener("load", function() {
    countField = document.getElementById("count");
    socket = io.connect(); 
    socket.emit("requestId", {});
    
    var submitButton = document.getElementsByName("input")[0];
    var xPos = document.getElementsByName("xPos")[0];
    var yPos = document.getElementsByName("yPos")[0];
    submitButton.addEventListener("click", function() {
        var x = xPos.value;
        var y = yPos.value;
        var imgData = {
            x: x,
            y: y,
            client: id,
            timestamp: moment().format()
        }
        socket.emit("addToStack", imgData);
    });
    
    receiveUserId(socket);
    drawOnCanvas(socket);
});


// allows for the creation of a user ID
function receiveUserId(socket) {
    socket.on("getUniqueId", function(data) {
       id = data.id;
       DrawingCanvas.initialize(id);
    });
}

// draw to the canvas
function drawOnCanvas(socket) {
    socket.on("draw", function(data) {
        console.log("drawing");
        DrawingCanvas.setDrawStack(data.images);
    });
}

// setInterval(incrementCount, 3000);

    
// /**
//  * A function that tells the server to increment its count
//  */
// function incrementCount() {
//     socket.emit("incrementCount", {});
// }


// /**
//  * Create a div node containing a value
//  */
// function createNode(val) {
//     var divNode = document.createElement("div");
//     divNode.innerHTML = val;
//     return divNode;
// }


// /**
//  * Add a node to the count div
//  */
// function addNode(node) {
//     countField.appendChild(node);
// }

// /**
//  * Remove a div node from the count div
//  */
// function removeNode(node) {
//     countField.removeChild(node);
// }
