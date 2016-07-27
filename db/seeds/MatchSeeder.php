<?php

use Phinx\Seed\AbstractSeed;

class MatchSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {
        $data = array(
                  array(
                      'set_1' => '06',
                      'set_2' => '06',
                      'set_3' => '06',
                      'date_played' => date('Y-m-d H:i:s'),
                      'player_1_id' => 1,
                      'player_2_id' => 2
                  ),
                  array(
                      'set_1' => '60',
                      'set_2' => '60',
                      'set_3' => '60',
                      'date_played' => date('Y-m-d H:i:s'),
                      'player_1_id' => 2,
                      'player_2_id' => 1
                  ),
                );

                $matches = $this->table('matches');
                $matches->insert($data)
                        ->save();
    }
}
