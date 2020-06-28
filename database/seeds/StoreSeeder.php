<?php

use App\Store;
use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Store::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Store::create([
            'stor_name' => "Chochoplastic Matriz",
            'stor_phone' => "(993) 562 1458",
            'stor_addres' => "Punta Brava, 86150 Villahermosa, Tab.",
            'stor_main' => true
        ]);
        Store::create([
            'stor_name' => "Chochoplastic II",
            'stor_phone' => "(993) 123 1596",
            'stor_addres' => "Linda Vista Villahermosa, Tab.",
            'stor_main' => false
        ]);
        Store::create([
            'stor_name' => "Chochoplastic III",
            'stor_phone' => "(993) 789 8907",
            'stor_addres' => "Cosmos 2 Villahermosa, Tab.",
            'stor_main' => false
        ]);
        Store::create([
            'stor_name' => "Chochoplastic IV",
            'stor_phone' => "(993) 456 2345",
            'stor_addres' => "Ciudad Industrial Villahermosa, Tab.",
            'stor_main' => false
        ]);
    }
}
