<?php

use App\System;
use Illuminate\Database\Seeder;

class SystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        System::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        System::create([
            'syst_clie_order' => 1,
            'syst_clie_sale' => 1,
            'syst_prov_order' => 1,
            'syst_prov_purchase' => 1,
            'syst_prod_desc_availability' => 0
        ]);
    }
}
