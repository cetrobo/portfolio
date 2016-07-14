var http    = require('http');
var express = require('express');
var path    = require("path");
var app		= express();
app.use(express.static('web'));


app.set('port', (process.env.PORT || 8080));


app.get('/', function(request, response) {
    var result = 'App is running';
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});