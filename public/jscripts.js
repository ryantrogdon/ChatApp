

$(document).ready(function(){
    var socket = io();

    $("#user-submit").click(function(){

        socket.emit('add-user', $("#username").val(), function(data){
          if(data){
            alert("user added");
          }
          else{
            alert("failed");
          }
        });

        $("#username").val("");
    });

    socket.on('users',function(data){

        $('#users').append(data[data.length-1] + "<br/>");


    });

    socket.on('load-users',function(data){
      $('#users').empty();
      $('#users').html("<h2>Users</h2>")
      for(i=0; i < data.length; i++){
        $('#users').append(data[i] + "<br/>");
      }

    });

    $("#send").click(function(){
      socket.emit("new-message",$("#message").val());
      $("#message").val("");
    });

    socket.on("format-message",function(data){
      $('#chat').append(data.user + ": " + data.msg + " " + "<br/>");
    });

});
