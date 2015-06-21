angular.module('app')
    .controller('TickerCtrl', ['quote', 'tickers', function(quote, tickers) {
        var that = this;
        tickers.read().success(function(data) { tickers.resolve(data); });
    }]);
