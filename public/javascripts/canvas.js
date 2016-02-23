var DrawingCanvas = (function() {
   var canvas;
   var ctx; 
   
   var drawStack = [];
   var clientId;
   var yeStare;
   var yeLook;
   
   // initialize the canvas module
   function initialize(cid) {
       clientId = cid;
       canvas = document.getElementById("canvas");
       ctx = canvas.getContext("2d"); 
       yeStare = document.getElementById("imgStare");
       yeLook = document.getElementById("imgLook");
       
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
       window.addEventListener("resize", function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; 
       });
       
       requestAnimationFrame(draw);
   }
   
   
   // add an image to the draw stack
   function addToStack(img) {
       drawStack.push(img);
       drawStack.sort(compareTimestamp);
   }
   
   
   // draw the stack to the canvas
   function draw() {
       requestAnimationFrame(draw);
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       for (var i = 0; i < drawStack.length; i++) {
           var img = drawStack[i];
           if (img.client === clientId) {
               ctx.drawImage(yeLook, img.x, img.y);
           } else {
               ctx.drawImage(yeStare, img.x, img.y);
           }
       }
   }
   
   
   // compare to objects by their timestamp
   function compareTimestamp(a, b) {
       if (a.timestamp < b.timestamp) {
           return -1;
       }
       else if (a.timestamp > b.timestamp) {
           return 1;
       }
       else {
           return 0;
       }
   }
   
   return {
       initialize: initialize,
       addToStack: addToStack,
   }
})();