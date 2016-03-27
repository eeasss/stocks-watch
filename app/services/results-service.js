angular.module('app')
    .factory('results', ['notification', function(notification) {
        var vm = this;
        vm.data = [];

        function add(entity) {
            vm.data.push(entity);
            notification.trigger('ticker-resolved', entity);
        }

        function get() {
            return vm.data;
        }

        return {
            add: add,
            get: get
        };
    }]);
