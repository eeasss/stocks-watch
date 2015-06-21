angular.module('app')
    .factory('quote', ['$http', function($http) {
        var read = function(ticker) {
            var a = $http.get('/api/ticker?ticker=' + ticker);
            console.log(a);
            return a;
        };
        
        return {
            read: read
        };
    }]);
