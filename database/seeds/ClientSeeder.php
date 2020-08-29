<?php

use App\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Client::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Client::create([
            'feen_fk' => 27,
            'clie_identifier' => "ClienteGenerico",
            'clie_name' => "Cliente Generico",
            'clie_rfc' => "",
            'clie_phone' => "",
            'clie_email' => "",
            'clie_addres' => "",
            'clie_cp' => "",
            'clie_city' => "",
        ]);
    }
}
