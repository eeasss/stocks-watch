/* Usings */
var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
var app = express();

/* Configure static files */

app.use(express.static('app'));
app.use(express.static('app/views'));
app.use(express.static('app/public'));

/* Variables */

/* Stocks */
var host = 'https://query.yahooapis.com/v1/public/yql';
var offset = 8 + 8 + 8  ; // 8 saturdays, 8 sundays, assume 8 public holidays
var params = {};
params.stocks = function() {
    this.q = 'select * from yahoo.finance.quote where symbol in ("#ticker#")';
    this.format =  'json';
    this.env = 'store://datatables.org/alltableswithkeys';
};

/* Currency */
params.currency = function() {
    this.q = 'select * from yahoo.finance.xchange where pair in ("EURUSD")';
    this.format='json';
    this.env = this.env = 'store://datatables.org/alltableswithkeys';
}

/* REST */

app.get('/api/tickers', function (req, res) {
   var promise = new Promise(function(resolve, reject) {
         readStorage(function (err, data) {
            if (err) {
                throw err;
            }

            resolve(JSON.parse(data));
         });   
    });
    
    promise.then(function(val) { res.send(val); });
    
});

app.get('/api/currency', function(req, res) {
    var p = new params.currency();
    var params_data = '?' + querystring.stringify(p);
    var promise = new Promise(function(resolve, reject) {
        https.get(host + params_data, function(resp) {
            var body = '';
            resp.on('data', function(d) {
                body += d;
            });

            resp.on('end', function(d) {
                var parsedBody = JSON.parse(body);
                var price = parsedBody.query.results.rate.Rate;
                console.log('price is: ' + price);
                resolve(price);
            });

            resp.on('error', function(e) {
                reject(e);
            });
        });

        promise.then(function(val) { res.send('{ "price" : "' + val + '" }'); });
    });
});

app.get('/api/ticker', function(req, res) {
    var assetName = req.query['ticker'];
    var p = new params.stocks();
    p.q = p.q.replace('#ticker#', assetName);
    var params_data = '?' + querystring.stringify(p);
    var promise = new Promise(function(resolve, reject) {
        https.get(host + params_data, function(resp) { 
            var body = '';
            resp.on('data', function(d) {
                body += d;
            });
            
            resp.on('end', function(d) {
                var parsedBody = JSON.parse(body);
                var price = parsedBody.query.results.quote.LastTradePriceOnly;
                resolve(price);
            });

            resp.on('error', function(e) {
                reject(e); 
            })
        });
    });

    promise.then(function(val) { res.send('{ "price": "' + val + '" }'); });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
 
    console.log('Example app listening at http://%s:%s', host, port);
});

function readStorage(callback) {
    fs.readFile('assets.json', 'utf8', callback);
}

function writeStorage(name, callback) {
}

function date(offset) {
    var d = new Date();
    if (offset) {
        d.setDate(d.getDate() + offset);
    }

    return d.toISOString().split("T")[0];
}
/*
var IO = function(fs) {
    this.fs = fs;
};

IO.getInstance = function() {
    if (this.instance == null) {
        this.instance = new IO(fs);
    }

    return this.instance;
}

IO.prototype.read(name, encoding, callback) {
    fs.readFile(name, encoding, callback);
}
*/
