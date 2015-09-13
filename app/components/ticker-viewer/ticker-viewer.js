angular.module('app')
    .controller('TickerController', ['quote', 'tickers', 'results', TickerController])
    .directive('tickerViewer', [tickerViewer]);
             

function TickerController(quote, tickers, results) {
    var vm = this;

    tickers.read().success(function(data) { 
        vm.data = data;
        tickers.resolve(data);
    });

    return vm.data;
}
 
function tickerViewer() {
     return {
            restrict: 'E',
            replace: false,
            controller: 'TickerController',
            controllerAs: 'ticker',
            bindToController: true,
            templateUrl: 'components/ticker-viewer/ticker-viewer.html'
        };
}