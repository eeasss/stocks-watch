(function(angular) {

    angular.module('app')
        .controller('TotalViewerController', ['results', 'notification', 'categories', TotalViewerController])


    function TotalViewerController(results, notification, categories) {
        var vm = this;
        vm.data = results.get();
        vm.value = 0;
        vm.categories = categories.read();

        notification.bind('ticker-resolved', function(e, data) {
            vm.value += parseFloat(data.value);;

            updateCategories(data, vm.categories);
            updateAllocations(data, vm.categories, vm.value);

        });

        function updateCategories(ticker, categories) {
            var category = categories.find(c => c.name === ticker.category);
            category.value += parseFloat(ticker.value);
        }

        function updateAllocations(ticker, categories, totalValue) {
            categories.forEach(category => {
                category.percentage = ((category.value / totalValue) * 100).toFixed(2) + '%';
            });
        }
    }

})(angular);