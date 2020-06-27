<?php

use App\FederalEntity;
use Illuminate\Database\Seeder;

class FederalEntitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        FederalEntity::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        FederalEntity::create([
            'feen_pk' => 1,
            'feen_name' => "Aguascalientes"
        ]);
        FederalEntity::create([
            'feen_pk' => 2,
            'feen_name' => "Baja California"
        ]);
        FederalEntity::create([
            'feen_pk' => 3,
            'feen_name' => "Baja California Sur"
        ]);
        FederalEntity::create([
            'feen_pk' => 4,
            'feen_name' => "Campeche"
        ]);
        FederalEntity::create([
            'feen_pk' => 5,
            'feen_name' => "Coahuila"
        ]);
        FederalEntity::create([
            'feen_pk' => 6,
            'feen_name' => "Colima"
        ]);
        FederalEntity::create([
            'feen_pk' => 7,
            'feen_name' => "Chiapas"
        ]);
        FederalEntity::create([
            'feen_pk' => 8,
            'feen_name' => "Chihuahua"
        ]);
        FederalEntity::create([
            'feen_pk' => 9,
            'feen_name' => "Distrito Federal"
        ]);
        FederalEntity::create([
            'feen_pk' => 10,
            'feen_name' => "Durango"
        ]);
        FederalEntity::create([
            'feen_pk' => 11,
            'feen_name' => "Guanajuato"
        ]);
        FederalEntity::create([
            'feen_pk' => 12,
            'feen_name' => "Guerrero"
        ]);
        FederalEntity::create([
            'feen_pk' => 13,
            'feen_name' => "Hidalgo"
        ]);
        FederalEntity::create([
            'feen_pk' => 14,
            'feen_name' => "Jalisco"
        ]);
        FederalEntity::create([
            'feen_pk' => 15,
            'feen_name' => "México"
        ]);
        FederalEntity::create([
            'feen_pk' => 16,
            'feen_name' => "Michoacán"
        ]);
        FederalEntity::create([
            'feen_pk' => 17,
            'feen_name' => "Morelos"
        ]);
        FederalEntity::create([
            'feen_pk' => 18,
            'feen_name' => "Nayarit"
        ]);
        FederalEntity::create([
            'feen_pk' => 19,
            'feen_name' => "Nuevo León"
        ]);
        FederalEntity::create([
            'feen_pk' => 20,
            'feen_name' => "Oaxaca"
        ]);
        FederalEntity::create([
            'feen_pk' => 21,
            'feen_name' => "Puebla"
        ]);
        FederalEntity::create([
            'feen_pk' => 22,
            'feen_name' => "Querétaro"
        ]);
        FederalEntity::create([
            'feen_pk' => 23,
            'feen_name' => "Quintana Roo"
        ]);
        FederalEntity::create([
            'feen_pk' => 24,
            'feen_name' => "San Luis Potosí"
        ]);
        FederalEntity::create([
            'feen_pk' => 25,
            'feen_name' => "Sinaloa"
        ]);
        FederalEntity::create([
            'feen_pk' => 26,
            'feen_name' => "Sonora"
        ]);
        FederalEntity::create([
            'feen_pk' => 27,
            'feen_name' => "Tabasco"
        ]);
        FederalEntity::create([
            'feen_pk' => 28,
            'feen_name' => "Tamaulipas"
        ]);
        FederalEntity::create([
            'feen_pk' => 29,
            'feen_name' => "Tlaxcala"
        ]);
        FederalEntity::create([
            'feen_pk' => 30,
            'feen_name' => "Veracruz"
        ]);
        FederalEntity::create([
            'feen_pk' => 31,
            'feen_name' => "Yucatán"
        ]);
        FederalEntity::create([
            'feen_pk' => 32,
            'feen_name' => "Zacatecas"
        ]);

    }
}
