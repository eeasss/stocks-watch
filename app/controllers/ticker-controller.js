angular.module('app')
    .controller('TickerCtrl', ['quote', 'tickers', '$scope', function(quote, tickers, $scope) { 
       tickers.read().success(function(data) { 
            $scope.data = data;
            tickers.resolve(data);
        });

        return $scope.data;
    }])
    .directive('tickerViewer', [function() {
        
        return {
            restrict: 'E',
            link: function(scope, element, attr){
                scope.$watch(function(scope) { return scope.data; }, function(data) {
                    element.empty();
                    for (var asset in data) {
                        var assetsContainer = jQuery('<div>' + data[asset].name + '</div>');
                        var current = data[asset];
                        for (var assetName in current.assets) {
                            var currentAsset = current.assets[assetName];
                            var assetContainer = jQuery('<div></div>');
                            assetContainer.append('<div>' + assetName + '</div>');
                            var value = currentAsset.value || currentAsset.price * currentAsset.quantity;
                            assetContainer.append('<div>Value: ' + value + '</div>');
                            assetsContainer.append(assetContainer);
                        }
                        element.append(assetsContainer);
                    }
                     
                }, true);
            }
        };

    }]);
             
