(function() {
    'use strict';

    angular
        .module("S3A_App")
        .factory('appStart', appStart);

    function appStart($state, $rootScope, authHelper) {

        var appStart = {
            start: start,
        };

        return appStart;

        function start() {
            stateChangeStart();
        }

        function stateChangeStart() {
            $rootScope.$on('$stateChangeStart',
                function(e, toState) {

                    var requireLogin = toState.data.requireLogin;

                    if (requireLogin && !authHelper.isUserAuth()) {
                        e.preventDefault();
                        $state.go('login');
                    }
                });
        }
    }
})();
