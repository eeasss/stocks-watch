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
            debugger;
        }


    }, 1000);
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