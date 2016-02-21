var socket;
window.addEventListener("load", function() {
    socket = io.connect(); 
    socket.on("updatePara", function(data) {
        console.log(data);
    });
    
});