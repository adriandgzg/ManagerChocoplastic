<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTransfersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Traspaso
        Schema::create('product_transfers', function (Blueprint $table) {
            $table->bigIncrements('prtr_pk'); //Llave Primaria

            $table->bigInteger('stor_fk_output')->unsigned()->nullable(); //Llave Foranea Catálogo Sucursal Salida
            $table->foreign('stor_fk_output')->references('stor_pk')->on('stores')->onUpdate('cascade');

            $table->bigInteger('stor_fk_input')->unsigned()->nullable(); //Llave Foranea Catálogo Sucursal Entrada
            $table->foreign('stor_fk_input')->references('stor_pk')->on('stores')->onUpdate('cascade');

            $table->string('prtr_identifier', 20)->unique()->nullable(); //Identificador
            $table->string('prtr_observation', 5000)->nullable(); //Observación
            $table->smallInteger('prtr_status')->default(1); //Estatus

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
        Schema::dropIfExists('product_transfers');
    }
}
