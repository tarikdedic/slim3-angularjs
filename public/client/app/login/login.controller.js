(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    function LoginController($location, $state, loginRepository) {
        var vm = this;

        vm.formData = {};
        vm.login = login;

        vm.showAlert = false;
        vm.errMessage = '';

        //////////

        function login() {
            var data = {
                email: vm.formData.email,
                password: vm.formData.password
            };

            return loginRepository.login(data)
                .success(function(data) {
                    $state.go('dashboard');
                })
                .error(function(data) {
                    vm.showAlert = true;
                    vm.errMessage = data;
                });
        }
    }
})();
