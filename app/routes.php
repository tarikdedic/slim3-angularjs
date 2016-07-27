<?php

$app->group('/api', function () {

    // Authentication
    $this->group('/auth', function () {
        $this->post('/register', 'App\Action\AuthAction:register');
        $this->post('/login', 'App\Action\AuthAction:login');
    });

    // Players
    $this->group('/player', function () {
        $this->get('/list', 'App\Action\PlayerAction:getAllPlayers');
    });

    // Matches
    $this->group('/match', function () {
        $this->get('/list', 'App\Action\MatchAction:getAllMatches');
    });

});