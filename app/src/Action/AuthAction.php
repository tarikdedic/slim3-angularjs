<?php

namespace App\Action;

use Tuupola\Base62;
use Firebase\JWT\JWT;

use \App\Model\PlayerModel;

class AuthAction {

    public function register($request, $response, $arguments) {
        $player = new PlayerModel();

        $player->firstname = $request->getParam('firstname');
        $player->lastname = $request->getParam('lastname');
        $player->email = $request->getParam('email');

        $password = $request->getParam('password');
        $player->password = $this->setPassword($password);

        $player->save();
    }

    public function login($request, $response, $arguments) {

        $email = $request->getParam('email');
        $password = $request->getParam('password');
        $scopes = $request->getParam('scopes');

        $player = PlayerModel::where('email', $email)->first();

        if (!$player) {
            return $response->withStatus(404)
                ->withHeader("Content-Type", "application/json")
                ->write(json_encode("User not found!"));
        }

        if ($this->checkPassword($password, $player['password']) === false) {
            return $response->withStatus(404)
                ->withHeader("Content-Type", "application/json")
                ->write(json_encode("Incorrect password!"));
        }

        return $response->withStatus(201)
            ->withHeader("Content-Type", "application/json")
            ->write($this->generateJWT($player, $scopes));
    }

    public function generateJWT($player, $scopes) {
        $requested_scopes = $scopes;

        $valid_scopes = [
            "match.create",
            "match.read",
            "match.update",
            "match.delete",
            "match.list",
            "match.all"
        ];

        $scopes = array_filter($requested_scopes, function ($needle) use ($valid_scopes) {
            return in_array($needle, $valid_scopes);
        });

        $now = new \DateTime();
        $future = new \DateTime("now +2 hours");
        $jti = Base62::encode(random_bytes(16));

        $payload = [
            "firstname" => $player['firstname'],
            "lastname" => $player['lastname'],
            "email" => $player['email'],
            "iat" => $now->getTimeStamp(),
            "exp" => $future->getTimeStamp(),
            "jti" => $jti,
            "scope" => $scopes
        ];

        $secret = getenv('JWT_SECRET');
        $token = JWT::encode($payload, $secret, "HS256");
        $data["status"] = "ok";
        $data["token"] = $token;

        return json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    }

    public function setPassword($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public function checkPassword($password, $hash) {
        if (password_verify($password, $hash)) {
            return true;
        } else {
            return false;
        }
    }
}
