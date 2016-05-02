angular.module('app')
    .factory('tickers', ['$http', 'quote', 'results', function($http, quote, results) {
        var CALCULATE = 'C';

        var TickerService = function() {
        }

        TickerService.prototype = {
            read: function() {
                return $http.get('api/tickers');
            },

            resolve: function(data) {
                Object.keys(data).forEach(key=> {
                    var entity = data[key];

                    switch (entity.type) {
                        case CALCULATE:
                            this._calculate(entity);
                        break;
                    }
                });
            },

            _calculate: function(entity) {
                var assets = entity.assets;
                var currency = entity.currency;
                assets.forEach((cur, index) => {
                    quote.read(cur.name).success(data => {
                        cur.price = data.price;
                        cur.value = (data.price * cur.quantity).toFixed(2);
                        cur.currency = currency;

                        results.add(cur);
                    });
                });
            }
        }

        return new TickerService();
    }]);
