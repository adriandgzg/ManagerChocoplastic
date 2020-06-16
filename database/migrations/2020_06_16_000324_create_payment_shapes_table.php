<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentShapesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Catálogo Formas de pago
        Schema::create('payment_shapes', function (Blueprint $table) {
            $table->bigIncrements('pash_pk'); //Llave Primaria
            $table->string('pash_name', 300); //Nombre
            $table->smallInteger('pash_status')->default(1); //Estatus
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
        Schema::dropIfExists('payment_shapes');
    }
}
