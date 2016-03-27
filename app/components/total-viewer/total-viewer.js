(function(angular) {

    angular.module('app')
        .controller('TotalViewerController', ['results', 'notification', TotalViewerController])
             

    function TotalViewerController(results, notification) {
        var vm = this;
        vm.data = results.get();
        vm.value = 0;
        
        notification.bind('ticker-resolved', function(e, data) {
            //to do: refactor in currency service
            var val = data.value;
            if (data.currency === 'USD') {
                val *= 1.7;
            }

            vm.value += parseFloat(val);
        });
    
    }

})(angular);