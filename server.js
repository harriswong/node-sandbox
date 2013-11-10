var http = require("http");
var url = require("url");
var io = require("socket.io");

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(pathname, response);
    };
    
    //our node http server
    var server = http.createServer(onRequest);
    var serv_io = io.listen(server);
    server.listen(8888);
    console.log("Server has started");
    
    serv_io.sockets.on('connection', function (socket) {
        console.log("IO Clients:", io.clients);
        socket.join("defaultRoom");
        socket.on('inputMessage', function (data) {
            console.log("Message received: ", data);
            if (data.message) {
                //if not empty
                var feedback = data.username + ": " + data.message;
                serv_io.sockets.in("defaultRoom").emit("feedback", feedback);
            } else {
                //back to this client
                var feedback = "(Psst..Don't send an empty message...)";
                socket.emit("feedback", feedback);
            }
        });
    });
}

exports.start = start;
