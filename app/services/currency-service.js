angular.module('app')
    .factory('currency', ['$http', function($http) {
        function resolve(currencyName, price) {
            var result = 0;
            switch (currencyName) {
                case 'USD':
                    result = (price * 1.7);
                break;
                case 'EUR':
                    result = (price * 1.95);
                break;
            }

            return result.toFixed(2);
        }

        return {
            resolve: resolve
        };
    }]);

