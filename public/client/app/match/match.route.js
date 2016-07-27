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
            state: 'allMatches',
            config: {
                controller: 'MatchController',
                controllerAs: 'vm',
                templateUrl: 'client/app/match/templates/match.view.html',
                url: '/matches',
                data: {
                    requireLogin: true
                }
            }
        }];
    }
})();
