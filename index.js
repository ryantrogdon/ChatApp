var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    usernames = ["richard","bryan", "steve"],
    path = require('path'),
    port = Number(process.env.PORT || 3000);
server.listen(port);
var fs = require('fs');




console.log("server started listening on port 3000")
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'public/index.html')
})
/*
io.on('connection',function(socket){
  console.log("user connected");
});
*/

io.on('connection', function(socket){
  console.log("socket on");
  socket.emit("load-users",usernames);
  socket.on('add-user',function(data,callback){

    if(usernames.indexOf(data) != -1){
      callback(false);

    }
    else{
      socket.username = data;
      usernames.push(socket.username);
      callback(true);
      io.sockets.emit('users',usernames);


    }

    console.log("User added");
  });

  socket.on('new-message',function(data){
    console.log(data);
    io.sockets.emit("format-message",{user:socket.username,msg:data});
    var msg = data;
    var user = socket.username;

  });

  socket.on('disconnect',function(data){
    console.log("user disconnected");
    if(!socket.username) return;
		usernames.splice(usernames.indexOf(socket.username), 1);
		io.sockets.emit('load-users', usernames);
  });

});
