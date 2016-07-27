(function(){
	'use strict';

	angular
		.module('blocks.auth')
		.service('authHelper', authHelper);

		function authHelper($http, $window) {
			
			var service = {
				saveToken: saveToken,
				getToken: getToken,
				isUserAuth: isUserAuth,
				removeToken: removeToken
			};

			return service;

			function saveToken(token) {
				$window.localStorage.token = token;
			}

			function getToken() {
				return $window.localStorage.token;
			}

			function isUserAuth() {
				var token = getToken(),
					payload;

				if(token) {
					payload = token.split('.')[1];
					payload = $window.atob(payload);
					payload = JSON.parse(payload);

					return payload.exp > Date.now() / 1000;
				} else {
					return false;
				}
			}

			function removeToken() {
				return $window.localStorage.removeItem('token');
			}
		}
})();