angular.module('app')
    .controller('TotalController', ['$scope', 'results', TotalController])
    .directive('totalViewer', [totalViewer]);
             

function TotalController($scope, results) {
    var vm = this;
    var data = results.get();
    $scope.data = data;
    vm.value = 1;

    $scope.$watch('data.length', function() {
        if (data.length == 0) {
            return;
        }
        
        var asset = data[data.length - 1];
        var value = asset.value;
        var multiplier = asset.currency == "USD" ? 1.7 : 1;
        var coefficient = asset.coefficient ? asset.coefficient : 1;

        value *= multiplier;
        vm.value += parseFloat((value / coefficient).toFixed(2));
    });

 
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