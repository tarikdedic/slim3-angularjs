angular.module('S3A_App').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('client/app/layout/navbar.html',
    "<nav class=\"navbar navbar-inverse navbar-fixed-top\" data-ng-controller=\"Navbar as vm\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"\" ui-sref=\"dashboard\">Slim3 & AngularJS App</a></div><div id=\"navbar\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"dashboard\">Home</a></li><li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"allMatches\" data-ng-if=\"vm.isUserAuth\">Matches</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"login\" data-ng-if=\"!vm.isUserAuth\">Login</a></li><li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"logout\" data-ng-if=\"vm.isUserAuth\">Logout</a></li></ul></div><!--/.nav-collapse --></div></nav>"
  );


  $templateCache.put('client/app/dashboard/templates/dashboard.view.html',
    "<section class=\"section section-dashboard\" data-ng-controller=\"DashController as vm\"><section class=\"not-authenticated\"><h2>Dashboard</h2></section></section>"
  );


  $templateCache.put('client/app/login/templates/login.view.html',
    "<section class=\"section section-auth\"><div class=\"alert alert-danger\" role=\"alert\" data-ng-show=\"vm.showAlert\" data-ng-bind=\"vm.errMessage\"></div><form id=\"LoginForm\" name=\"LoginForm\" data-ng-submit=\"LoginForm.$valid && vm.login()\"><h3>Please log in</h3><div class=\"form-group\"><input type=\"email\" id=\"email\" class=\"form-control\" placeholder=\"Email address\" data-ng-model=\"vm.formData.email\" required autofocus></div><div class=\"form-group\"><input type=\"password\" id=\"password\" class=\"form-control\" placeholder=\"Password\" data-ng-model=\"vm.formData.password\" required></div><button class=\"btn btn-primary\" type=\"submit\">Log In</button></form></section>"
  );


  $templateCache.put('client/app/match/templates/match.view.html',
    "<section class=\"section section-matches\"><ul data-ng-repeat=\"match in vm.matches\"><li>Match #{{$index + 1}}</li><li>{{ match.set_1 }}</li><li>{{ match.set_2 }}</li><li>{{ match.set_3 }}</li></ul></section>"
  );

}]);
