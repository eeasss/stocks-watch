angular.module('app.filters', []).
    filter('currency', function() {
        return (input) => {
           
            // pass this to a currency service
            return (input * 1.7).toFixed(2);
        }
    });