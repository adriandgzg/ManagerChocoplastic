<?php

use App\Measurement;
use Illuminate\Database\Seeder;

class MeasurementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Measurement::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Measurement::create([
            'meas_pk' => 1,
            'meas_name' => "Caja",
            'meas_abbreviation' => "CJ"
        ]);
        Measurement::create([
            'meas_pk' => 2,
            'meas_name' => "Bulto",
            'meas_abbreviation' => "BTO"
        ]);
        Measurement::create([
            'meas_pk' => 3,
            'meas_name' => "Pieza",
            'meas_abbreviation' => "PZ"
        ]);
        Measurement::create([
            'meas_pk' => 4,
            'meas_name' => "Kilogramo",
            'meas_abbreviation' => "KG"
        ]);
        Measurement::create([
            'meas_pk' => 5,
            'meas_name' => "BTP",
            'meas_abbreviation' => "BTP"
        ]);
        Measurement::create([
            'meas_pk' => 6,
            'meas_name' => "Paquete",
            'meas_abbreviation' => "PQ"
        ]);
        Measurement::create([
            'meas_pk' => 7,
            'meas_name' => "BT",
            'meas_abbreviation' => "BT"
        ]);
        Measurement::create([
            'meas_pk' => 8,
            'meas_name' => "EXH",
            'meas_abbreviation' => "EXH"
        ]);
        Measurement::create([
            'meas_pk' => 9,
            'meas_name' => "Mazo",
            'meas_abbreviation' => "MZ"
        ]);
        Measurement::create([
            'meas_pk' => 10,
            'meas_name' => "CB",
            'meas_abbreviation' => "CB"
        ]);
    }
}
