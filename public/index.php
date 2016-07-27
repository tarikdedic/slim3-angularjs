<?php

if (PHP_SAPI == 'cli-server') {

    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $file = __DIR__ . $_SERVER['REQUEST_URI'];

    if (is_file($file)) {
        return false;
    }
}

// Constant
define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', dirname(__DIR__) . DS);

// Boot
require ROOT_DIR . 'app' . DS . 'bootstrap.php';
