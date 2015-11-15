(function(angular) {

    angular.module('app')
        .controller('TickerViewerController', ['tickers', TickerViewerController]);
             

    function TickerViewerController(tickers) {
        var vm = this;

        tickers.read().success(function(data) { 
            vm.data = data;
            tickers.resolve(data);
        });

        return vm.data;
    }
     
})(angular);
