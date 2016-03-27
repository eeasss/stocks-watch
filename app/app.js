(function(angular) {

    angular.module('app', ['ngNewRouter'])
       .controller('AppController', ['$router', AppController]);

    AppController.$routeConfig = [
        {
            path: '/',
            components: {
                master: 'totalViewer',
                detail: 'tickerViewer'
             }
        }
    ];

    function AppController($router) {
    }

})(angular);
