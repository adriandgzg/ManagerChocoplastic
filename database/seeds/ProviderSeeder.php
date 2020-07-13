<?php

use App\Provider;
use Illuminate\Database\Seeder;

class ProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Provider::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Provider::create([
            'prov_pk' => 1,
            'feen_fk' => 27,
            'prov_identifier' => "Prov_001",
            'prov_name' => "Proveedor 1",
            'prov_rfc' => "SDF201115",
            'prov_phone' => "9935467721",
            'prov_email' => "email@dominio.com",
            'prov_addres' => "Magallanes #158",
            'prov_cp' => "86000",
            'prov_city' => "Villahermosa",
        ]);


        Provider::create([
            'prov_pk' => 2,
            'feen_fk' => 7,
            'prov_identifier' => "Prov_002",
            'prov_name' => "Proveedor 2",
            'prov_rfc' => "CFE201115",
            'prov_phone' => "9321176517",
            'prov_email' => "email@domintioprov.com",
            'prov_addres' => "Carretera Federa KM107",
            'prov_cp' => "29580",
            'prov_city' => "Solosuchiapa",
        ]);
        

    }
}
