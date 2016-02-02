/* Usings */
var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
var controller =  require('./controller.js');
var app = express();

/* Configure static files */

app.use(express.static('app'));
app.use(express.static('bower_components/angular'));
app.use(express.static('bower_components/angular-new-router/dist'));
app.use(express.static('bower_components/jquery/dist'));
app.use(express.static('bower_components/bootstrap/dist/css'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
 
    console.log('Example app listening at http://%s:%s', host, port);

    controller.init(app);
});
