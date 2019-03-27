const EXECUTOR_SERVER_URL = 'http://localhost:5000/code_start';

// Create express HTTP server, port, request/response handler, redis client
var http = require('http'),
    express = require('express'),
    request = require('request'),
    redis = require('redis'),
    app = express(),
    server = http.createServer(app),
    redisClient = redis.createClient(),
    port = 8080;

server.listen(port);
server.on('listening', onListening);


app.get('/', function (req, res) {
    request.get(EXECUTOR_SERVER_URL, function(error, response, body) {
        res.send(body);
    });
});


redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

redisClient.set('my test key', 'my test value', redis.print);
redisClient.get('my test key', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});


function onListening() {
	console.log('App listening on port ', port);
}