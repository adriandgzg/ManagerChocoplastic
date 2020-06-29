<?php

use App\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        PaymentMethod::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        PaymentMethod::create([
            'pame_pk' => 1,
            'pame_name' => "Contado" 
        ]);

        PaymentMethod::create([
            'pame_pk' => 2,
            'pame_name' => "Crédito" 
        ]);
    }
}
