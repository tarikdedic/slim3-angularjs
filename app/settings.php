<?php

return [
    'settings' => [

        // App
        'app_name' => 'slim3-angularjs',

        // Environment (production or development)
        'env' => 'development',

        // MySQL settings
        'db' => [
            'development' => [
                'driver' => 'mysql',
                'host' => '127.0.0.1',
                'database' => 'development_db',
                'username' => 'root',
                'password' => 'root',
                'charset' => 'utf8',
                'collation' => 'utf8_general_ci',
                'prefix' => ''
            ],
            'production' => [
                'driver' => 'mysql',
                'host' => '127.0.0.1',
                'database' => 'production_db',
                'username' => '',
                'password' => '',
                'charset' => 'utf8',
                'collation' => 'utf8_general_ci',
                'prefix' => ''
            ]
        ],

        // Monolog settings
        'logger' => [
            'name' => 'app',
            'path' => __DIR__ . '/../log/' . date('Y-m-d') . '.log',
        ],

        // Slim errors
        'displayErrorDetails' => true
    ]
];
