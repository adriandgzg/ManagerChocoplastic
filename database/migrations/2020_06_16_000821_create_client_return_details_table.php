<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientReturnDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Cliente || Devolución Detalle
        Schema::create('client_return_details', function (Blueprint $table) {
            $table->bigIncrements('clrd_pk'); //Llave Primaria

            $table->bigInteger('clre_fk')->unsigned(); //Llave Foranea Cliente Devolución 
            $table->foreign('clre_fk')->references('clre_pk')->on('client_returns')->onUpdate('cascade');

            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo Productos
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->bigInteger('meas_fk')->unsigned(); //Llave Foranea Catálogo Unidad de Medida
            $table->foreign('meas_fk')->references('meas_pk')->on('measurements')->onUpdate('cascade');

            $table->integer('clrd_quantity'); //Cantidad
            $table->integer('clrd_quantity_sale'); //Cantidad Venta (Validar cantidad maxima)
            $table->decimal('clrd_price', 12, 2); //Precio Compra 
            $table->smallInteger('clrd_status')->default(1); //Estatus
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
        Schema::dropIfExists('client_return_details');
    }
}
