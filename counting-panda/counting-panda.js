var http = require('http');
var config = require('./config.json');
var HttpDispatcher = require('httpdispatcher');
var get_counter = 0;
var dispatcher     = new HttpDispatcher();

function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/", function(req, res) {
    get_counter++;
    res.end(get_counter);
});

dispatcher.onError(function(req, res) {
        res.writeHead(404);
        res.end("404 - Page Does not exists");
});

http.createServer(handleRequest).listen(config.port, function(){
    console.log("Server listening on: http://localhost:%s", config.port);
});
