<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoxCutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('box_cuts', function (Blueprint $table) {
            $table->bigIncrements('bocu_pk');
            $table->dateTimeTz('bocu_startdate', 0); //Fecha Inicio
            $table->dateTimeTz('bocu_enddate', 0); //Fecha Fin
            $table->decimal('bocu_amountcash', 12, 2); //Total Contado
            $table->decimal('bocu_amountsum', 12, 2); //Total Suma
            $table->smallInteger('bocu_status')->default(1); //Estatus
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
        Schema::dropIfExists('box_cuts');
    }
}
