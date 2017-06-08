# slim3-angularjs

Slim3, migrations, JWT authentication, eloquent ORM and Monolog.
&
AngularJS, Twitter Bootstrap (Sass) and Grunt.

### Local configuration

* [root] -> composer install
* [public/client] -> npm install
* [public/client] -> grunt
* [app/src] -> Modify settings.php
* [root] -> php vendor/bin/phinx migrate -e development  
    	  -> php vendor/bin/phinx seed:run -s PlayerSeeder  
    	  -> php vendor/bin/phinx seed:run -s MatchSeeder
* [root] -> Create .env file from .env.example with your JWT_SECRET
* Run php built in web server or create VirtualHost
