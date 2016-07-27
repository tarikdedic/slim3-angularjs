(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'login',
            config: {
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: 'client/app/login/templates/login.view.html',
                url: '/login',
                data: {
                    requireLogin: false
                }
            }
        }, {
            state: 'logout',
            config: {
                controller: ['$rootScope', '$state', 'loginRepository', function($rootScope, $state, loginRepository) {
                    loginRepository.logout();
                    $state.go('dashboard');
                }],
                url: '/logout',
                data: {
                    requireLogin: true
                }
            }
        }];
    }
})();
