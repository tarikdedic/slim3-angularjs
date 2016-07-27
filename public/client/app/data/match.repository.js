/**
 * Created by tarik on 7/26/16.
 */

(function() {
    'use strict';

    angular
        .module('app.data')
        .service('matchRepository', matchRepository);

    function matchRepository($http, $state, $window, authHelper) {

        var service = {
            getAllMatches: getAllMatches,
            addMatch: addMatch
        };

        return service;

        //////////

        function getAllMatches() {
            return $http.get('/api/match/list', {
                    headers: {
                        'Authorization': 'Bearer {' + authHelper.getToken() + '}'
                    }
                })
                .then(getMatchesComplete);
                // .catch(function(message) {
                //     $state.go('login');
                // });

            function getMatchesComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function addMatch() {

        }
    }
})();
