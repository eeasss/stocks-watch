angular.module('app')
    .factory('results', [function() {
        this.data = [];
        var vm = this;

        function add(entity) {
            vm.data.push(entity);
        }

        function get() {
            return vm.data;
        }

        return {
            add: add,
            get: get
        };
    }]);
