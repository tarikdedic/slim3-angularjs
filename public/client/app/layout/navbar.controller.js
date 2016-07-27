(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Navbar', Navbar);

    function Navbar($scope, authHelper) {
        var vm = this;

        $scope.$watch(function() {
            return authHelper.isUserAuth();
        }, function(newVal) {
            vm.isUserAuth = newVal;
        }, true);
    }
})();
