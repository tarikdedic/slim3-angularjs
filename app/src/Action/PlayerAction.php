<?php

namespace App\Action;

use Psr\Log\LoggerInterface;

use \App\Model\MatchModel;
use \App\Model\PlayerModel;

class PlayerAction {

    private $logger;

    public function __construct(LoggerInterface $logger) {
        $this->logger = $logger;
    }

    public function getAllPlayers($request, $response, $args) {

        $this->logger->info("getAllPlayers action dispatched");

        $players = PlayerModel::all()->toJson();

        return $players;
    }

    public function getAllPlayerMatches($request, $response, $args) {

        $this->logger->info("getAllPlayerMatches action dispatched");

        $player = $args['id'];

        $matches = MatchModel::where('player_1_id', $player)
            ->orWhere('player_2_id', $player)
            ->get()->toJson();

        return $matches;
    }

    public function getWonPlayerMatches($request, $response, $args) {

        $this->logger->info("getWonPlayerMatches action dispatched");

        $player = $args['id'];

        $matches = MatchModel::where('player_winner_id', $player)
            ->get()->toJson();

        return $matches;
    }
}