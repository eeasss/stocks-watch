angular.module('app')
    .factory('categories', [function() {
        // to do: read this from server
        var categories = [
            "USA ETF",
            "REIT",
            "Yield Co",
            "Emerging and International ETF",
            "Stocks",
            "EMEA ETF"
        ]
        
        return {
            read: function() {
                return categories.map(c => { 
                    return { name: c, value: 0 } 
                });
            }
        }
        
    }]);

