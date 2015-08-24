angular.module('app')
    .factory('tickers', ['$http', 'quote', function($http, quote) {
        var CALCULATE = 'C';

        var read = function() { 
            return $http.get('api/tickers');
        };

        var resolve = function(data) {
            for (var entity in data) {
                _resolve(data[entity]);
            }
        };

        function _resolve(entity) {
            if (entity.type == CALCULATE) {
                var assets = entity.assets;

                assets.forEach(function(current, index) {
                    (function(current) {
                        quote.read(current.name).success(function(data) {
                            current.price = data.price;
                            current.value = (data.price * current.quantity).toFixed(2);
                        });
                    })(current);
                });
            }
        }

        return {
            read: read,
            resolve: resolve
        };
    }]);
