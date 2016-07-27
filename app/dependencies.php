<?php
// DIC configuration

// Fetch DI Container
$container = $app->getContainer();

// Get environment
$environment = $container->settings['env'];


// Eloquent ORM
$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container->settings['db'][$environment]);
$capsule->setAsGlobal();
$capsule->bootEloquent();


// Monolog
$container['logger'] = function ($container) {

    $logger = new \Monolog\Logger($container->settings['logger']['name']);

    $logger->pushHandler(new \Monolog\Handler\StreamHandler(
        $container->settings['logger']['path'],
        \Monolog\Logger::DEBUG
    ));

    return $logger;
};

// JWT Authentication
$container['token'] = function ($container) {
    return new App\Token\Token();
};

// Factories
$container['App\Action\PlayerAction'] = function ($container) {
    return new App\Action\PlayerAction($container['logger']);
};

$container['App\Action\MatchAction'] = function ($container) {
    return new App\Action\MatchAction($container['logger'], $container['token']);
};
