var socket;
var countField;

window.addEventListener("load", function() {
    countField = document.getElementById("count");
    socket = io.connect(); 
    socket.on("updatePara", function(data) {
        var node = createNode(data.val);
        addNode(node);
        setTimeout(function() {
            removeNode(node);
        }, 1500);
    });
});


setInterval(incrementCount, 3000);

    
/**
 * A function that tells the server to increment its count
 */
function incrementCount() {
    socket.emit("incrementCount", {});
}


/**
 * Create a div node containing a value
 */
function createNode(val) {
    var divNode = document.createElement("div");
    divNode.innerHTML = val;
    return divNode;
}


/**
 * Add a node to the count div
 */
function addNode(node) {
    countField.appendChild(node);
}

/**
 * Remove a div node from the count div
 */
function removeNode(node) {
    countField.removeChild(node);
}
