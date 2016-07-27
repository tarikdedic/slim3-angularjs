<?php

// Start PHP session
session_start();

// Autoloader
require_once ROOT_DIR . DS . 'vendor' . DS . 'autoload.php';

// Env
$dotenv = new Dotenv\Dotenv(ROOT_DIR);
$dotenv->load();

// Instantiate the app
$app = new \Slim\App(include 'settings.php');

// Set up dependencies
require 'dependencies.php';

// Register middleware
require 'middleware.php';

// Register routes
require 'routes.php';

// Run!
$app->run();
