angular.module('app')
    .factory('tickers', ['$http', 'quote', function($http, quote) {
        var CALCULATE = 'C';

        var read = function() { 
            return $http.get('api/tickers');
        };

        var resolve = function(data) {
            for (asset in data) {
                _resolve(data[asset]);
            }
        };

        function _resolve(asset) {
            if (asset.type == CALCULATE) {
                var assets = asset.assets
                for (ticker in assets) {
                    var name = assets[ticker];
                    quote.read(ticker).success(function(data) { assets[ticker] = data.price });
                }
            }
        }

        return {
            read: read,
            resolve: resolve
        };
    }]);
