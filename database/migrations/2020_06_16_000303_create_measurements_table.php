<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMeasurementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Catálogo Unidades de Medida
        Schema::create('measurements', function (Blueprint $table) {
            $table->bigIncrements('meas_pk'); //Llave Primaria
            $table->string('meas_name', 300); //Nombre
            $table->string('meas_abbreviation', 5); //Abreviatura
            $table->smallInteger('meas_status')->default(1); //Estatus
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('measurements');
    }
}
