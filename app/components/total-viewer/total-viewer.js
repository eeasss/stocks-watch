angular.module('app')
    .controller('TotalController', ['results', TotalController])
    .directive('totalViewer', [totalViewer]);
             

function TotalController(results) {
    var vm = this;
    var data = results.get();
    vm.value = 1;

    var interval = setInterval(function() {
        if (data.length == 1) {
            clearInterval(interval);
            var totalValue = 0;
            var assets = data[0];

            assets.forEach(function(asset) {
                debugger;
                var value = 0;
                var multiplier = asset.currency == "USD" ? 1.7 : 1;
                var coefficient = asset.coefficient ? asset.coefficient : 1;

                asset.assets.forEach(function(node) {
                    value += parseInt(node.value);
                });

                value *= multiplier;
                (totalValue += value / coefficient);
            });

            vm.value = totalValue;
        }
    }, 1000);
}

function calculateValue() {
}
 
function totalViewer() {
     return {
            restrict: 'E',
            replace: false,
            controller: 'TotalController',
            controllerAs: 'total',
            bindToController: true,
            templateUrl: 'components/total-viewer/total-viewer.html'
        };
}