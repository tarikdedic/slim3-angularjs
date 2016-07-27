(function() {
    'use strict';

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
