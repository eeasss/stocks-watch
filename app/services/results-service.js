angular.module('app')
    .factory('results', [function() {
        this.data = [];
        var vm = this;

        function get() {
            return vm.data;
        }

        function set(obj) {
        	vm.data.push(obj);
        }

        return {
            get: get,
            set: set
        };
    }]);
