<?php

use App\ReturnMotive;
use Illuminate\Database\Seeder;

class ReturnMotiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        ReturnMotive::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        ReturnMotive::create(['remo_description' => "Motivo 1"]);
        ReturnMotive::create(['remo_description' => "Motivo 2"]);
        ReturnMotive::create(['remo_description' => "Motivo 3"]);
        ReturnMotive::create(['remo_description' => "Motivo 4"]);
        ReturnMotive::create(['remo_description' => "Motivo 5"]);
        ReturnMotive::create(['remo_description' => "Motivo 6"]);
        ReturnMotive::create(['remo_description' => "Motivo 7"]);
        ReturnMotive::create(['remo_description' => "Motivo 8"]);
        ReturnMotive::create(['remo_description' => "Motivo 9"]);
    }
}
