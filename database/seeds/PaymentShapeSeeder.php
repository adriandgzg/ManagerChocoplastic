<?php

use App\PaymentShape;
use Illuminate\Database\Seeder;

class PaymentShapeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        PaymentShape::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        PaymentShape::create([
            'pash_pk' => 1,
            'pash_name' => "Efectivo" 
        ]);

        PaymentShape::create([
            'pash_pk' => 2,
            'pash_name' => "Transferencia" 
        ]);

        PaymentShape::create([
            'pash_pk' => 3,
            'pash_name' => "Nota de Crédito" 
        ]);
        
    }
}
