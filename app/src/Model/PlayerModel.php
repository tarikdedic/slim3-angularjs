<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model as Eloquent;

class PlayerModel extends Eloquent {
    protected $table = 'players';

    public $timestamps = false;
}
