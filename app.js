var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
require('dns-notfound-what');
var app = express();

var host = 'https://query.yahooapis.com/v1/public/yql';
var offset = 8 + 8 + 8  ; // 8 saturdays, 8 sundays, assume 8 public holidays
var params = {
    q: 'select * from yahoo.finance.historicaldata where symbol = "#ticker#" and startDate = "#start#" and endDate = "#end#"',
    format: 'json',
    env: 'store://datatables.org/alltableswithkeys',
};

app.get('/', function (req, res) {
  res.send('Hello World!!!');
});

app.get('/api/tickers', function (req, res) {
    var obj;
    fs.readFile('assets.json', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        var options = queryOptions('VYM');
        params.q = params.q.replace("#ticker#", options.ticker).replace("#start#", options.start).replace("#end#", options.end);
        var params_data = '?' + querystring.stringify(params);
        https.get(host + params_data, function(resp) { 
            var body = "";
 
            resp.on('data', function(d) {
                body += d;
                console.log('data received');
            });
            
            resp.on('end', function(d) {
               res.send(body);
            });

            resp.on('error', function(e) {
                console.log('error');
                res.send(e);
            })
        });
    });
});

app.get('/api/test', function (req, res) {
    res.send({hello: 'genady'});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

function date(offset) {
    var d = new Date();
    if (offset) {
        d.setDate(d.getDate() + offset);
    }

    return d.toISOString().split("T")[0];
}

function queryOptions(ticker) {
    return {
        ticker: ticker,
        start: date(-1 - offset),
        end: date()
    };
}
