(function(angular) {

    angular.module('app')
        .controller('TotalViewerController', ['results', TotalViewerController])
             

    function TotalViewerController(results) {
        this.data = results.get();
        this.value = 0;
    }

    TotalViewerController.prototype.activate = function($scope) {
        var vm = this;
        $scope.$watch(vm.data.length, function() {
            var data = vm.data;
            if (data.length == 0) {
                return;
            }

            var asset = data[data.length - 1];
            
            var value = asset.value;
            var multiplier = asset.currency == "USD" ? 1.7 : 1;
            var coefficient = asset.coefficient ? asset.coefficient : 1;

            value *= multiplier;
            vm.value += Math.round(value / coefficient, 2); 
        });
    }

})(angular);