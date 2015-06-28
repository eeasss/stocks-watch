 angular.module('app')
    .factory('currency', ['$http', function($http) {
        var read = function(ticker) {
            return $http.get('/api/ticker?ticker=' + ticker);
        };
        
        return {
            read: read
        };
    }]);
