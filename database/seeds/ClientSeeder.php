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

        Client::create([
            'feen_fk' => 27,
            'clie_identifier' => "Cliente1",
            'clie_name' => "Francisco Gabriel Alvarez Alvarez",
            'clie_rfc' => "AAAF9107106I4",
            'clie_phone' => "9934367727",
            'clie_email' => "frank.alvalc@gmai.com",
            'clie_addres' => "Calle Jacinto Ticoman Edificio E, Departamento 302, Cosmos II, Colonia Ciudad Industrial",
            'clie_cp' => "86017",
            'clie_city' => "Villahermosa",
        ]);

        Client::create([
            'feen_fk' => 27,
            'clie_identifier' => "Cliente2",
            'clie_name' => "Jose Bernabe Ricardez",
            'clie_rfc' => "JBRI9107106I4",
            'clie_phone' => "9966632255",
            'clie_email' => "j.bernabe@gmai.com",
            'clie_addres' => "Pomoca",
            'clie_cp' => "86017",
            'clie_city' => "Villahermosa",
        ]);

    }
}
