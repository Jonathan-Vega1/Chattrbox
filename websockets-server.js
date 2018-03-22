var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var message = []; //array for holding the messages. i suspect i will be getting rid of this soon. I was right. Normally this should be a database. no duh, right.


console.log("websockets server started");

//when the user first connects.
ws.on("connection", function(socket) {
  console.log("client connection established");
  //socket.send("this is a topic about pies!!");//this is where i can display the welcome message. OR i can add the message to the beginning of the array.
  message.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("message recieved: " + data);
    var topicFlag = data.indexOf("/topic"); //finds the tag '/topic'
    if (topicFlag == 0) { //the tag '/topic' was found as the first item in the string
      //message = []; //reset array
      //message.push("*** Topic is '" + data.substring(7) + "' ***"); //Push this message into the array
      message.unshift("*** Topic is '" + data.substring(7) + "' ***"); //incase the prof wanted ALL the chat since the chat first began
      data = "*** Topic has changed to '" + data.substring(7) + "' ***"; //send this message to the users currently logged into the chat
    } else {
      message.push(data); //the message is pushed into the array
    }

    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data); //message is sent to the user
    });
  });
});
