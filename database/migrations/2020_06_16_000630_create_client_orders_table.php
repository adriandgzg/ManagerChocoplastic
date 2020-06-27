<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Cliente || Pedidos 
        Schema::create('client_orders', function (Blueprint $table) {
            $table->bigIncrements('clor_pk'); //Llave Primaria

            $table->bigInteger('clie_fk')->unsigned(); //Llave Foranea Catálogo de Clientes
            $table->foreign('clie_fk')->references('clie_pk')->on('clients')->onUpdate('cascade');

            $table->string('clor_identifier', 20)->unique(); //Identificador Personalizado
            $table->smallInteger('clor_status')->default(1); //Estatus
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
        Schema::dropIfExists('client_orders');
    }
}
