<?php

// JWT authentication
$app->add(new \Slim\Middleware\JwtAuthentication([
    "path" => "/api",
    "passthrough" => ["/api/auth"],
    "logger" => $container["logger"],
    "secret" => getenv("JWT_SECRET"),
    'regexp' => '/{(.*)}/',
    'secure' => false,
    "error" => function ($request, $response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    },
    "callback" => function ($request, $response, $arguments) use ($container) {
        $container["token"]->hydrate($arguments["decoded"]);
    }
]));