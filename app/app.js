(function(angular) {

    angular.module('app.filters', []);
    angular.module('app', ['ngNewRouter', 'app.filters'])
       .controller('AppController', ['$router', AppController]);

    AppController.$routeConfig = [
        {
            path: '/',
            components: {
                master: 'totalViewer',
                detail: 'tickerViewer',
             }
        }
    ];

    function AppController($router) {
    }

})(angular);
