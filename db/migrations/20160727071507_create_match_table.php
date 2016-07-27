<?php

use Phinx\Migration\AbstractMigration;

class CreateMatchTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $table = $this->table('matches');
        $table->addColumn('set_1', 'string', array('limit' => 10))
              ->addColumn('set_2', 'string', array('limit' => 10))
              ->addColumn('set_3', 'string', array('limit' => 10))
              ->addColumn('date_played', 'date')
              ->addColumn('player_1_id', 'integer')
              ->addForeignKey('player_1_id', 'players', 'id', array('delete'=> 'CASCADE', 'update'=> 'CASCADE'))
              ->addColumn('player_2_id', 'integer')
              ->addForeignKey('player_2_id', 'players', 'id', array('delete'=> 'CASCADE', 'update'=> 'CASCADE'))
              ->save();
    }
}
