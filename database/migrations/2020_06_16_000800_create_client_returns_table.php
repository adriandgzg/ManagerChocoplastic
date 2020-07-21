<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientReturnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Cliente || Devolución
        Schema::create('client_returns', function (Blueprint $table) {
            $table->bigIncrements('clre_pk'); //Llave Primaria

            $table->bigInteger('clie_fk')->unsigned(); //Llave Foranea Catálogo de Clientes
            $table->foreign('clie_fk')->references('clie_pk')->on('clients')->onUpdate('cascade');

            $table->bigInteger('clsa_fk')->unsigned(); //Llave Foranea Venta 
            $table->foreign('clsa_fk')->references('clsa_pk')->on('client_sales')->onUpdate('cascade');

            $table->bigInteger('stor_fk')->unsigned()->nullable(); //Llave Foranea Catálogo Tienda
            $table->foreign('stor_fk')->references('stor_pk')->on('stores')->onUpdate('cascade');

            $table->bigInteger('remo_fk')->unsigned()->nullable(); //Llave Foranea Motivo de Devolución
            $table->foreign('remo_fk')->references('remo_pk')->on('return_motives')->onUpdate('cascade');

            $table->text('clre_observation')->nullable(); //Observación
            $table->smallInteger('clre_status')->default(1); //Estatus
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
        Schema::dropIfExists('client_returns');
    }
}
