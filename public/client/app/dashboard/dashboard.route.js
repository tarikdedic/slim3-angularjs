(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'dashboard',
            config: {
                controller: 'DashController',
                controllerAs: 'vm',
                templateUrl: 'client/app/dashboard/templates/dashboard.view.html',
                url: '/home',
                data: {
                    requireLogin: false
                }
            }
        }];
    }
})();
