angular.module('app')
    .controller('TickerCtrl', ['quote', 'tickers', TickerController])
    .directive('tickerViewer', [tickerViewer]);
             

function TickerController(quote, tickers) {
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
            replace: true,
            controllerAs: 'ticker',
            bindToController: true,
            templateUrl: 'app/components/ticker-viewer/ticker-viewer.html'
        };
}