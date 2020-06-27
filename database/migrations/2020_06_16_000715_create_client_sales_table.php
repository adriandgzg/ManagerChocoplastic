<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Cliente || Venta
        Schema::create('client_sales', function (Blueprint $table) {
            $table->bigIncrements('clsa_pk'); //Llave Primaria

            $table->bigInteger('clie_fk')->unsigned(); //Llave Foranea Catálogo de Clientes
            $table->foreign('clie_fk')->references('clie_pk')->on('clients')->onUpdate('cascade');

            $table->bigInteger('clor_fk')->unsigned(); //Llave Foranea Cliente Pedidos 
            $table->foreign('clor_fk')->references('clor_pk')->on('client_orders')->onUpdate('cascade');

            $table->bigInteger('pame_fk')->unsigned()->nullable(); //Llave Foranea Catálogo Metodo de Pago
            $table->foreign('pame_fk')->references('pame_pk')->on('payment_methods')->onUpdate('cascade');
           
            $table->bigInteger('stor_fk')->unsigned()->nullable(); //Llave Foranea Catálogo Tienda
            $table->foreign('stor_fk')->references('stor_pk')->on('stores')->onUpdate('cascade');

            $table->string('clsa_identifier', 20)->unique()->nullable(); //Identificador Personalizado
            $table->smallInteger('clsa_status')->default(1); //Estatus
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
        Schema::dropIfExists('client_sales');
    }
}
