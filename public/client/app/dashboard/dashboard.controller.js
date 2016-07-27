(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashController', DashController);

    function DashController(authHelper) {
        var vm = this;

        vm.isUserAuth = authHelper.isUserAuth();
    }
})();
