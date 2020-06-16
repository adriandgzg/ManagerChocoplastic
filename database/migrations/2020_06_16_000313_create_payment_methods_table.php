<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentMethodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Catálogo Metodos de Pago
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->bigIncrements('pame_pk'); //Llave Primaria
            $table->string('pame_name', 300); //Nombre
            $table->smallInteger('pame_status')->default(1); //Estatus
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
        Schema::dropIfExists('payment_methods');
    }
}
