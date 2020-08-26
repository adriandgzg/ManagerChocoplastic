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
        //Corte de caja
        Schema::create('box_cuts', function (Blueprint $table) {
            $table->bigIncrements('bocu_pk');
            $table->bigInteger('admi_fk');
            $table->dateTimeTz('bocu_startdate', 0); //Fecha Inicio
            $table->decimal('bocu_initialamount', 12, 2)->default(0); //Monto inicial
            $table->dateTimeTz('bocu_enddate', 0)->nullable(); //Fecha Fin
            $table->decimal('bocu_endamount', 12, 2)->default(0); //Monto inicial
            $table->decimal('bocu_amountcash', 12, 2)->default(0); //Total Contado
            $table->decimal('bocu_amountsum', 12, 2)->default(0); //Total Suma
            $table->smallInteger('bocu_status')->default(1); //Estatus
            $table->string('bocu_observation', 5000)->nullable(); //Observación
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
