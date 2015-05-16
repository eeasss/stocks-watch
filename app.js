var express = require('express');
var fs = require('fs');
var http = require('https');
var querystring = require('querystring');
var app = express();

var host = 'query.yahooapis.com/v1/public/yql';
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
        var params_data = querystring.stringify(params);

        var res = http.get({ host: host, path: params_data }, function(res) { 
            res.on('end', function() {
                res.send(options);
            });

            res.on('error', function(e) {
                res.send(e);
            });
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

var Request = function (options) {
    this.baseUrl = options.baseUrl;
    this.ticker = options.ticker;
    this.start = options.start;
    this.end = options.end;
    this.params = this.initialize(options.params);
};

Request.prototype = {
    get: function (success, error) {
        var req = http.request({host: this.baseUrl}, success);
        req.on('error', error);
    },
    initialize: function (options) {
        options.q = options.q.replace("#ticker#", this.ticker)
                             .replace("#start#", this.start)
                             .replace("#end#", this.end);
        return options;
    }
};

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
        start: date(-50 - offset),
        end: date()
    };
}
