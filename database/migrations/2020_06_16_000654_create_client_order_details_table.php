<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     * 
     * @return void
     */
    public function up()
    {
        //Cliente || Pedidos Detalle
        Schema::create('client_order_details', function (Blueprint $table) {
            $table->bigIncrements('clod_pk'); //Llave Primaria

            $table->bigInteger('clor_fk')->unsigned(); //Llave Foranea Pedidos 
            $table->foreign('clor_fk')->references('clor_pk')->on('client_orders')->onUpdate('cascade');

            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo Productos
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->bigInteger('meas_fk')->unsigned(); //Llave Foranea Catálogo Unidad de Medida
            $table->foreign('meas_fk')->references('meas_pk')->on('measurements')->onUpdate('cascade');
            $table->smallInteger('clod_type'); //Tipo Compra 1) Moneda o 2) Granel

            $table->integer('clod_quantity'); //Cantidad
            $table->decimal('clod_price', 12, 2); //Precio Actual
            $table->decimal('clod_discountrate', 12, 2); //Porcentaje Descuento
            $table->decimal('clod_ieps', 12, 2); //IEPS
            $table->decimal('clod_iva', 12, 2); //IVA
            $table->smallInteger('clod_status')->default(1); //Estatus
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
        Schema::dropIfExists('client_order_details');
    }
}
