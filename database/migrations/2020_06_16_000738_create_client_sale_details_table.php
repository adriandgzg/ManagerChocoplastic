<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientSaleDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Cliente || Venta Detalle
        Schema::create('client_sale_details', function (Blueprint $table) {
            $table->bigIncrements('clsd_pk'); //Llave Primaria

            $table->bigInteger('clsa_fk')->unsigned(); //Llave Foranea Venta 
            $table->foreign('clsa_fk')->references('clsa_pk')->on('client_sales')->onUpdate('cascade');

            $table->bigInteger('prod_fk')->unsigned(); //Llave Foranea Catálogo Productos
            $table->foreign('prod_fk')->references('prod_pk')->on('products')->onUpdate('cascade');

            $table->bigInteger('meas_fk')->unsigned(); //Llave Foranea Catálogo Unidad de Medida
            $table->foreign('meas_fk')->references('meas_pk')->on('measurements')->onUpdate('cascade');

            $table->decimal('clsd_quantity', 12, 2); //Cantidad
            $table->decimal('clsd_price', 12, 2); //Precio Actual
            $table->decimal('clsd_discountrate', 12, 2); //Porcentaje Descuento
            $table->decimal('clsd_ieps', 12, 2); //IEPS
            $table->decimal('clsd_iva', 12, 2); //IVA
            $table->smallInteger('clsd_status')->default(1); //Estatus
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
        Schema::dropIfExists('client_sale_details');
    }
}
