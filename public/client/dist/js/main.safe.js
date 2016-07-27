(function() {
	'use strict';

	angular.module('blocks.auth', []);
})();
(function(){
	'use strict';

		authHelper.$inject = ['$http', '$window'];
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
(function() {
    'use strict';

    angular.module('blocks.router', ['ui.router']);
})();

// https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y270

(function() {
    'use strict';

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /*jshint validthis: true */
        RouterHelper.$inject = ['$state'];
        this.$get = RouterHelper;
        
        $urlRouterProvider.when('', '/');

        function RouterHelper($state) {
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() {
                return $state.get();
            }
        }
    }
})();

/**
 * Created by tarik on 7/20/16.
 */

(function() {
    'use strict';

    angular.module('app.core', [

        // Angular modules
        'ui.router',

        // Reusable cross app code modules  (eg. logger)
        'blocks.router',
        'blocks.auth'

        // 3rd party modules (eg. ui.bootstrap)

    ]);
})();

(function() {
    'use strict';

    angular
        .module('app.core');
    // .constant('', '')
    // .value('a', {
    // 	b: ''
    // });
})();

/**
 * Created by tarik on 7/20/16.
 */

 (function() {
 	'use strict';

 	angular.module('app.data', []);
 })();
/**
 * Created by tarik on 7/20/16.
 */

(function() {
    'use strict';

    loginRepository.$inject = ['$http', '$window', 'authHelper'];
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

/**
 * Created by tarik on 7/26/16.
 */

(function() {
    'use strict';

    matchRepository.$inject = ['$http', '$state', '$window', 'authHelper'];
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

(function() {
	'use strict';

    angular.module('app.layout', []);
})();

(function() {
    'use strict';

    Navbar.$inject = ['$scope', 'authHelper'];
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

(function() {
    'use strict';

    angular.module('app.dashboard', []);
})();


(function() {
    'use strict';

    DashController.$inject = ['authHelper'];
    angular
        .module('app.dashboard')
        .controller('DashController', DashController);

    function DashController(authHelper) {
        var vm = this;

        vm.isUserAuth = authHelper.isUserAuth();
    }
})();

(function() {
    'use strict';

    appRun.$inject = ['routerHelper'];
    angular
        .module('app.dashboard')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'dashboard',
            config: {
                controller: 'DashController',
                controllerAs: 'vm',
                templateUrl: 'client/app/dashboard/templates/dashboard.view.html',
                url: '/home',
                data: {
                    requireLogin: false
                }
            }
        }];
    }
})();

(function() {
    'use strict';

    angular.module('app.login', []);
})();


(function() {
    'use strict';

    LoginController.$inject = ['$location', '$state', 'loginRepository'];
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

(function() {
    'use strict';

    appRun.$inject = ['routerHelper'];
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

(function() {
    'use strict';
    
    angular.module('app.match', []);
})();


(function() {
    'use strict';

    MatchController.$inject = ['matchRepository'];
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

(function() {
    'use strict';

    appRun.$inject = ['routerHelper'];
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

(function() {
    'use strict';

    runApp.$inject = ['appStart'];
    angular.module('S3A_App', [
        'app.core',
        'app.data',
        
        'app.layout',
        'app.dashboard',
        'app.match',
        'app.login'

    ]).run(runApp);

    function runApp(appStart) {
        appStart.start();
    }
})();

(function() {
    'use strict';

    appStart.$inject = ['$state', '$rootScope', 'authHelper'];
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
