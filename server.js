/*jshint esversion: 6 */
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket) {

    // New user
    socket.on('join', function(user_data) {
        socket.screenName = user_data.name;
        socket.color = user_data.color;
        var socket_data = {
            name: socket.screenName,
            color: socket.color,
            message: socket.screenName + ' has joined.'
        };
        io.emit('join', socket_data);
    });



    // Message recieved
    socket.on('chat message', function(message) {
        var socket_data = {
            name: socket.screenName,
            color: socket.color,
            message: message + '  --' + socket.screenName
        };
        io.emit('chat message', socket_data);
    });

    // User is typing
    // socket.on('typing', function() {
    //     io.emit('typing', socket.screenName + ' is typing.');
    // });

    // Disconnect
    socket.on('disconnect', function() {
        io.emit('disconnect', socket.screenName + ' has left the chat room.');
    });
});




// Start the server
http.listen(3000, function() {
    console.log('listening on port 3000');
});
