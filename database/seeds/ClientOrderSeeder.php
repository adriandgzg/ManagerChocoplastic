<?php

use App\ClientOrder;
use Illuminate\Database\Seeder;

class ClientOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        ClientOrder::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        ClientOrder::create([
            'clor_pk' => 1,
            'clie_fk' => 1,
            'clor_identifier' => "Ped0001",
            'clor_status' => 1
        ]);

        ClientOrder::create([
            'clor_pk' => 2,
            'clie_fk' => 2,
            'clor_identifier' => "Ped0002",
            'clor_status' => 1
        ]);
        ClientOrder::create([
            'clor_pk' => 3,
            'clie_fk' => 2,
            'clor_identifier' => "Ped0003",
            'clor_status' => 1
        ]);
        ClientOrder::create([
            'clor_pk' => 4,
            'clie_fk' => 2,
            'clor_identifier' => "Ped0004",
            'clor_status' => 1
        ]);
        ClientOrder::create([
            'clor_pk' => 5,
            'clie_fk' => 2,
            'clor_identifier' => "Ped0005",
            'clor_status' => 1
        ]);
        ClientOrder::create([
            'clor_pk' => 6,
            'clie_fk' => 2,
            'clor_identifier' => "Ped0006",
            'clor_status' => 1
        ]);
        ClientOrder::create([
            'clor_pk' => 7,
            'clie_fk' => 2,
            'clor_identifier' => "Ped0007",
            'clor_status' => 1
        ]);
    }
}
