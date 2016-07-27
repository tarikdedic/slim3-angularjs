<?php

namespace App\Action;

use App\Token\Token;
use Psr\Log\LoggerInterface;

use \App\Model\MatchModel;

class MatchAction {

    private $logger;
    private $token;

    public function __construct(LoggerInterface $logger, Token $token) {
        $this->logger = $logger;
        $this->token = $token;
    }

    public function getAllMatches() {

        /* Check if token has needed scope. */
        // if (false === $this->token->hasScope(["match.all", "match.list"])) {
        //     $this->logger->info("getAllMatches - Token not allowed to list matches.");
        //     throw new \Exception("Token not allowed to list matches.", 403);
        // }

        $this->logger->info("getAllMatches action dispatched");

        $matches = MatchModel::all()->toJson();

        return $matches;
    }
}