<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model as Eloquent;

class MatchModel extends Eloquent {
    protected $table = 'matches';

    public $timestamps = false;
}
