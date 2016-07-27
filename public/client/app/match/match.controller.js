(function() {
    'use strict';

    angular
        .module('app.match')
        .controller('MatchController', MatchController);

    function MatchController(matchRepository) {
        var vm = this;
        
        vm.matches = [];

        getAllMatches();

        function getAllMatches() {
            return matchRepository.getAllMatches().then(function(data) {
                vm.matches = data;
                return vm.matches;
            });
        }
    }
})();
