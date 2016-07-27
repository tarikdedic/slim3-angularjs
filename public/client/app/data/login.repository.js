/**
 * Created by tarik on 7/20/16.
 */

(function() {
    'use strict';

    angular
        .module('app.data')
        .service('loginRepository', loginRepository);

    function loginRepository($http, $window, authHelper) {

        var service = {
            login: login,
            logout: logout,
            register: register
        };

        return service;

        //////////

        function login(user) {
            return $http.post('/api/auth/login', user).success(function(data) {
                authHelper.saveToken(data.token);
            });
        }

        function register(user) {
            return $http.post('/api/auth/register', user).success(function(data) {
                authHelper.saveToken(data.token);
            });
        }

        function logout() {
            authHelper.removeToken();
        }
    }
})();
