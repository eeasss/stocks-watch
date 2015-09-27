angular.module('app')
    .factory('tickers', ['$http', 'quote', 'results', function($http, quote, results) {
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
                    (function(current, entity) {
                        quote.read(current.name).success(function(data) {
                            current.price = data.price;
                            current.value = (data.price * current.quantity).toFixed(2);
                            current.currency = entity.currency;
                            current.coefficient = entity.coefficient;
                            /* TO DO: REFACTOR TO PASS ONLY RELEVANT INFORMATION. jq.EXTEND? */
                            results.add(current);
                        });
                    })(current, entity);
                });
            }
        }

        return {
            read: read,
            resolve: resolve
        };
    }]);
