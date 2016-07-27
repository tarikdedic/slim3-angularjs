<?php

use Phinx\Seed\AbstractSeed;

class PlayerSeeder extends AbstractSeed
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
                      'firstname' => 'John',
                      'lastname' => 'Doe',
                      'password' => '$2y$10$rLMur1KvcXs4SDtfM5lFKesUXHeBSBZUIqOU9FY6wUUkrpd0vvE7a', // password: test
                      'birthdate' => date('Y-m-d H:i:s'),
                      'email' => 'john.doe@test.com'
                  ),
                  array(
                      'firstname' => 'Jane',
                      'lastname' => 'Doe',
                      'password' => '$2y$10$rLMur1KvcXs4SDtfM5lFKesUXHeBSBZUIqOU9FY6wUUkrpd0vvE7a', // password: test
                      'birthdate' => date('Y-m-d'),
                      'email' => 'jane.doe@test.com'
                  )
                );

                $players = $this->table('players');
                $players->insert($data)
                        ->save();
    }
}

