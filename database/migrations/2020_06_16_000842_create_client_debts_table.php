<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientDebtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Cliente || Deuda
        Schema::create('client_debts', function (Blueprint $table) {
            $table->bigIncrements('clde_pk'); //Llave Primaria

            $table->bigInteger('clie_fk')->unsigned(); //Llave Foranea Catálogo de Clientes
            $table->foreign('clie_fk')->references('clie_pk')->on('clients')->onUpdate('cascade');

            $table->bigInteger('clsa_fk')->unsigned(); //Llave Foranea Venta 
            $table->foreign('clsa_fk')->references('clsa_pk')->on('client_sales')->onUpdate('cascade');

            $table->bigInteger('bocu_fk')->unsigned(); //Llave Foranea Caja
            //$table->foreign('bocu_fk')->references('bocu_pk')->on('box_cuts')->onUpdate('cascade');

            $table->decimal('clde_amount', 12, 2); //Monto
            $table->smallInteger('clde_status')->default(1); //Estatus
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
        Schema::dropIfExists('client_debts');
    }
}
