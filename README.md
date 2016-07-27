# slim3-angularjs

slim3-angularjs is a simple skeleton project that includes migrations, JWT authentication, eloquent ORM, Monolog.
Client side includes AngularJS, Twitter Bootstrap (Sass) and Grunt as a task runner.

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