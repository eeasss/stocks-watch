angular.module('app')
    .factory('tickers', ['$http', 'quote', function($http, quote) {
        var CALCULATE = 'C';

        var read = function() { 
            return $http.get('api/tickers');
        };

        var resolve = function(data) {
            window.data = data;
            for (var entity in data) {
                _resolve(data[entity]);
            }
        };

        function _resolve(entity) {
            if (entity.type == CALCULATE) {
                var assets = entity.assets
                for (var ticker in assets) {
                    (function(tick) {
                        quote.read(ticker).success(function(data) {
                            assets[tick].price = data.price;
                            assets[tick].value = data.price * assets[tick].quantity;
                        });
                    })(ticker)
                }
            }
        }

        return {
            read: read,
            resolve: resolve
        };
    }]);
