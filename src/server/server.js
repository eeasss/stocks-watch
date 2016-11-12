/* Usings */
var express = require('express');
var path = require('path');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
var controller =  require('./controller.js');
var app = express();

var staticRoot =  __dirname + '/../';
/* Configure static files */
console.log(staticRoot);
app.use(express.static(staticRoot));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

    controller.init(app);
});
