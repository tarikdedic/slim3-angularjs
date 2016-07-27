// https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y270

(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /*jshint validthis: true */
        this.$get = RouterHelper;
        
        $urlRouterProvider.when('', '/');

        function RouterHelper($state) {
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() {
                return $state.get();
            }
        }
    }
})();
