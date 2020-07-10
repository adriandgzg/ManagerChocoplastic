<?php

use App\DevCode;
use Illuminate\Database\Seeder;

class DevCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DevCode::truncate();

        //Codigos correctos
        DevCode::create(['deco_code' => 200, 'deco_status' => true, 'deco_description' => "OK", 'deco_message' => "OK"]);

        //Error generico
        DevCode::create(['deco_code' => 500, 'deco_status' => false, 'deco_description' => "Error General Try Cach", 'deco_message' => "Error Interno"]);
        DevCode::create(['deco_code' => 501, 'deco_status' => false, 'deco_description' => "Campos Requeridos", 'deco_message' => "Por favor, revisar los campos requeridos"]);
        DevCode::create(['deco_code' => 404, 'deco_status' => false, 'deco_description' => "Pagina NO Encontrada", 'deco_message' => "Pagina NO Encontrada"]);

    }
}
