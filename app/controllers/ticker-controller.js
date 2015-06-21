angular.module('app')
    .controller('TickerCtrl', ['quote', function(quote) {
        var that = this;
        quote.read('VYM').success(function(data) { that.foo = data.price; });        

    }]);
