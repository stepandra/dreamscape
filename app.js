var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var path    = require("path");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var json = require('./users.json');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/Publish'));
app.get('/',function(req,res) {
     res.sendFile(path.join(__dirname+'/Publish/index.html'));
});

 io.sockets.on('connection', function(socket) {
  socket.emit('notification', json);

  fs.watch('users.json', (event, filename) => {
    if (filename) {
      fs.readFile('users.json', 'utf8', function (err, data) {
        if (err) throw err;
        socket.volatile.emit('notification', JSON.parse(data));
      });
    } else {
      console.log('filename not provided');
    }
  });

  socket.on('update', function(data) {
    console.log(data);
  })
});

http.listen(3000, function() { //listen to 3000
  console.log('listening on *:3000');
});
